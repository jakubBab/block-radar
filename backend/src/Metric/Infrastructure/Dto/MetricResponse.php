<?php

declare(strict_types=1);

namespace App\Metric\Infrastructure\Dto;

class MetricResponse
{
    public function __construct(
        public readonly int $transactionsCount,
        public readonly int $uawCount,
        public readonly int $timeFrame
    ) {
    }
}
