import {useMutation} from "@apollo/client";
import {RegisterDocument} from "../../gql/graphql.ts";
import toast from "react-hot-toast";
import {useNavigate} from "@tanstack/react-router";

const useRegister = () => {
    const navigate = useNavigate()

    const [register, {loading}] = useMutation(RegisterDocument, {
        onCompleted: (data) => {
            if (data.register) {
                toast.success("Registration successful. Please login to access todo app.")
                void navigate({to: "/auth/login"})
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        register,
        loading
    }
}

export default useRegister