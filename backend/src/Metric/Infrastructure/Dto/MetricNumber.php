<?php

declare(strict_types=1);

namespace App\Metric\Infrastructure\Dto;

class MetricNumber
{
    public function __construct(public readonly int $value)
    {
    }
}
