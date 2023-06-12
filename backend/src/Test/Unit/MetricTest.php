<?php

declare(strict_types=1);

namespace App\Test\Unit;

use App\Metric\Infrastructure\Dto\MetricNumber;
use App\Metric\Infrastructure\Dto\MetricResponse;
use App\Metric\Infrastructure\Repository\TransactionLogRepository;
use App\Metric\Metric;
use PHPUnit\Framework\TestCase;

class MetricTest extends TestCase
{
    public function testWalletMetrics()
    {
        // Mock the TransactionLogRepository
        $repositoryMock = $this->createMock(TransactionLogRepository::class);

        // Define the expected values
        $transactionCount = 10;
        $uawCount = 5;
        $timeFrame = 125;

        // Set up the mock method calls and return values
        $repositoryMock
            ->expects($this->once())
            ->method('getCountOfAddresses')
            ->with('walletAddress123')
            ->willReturn(new MetricNumber($transactionCount));

        $repositoryMock
            ->expects($this->once())
            ->method('getCountOfAddressesInteractingWith')
            ->with('walletAddress123')
            ->willReturn(new MetricNumber($uawCount));

        $repositoryMock
            ->expects($this->once())
            ->method('all')
            ->willReturn(new MetricNumber($timeFrame));

        // Create an instance of the Metric class with the mock repository
        $metric = new Metric($repositoryMock);

        // Call the walletMetrics method
        $result = $metric->walletMetrics('walletAddress123');

        // Assert the expected values
        $this->assertInstanceOf(MetricResponse::class, $result);
        $this->assertEquals($transactionCount, $result->transactionsCount);
        $this->assertEquals($uawCount, $result->uawCount);
        $this->assertEquals($timeFrame, $result->timeFrame);
    }
}
