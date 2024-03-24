import {LogoutDocument} from "../../gql/graphql.ts";
import {useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {useNavigate} from "@tanstack/react-router";

const useLogout = () => {
    const navigate = useNavigate()

    const [logout, {loading}] = useMutation(LogoutDocument, {
        onCompleted: (data) => {
            if (data.logout) {
                toast.success("Logout successful.")
                void navigate({to: "/"})
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        logout,
        loading
    }
}

export default useLogout