<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Auth;

use App\Models\User;
use Exception;
use GraphQL\Error\Error;

final readonly class Register
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
            $arguments = collect($args)->only('email', 'password', 'username');

            // check if the user with this email already exists
            $email_already_exists = User::whereEmail($arguments['email'])->exists();
            $username_already_exists = User::whereUsername($arguments['username'])->exists();

            // if the user with this email exists, throw an error
            if ($email_already_exists) {
                throw new Error("User with this email already exists in our system.");
            }

            // if the user with this username exists, throw an error
            if ($username_already_exists) {
                throw new Error("User with this username already exists in our system.");
            }

            // create the new user
            $user = User::create($arguments->toArray());

            // return the response
            return [
                'message' => "User created successfully."
            ];
        } catch (Exception $exception) {
            throw new Error($exception->getMessage());
        }
    }
}
