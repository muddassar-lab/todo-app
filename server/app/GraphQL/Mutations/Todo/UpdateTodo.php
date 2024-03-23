<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Todo;

use App\Models\Todo;
use Exception;
use GraphQL\Error\Error;

final readonly class UpdateTodo
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
            $arguments = collect($args)->only('id', 'title', 'description', 'is_completed');

            // get the currently authenticated user
            $user = auth()->user();

            // get the todo by it's id
            $todo = Todo::find($arguments['id']);

            // if todo is not found throw error
            if (!isset($todo)) {
                throw new Error("Todo not found.");
            }

            if ($user->id !== $todo->user_id) {
                throw new Error("You are not authorized to perform this action.");
            }

            // update the todo
            $todo->update($arguments->toArray());

            // return the todo
            return $todo;
        } catch (Exception $exception) {
            throw new Error('Some error occurred. Please try again later.');
        }
    }
}
