<?php

declare(strict_types=1);

namespace App\Metric\Infrastructure\Repository;

use App\Metric\Infrastructure\Dto\MetricNumber;
use App\Shared\Database\Contract\DatabaseManagerInterface;
use App\Shared\Database\MongoConnection;
use MongoDB\Model\BSONDocument;

class TransactionLogRepository
{
    const  COLLECTION_NAME = 'transactionlogs';

    /** @param MongoConnection $manager */
    public function __construct(private readonly DatabaseManagerInterface $manager)
    {
    }

    public function getCountOfAddressesInteractingWith(string $walletAddress): MetricNumber
    {
        $collection = $this->manager
            ->getClient()
            ->selectCollection(
                $this->manager->getDatabase(),
                self::COLLECTION_NAME
            );

        $pipeline = [
            [
                '$match' => [
                    'addressTo' => $walletAddress,
                ],
            ],
            [
                '$group' => [
                    '_id' => '$addressFrom',
                ],
            ],
            [
                '$group' => [
                    '_id' => null,
                    'count' => ['$sum' => 1],
                ],
            ],
        ];

        /** @phpstan-ignore-next-line */
        $result = $collection->aggregate($pipeline)->toArray();

        if (empty($result)) {
            return new MetricNumber(0);
        }
        /** @var BSONDocument $result */
        $result = $result[0]->getArrayCopy();

        return new MetricNumber($result['count']);
    }

    public function getCountOfAddresses(string $walletAddress): MetricNumber
    {
        $collection = $this->manager
            ->getClient()
            ->selectCollection(
                $this->manager->getDatabase(),
                self::COLLECTION_NAME
            );

        $filter = [
            'addressTo' => $walletAddress,
        ];

        return new MetricNumber($collection->countDocuments($filter));
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
