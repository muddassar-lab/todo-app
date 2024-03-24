import {DeleteTodoDocument, GetAuthenticatedUserTodosDocument} from "../../gql/graphql.ts";
import {useMutation} from "@apollo/client";
import toast from "react-hot-toast";

const useDeleteTodo = () => {
    const [deleteTodo, {loading}] = useMutation(DeleteTodoDocument, {
        refetchQueries: [GetAuthenticatedUserTodosDocument],
        onCompleted: (data) => {
            if (data.delete_todo) {
                toast.success("Todo deleted successfully.")
            }
        },
        onError: (error) => toast.error(error.message)
    })

    return {
        deleteTodo,
        loading
    }
}

export default useDeleteTodo