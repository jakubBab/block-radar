<?php

namespace App\Shared\Database\Contract;

interface DatabaseManagerInterface
{
    public function getClient(): object;

    public function getDatabase(): string;
}
