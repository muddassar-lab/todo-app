import {GetAuthenticatedUserDocument} from "../../gql/graphql.ts";
import {useQuery} from "@apollo/client";
import {useNavigate} from "@tanstack/react-router";
import {useSetRecoilState} from "recoil";
import {User_Atom} from "../../recoil/user/user.ts";

const useGetUser = () => {
    const navigate = useNavigate()
    const setUser = useSetRecoilState(User_Atom)

    const {data, error, loading, refetch} = useQuery(GetAuthenticatedUserDocument, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            if (data.get_authenticated_user) {
                setUser(data.get_authenticated_user)
                void navigate({to: "/home"})
            }
        },
        onError: (error) => {
            if (error.message === "Unauthenticated.") {
                localStorage.removeItem('access_token');
                setUser(null)
                void navigate({to: "/auth/login"})
            }
        }
    })

    return {
        data: data?.get_authenticated_user,
        error,
        refetch,
        loading
    }
}

export default useGetUser