<?php

declare(strict_types=1);

namespace App\Shared\Database;

use App\Shared\Database\Contract\DatabaseManagerInterface;
use MongoDB\Client;

class MongoConnection implements DatabaseManagerInterface
{
    private Client $client;

    public function __construct(public readonly string $connectionString, public readonly string $database)
    {
        $this->client = new Client($connectionString, [], []);
        $this->checkConnection($database);
    }

    private function checkConnection(string $database): void
    {
        try {
            $this->client->selectDatabase($database)->command(['ping' => 1]);
        } catch (\Exception) {
            throw new \RuntimeException(sprintf("Unable to connect to MongoDB. Check configuration"));
        }
    }

    public function getClient(): Client
    {
        return $this->client;
    }

    public function getDatabase(): string
    {
        return $this->database;
    }
}
