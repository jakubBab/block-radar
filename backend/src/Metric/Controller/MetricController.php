<?php

declare(strict_types=1);

namespace App\Metric\Controller;

use App\Metric\Infrastructure\Repository\TransactionLogRepository;
use App\Metric\Metric;
use MongoDB\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MetricController extends AbstractController
{
    public function addressMetrics(Request $response, Metric $metric): Response
    {

        $walletAddress = $response->get('walletAddress');

        if (empty($walletAddress)) {
            return new JsonResponse('Query parameter "walletAddress" not found. Please set wallet address');
        }

        return new JsonResponse($metric->walletMetrics($walletAddress));
    }
}
