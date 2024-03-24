<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Auth;

use App\Models\User;
use Exception;
use GraphQL\Error\Error;
use Illuminate\Support\Facades\Hash;

final readonly class Login
{
    /**
     * @param null $_
     * @param array{} $args
     * @return array
     * @throws Error
     */
    public function __invoke(null $_, array $args): array
    {
        try {
            // collect the arguments
            $arguments = collect($args)->only('email', 'password');

            // find the user
            $user = User::whereEmail($arguments['email'])->first();

            // authenticate the credentials
            if (!$user || !Hash::check($arguments['password'], $user->password)) {
                throw new Error("These credentials do not match do any record in our system.");
            }

            // generate the token
            $token = $user->createToken('token')->plainTextToken;

            // return the response
            return [
                'access_token' => $token,
            ];
        } catch (Exception $exception) {
            throw new Error($exception->getMessage());
        }
    }
}
