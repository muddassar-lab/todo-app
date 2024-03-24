import {CreateTodoDocument, GetAuthenticatedUserTodosDocument} from "../../gql/graphql.ts";
import {useMutation} from "@apollo/client";
import toast from "react-hot-toast";

const useCreateTodo = () => {
    const [createTodo, {loading}] = useMutation(CreateTodoDocument, {
        refetchQueries: [GetAuthenticatedUserTodosDocument],
        onCompleted: (data) => {
            if (data.create_todo) {
                toast.success("Todo created successfully.")
            }
        },
        onError: (error) => toast.error(error.message)
    })

    return {
        createTodo,
        loading
    }
}

export default useCreateTodo