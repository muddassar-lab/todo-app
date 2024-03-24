import {useMutation} from "@apollo/client";
import {LoginDocument} from "../../gql/graphql.ts";
import {useNavigate} from "@tanstack/react-router";
import toast from "react-hot-toast";

const useLogin = () => {
    const navigate = useNavigate()

    const [login, {loading}] = useMutation(LoginDocument, {
        onCompleted: (data) => {
            if (data.login && data.login.access_token) {
                toast.success("Login successful.")
                localStorage.setItem("access_token", data.login.access_token)
                void navigate({to: "/"})
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        login,
        loading
    }
}

export default useLogin