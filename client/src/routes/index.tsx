import {createFileRoute} from '@tanstack/react-router'
import {Alert, Box, Button, CircularProgress, Typography} from "@mui/material";
import useGetUser from "../lib/hooks/user/useGetUser.tsx";

export const Route = createFileRoute('/')({
    component: () => <Splash/>
})

const Splash = () => {
    const {error, loading, refetch} = useGetUser()

    return (
        <Box position={"absolute"} top={"50%"} style={{transform: "translate(-50%,-50%)"}} left={"50%"} display={"flex"}
             flexDirection={"column"} justifyContent={"center"} alignItems={"center"} rowGap={"48px"}>
            <Typography variant={"h2"} fontWeight={"bold"}>Todo App</Typography>
            {!error && <CircularProgress/>}
            {(error?.networkError && !loading) &&
                (
                    <Box display={"flex"} columnGap={"24px"}>
                        <Alert severity="error">Some error occurred. Please try again later</Alert>
                        <Button onClick={() => void refetch()}>Retry</Button>
                    </Box>
                )
            }
        </Box>
    )
}
