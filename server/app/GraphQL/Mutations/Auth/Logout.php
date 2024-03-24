<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Auth;

final readonly class Logout
{
    /**
     * @param null $_
     * @param array{} $args
     */
    public function __invoke(null $_, array $args): array
    {
        // logout the currently authenticated user
        auth()->user()->currentAccessToken()->delete();

        // return the response message
        return [
            'message' => 'Logged out successfully'
        ];
    }
}
