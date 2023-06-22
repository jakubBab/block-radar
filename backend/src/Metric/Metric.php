<?php

declare(strict_types=1);

namespace App\Metric;

use App\Metric\Infrastructure\Dto\MetricResponse;
use App\Metric\Infrastructure\Repository\TransactionLogRepository;

class Metric
{
    public function __construct(private readonly TransactionLogRepository $repository)
    {
    }

    public function walletMetrics(string $walletAddress): object
    {

        $walletMetrics = $this->repository->walletMetrics($walletAddress);

        return new MetricResponse(
            $walletMetrics['total']->value,
            $walletMetrics['unique']->value,
            $this->repository->all()->value
        );
    }
}
