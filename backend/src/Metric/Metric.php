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
        return new MetricResponse(
            $this->repository->getCountOfAddresses($walletAddress)->value,
            $this->repository->getCountOfAddressesInteractingWith($walletAddress)->value,
            $this->repository->all()->value
        );
    }
}
