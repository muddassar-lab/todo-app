import {GetAuthenticatedUserTodosDocument, UpdateTodoDocument} from "../../gql/graphql.ts";
import {useMutation} from "@apollo/client";
import toast from "react-hot-toast";

const useUpdateTodo = () => {
    const [updateTodo, {loading}] = useMutation(UpdateTodoDocument, {
        refetchQueries: [GetAuthenticatedUserTodosDocument],
        onCompleted: (data) => {
            if (data.update_todo) {
                toast.success("Todo updated successfully.")
            }
        },
        onError: (error) => toast.error(error.message)
    })

    return {
        updateTodo,
        loading
    }
}

export default useUpdateTodo