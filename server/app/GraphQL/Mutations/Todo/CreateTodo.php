<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Todo;

use App\Models\Todo;
use Exception;
use GraphQL\Error\Error;

final readonly class CreateTodo
{
    /**
     * @param null $_
     * @param array{} $args
     * @return Todo
     * @throws Error
     */
    public function __invoke(null $_, array $args): Todo
    {
        try {
            // collect the arguments
            $arguments = collect($args)->only('title', 'description');

            // get the auth user
            $user = auth()->user();

            // put auth user id in arguments
            $arguments->put('user_id', $user->id);

            // create the model and return it
            return Todo::create($arguments->toArray());
        } catch (Exception $exception) {
            throw new Error('Some error occurred. Please try again later.');
        }
    }
}
