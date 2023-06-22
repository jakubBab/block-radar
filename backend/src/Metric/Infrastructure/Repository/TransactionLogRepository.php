<?php

declare(strict_types=1);

namespace App\Metric\Infrastructure\Repository;

use App\Metric\Infrastructure\Dto\MetricNumber;
use App\Shared\Database\Contract\DatabaseManagerInterface;
use App\Shared\Database\MongoConnection;
use MongoDB\Model\BSONArray;
use MongoDB\Model\BSONDocument;

class TransactionLogRepository
{
    const  COLLECTION_NAME = 'transactionlogs';

    /** @param MongoConnection $manager */
    public function __construct(private readonly DatabaseManagerInterface $manager)
    {
    }


    /**
     * @param string $walletAddress
     * @return array{'total' : MetricNumber, 'unique' : MetricNumber}
     */
    public function walletMetrics(string $walletAddress): array
    {
        $collection = $this->manager
            ->getClient()
            ->selectCollection(
                $this->manager->getDatabase(),
                self::COLLECTION_NAME
            );

        $pipeline = [
            [
                '$facet' => [
                    'interactingAddresses' => [
                        [
                            '$match' => [
                                'addressTo' => $walletAddress
                            ]
                        ],
                        [
                            '$group' => [
                                '_id' => '$addressFrom',
                                'count' => ['$sum' => 1]
                            ]
                        ],
                        [
                            '$group' => [
                                '_id' => null,
                                'totalTransactions' => ['$sum' => '$count'],
                                'uniqueTransactions' => ['$sum' => ['$cond' => [['$gt' => ['$count', 0]], 1, 0]]]
                            ]
                        ]
                    ]
                ]
            ]
        ];

        $container = [
            'total' => new MetricNumber(0),
            'unique' => new MetricNumber(0)
        ];


        /** @phpstan-ignore-next-line */
        $result = $collection->aggregate($pipeline)->toArray();
        if (empty($result)) {
            return $container;
        }

        /** @var BSONDocument $result */
        $result = $result[0]->getArrayCopy();
        /** @var BSONArray $result */
        $result = $result['interactingAddresses'];

        foreach ($result as $value) {
            $container['total'] = new MetricNumber($value->totalTransactions);
            $container['unique'] = new MetricNumber($value->uniqueTransactions);
        }


        return $container;
    }

    public function all(): MetricNumber
    {
        $collection = $this->manager
            ->getClient()
            ->selectCollection(
                $this->manager->getDatabase(),
                self::COLLECTION_NAME
            );

        return new MetricNumber($collection->countDocuments([]));
    }
}
