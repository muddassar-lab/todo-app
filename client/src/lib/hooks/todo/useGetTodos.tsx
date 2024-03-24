import {useQuery} from "@apollo/client";
import {GetAuthenticatedUserTodosDocument} from "../../gql/graphql.ts";

const useGetTodos = (page: number) => {
    const {data, loading, error} = useQuery(GetAuthenticatedUserTodosDocument, {
        fetchPolicy: "network-only",
        variables: {
            page: page,
            first: 20
        }
    })

    return {
        data: data?.get_authenticated_user_todos.data ?? [],
        paginator: data?.get_authenticated_user_todos.paginatorInfo,
        loading,
        error,
    }
}

export default useGetTodos