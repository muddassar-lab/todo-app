import {createLazyFileRoute} from '@tanstack/react-router'
import {Box, Button, CircularProgress, Skeleton, Typography} from "@mui/material";
import useLogout from "../lib/hooks/auth/useLogout.tsx";
import CreateTodoDialog from "../components/CreateTodoDialog.tsx";
import {useState} from "react";
import UpdateTodoDialog from "../components/UpdateTodoDialog.tsx";
import {Todo} from "../lib/gql/graphql.ts";
import useGetTodos from "../lib/hooks/todo/useGetTodos.tsx";
import TodoBox from "../components/TodoBox.tsx";

export const Route = createLazyFileRoute('/home')({
    component: () => <HomeLazy/>
})

const HomeLazy = () => {
    const [page, setPage] = useState(1)
    const [updateTodo, setUpdateTodo] = useState<Todo | undefined>(undefined)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const {logout, loading} = useLogout()
    const {
        data, error, loading: getTodosLoading,
        paginator
    } = useGetTodos(page)

    return (
        <Box>
            <UpdateTodoDialog open={updateModalOpen} setOpen={setUpdateModalOpen} todo={updateTodo}
                              setTodo={setUpdateTodo}/>
            <CreateTodoDialog open={createModalOpen} setOpen={setCreateModalOpen}/>
            <Box display={"flex"} justifyContent={"space-between"} height={"80px"}>
                <Typography variant={"h4"} fontWeight={"bold"}>Todo App</Typography>
                <Box>
                    {
                        loading ? <CircularProgress size={30}/>
                            : (
                                <Button variant={"outlined"} onClick={() => void logout()}>
                                    Logout
                                </Button>
                            )
                    }
                </Box>
            </Box>
            <Box display={"flex"} justifyContent={"end"}>
                <Button variant={"outlined"} onClick={() => setCreateModalOpen(true)}>
                    Create New Todo
                </Button>
            </Box>
            <Box display={"flex"} width={"100%"} alignItems={"center"} paddingTop={"50px"} flexDirection={"column"}
                 rowGap={"24px"}>
                {
                    getTodosLoading && (
                        <>
                            <Skeleton height={"200px"} width={"600px"}/>
                            <Skeleton height={"200px"} width={"600px"}/>
                            <Skeleton height={"200px"} width={"600px"}/>
                            <Skeleton height={"200px"} width={"600px"}/>
                            <Skeleton height={"200px"} width={"600px"}/>
                        </>
                    )
                }
                {
                    (!getTodosLoading && !error) && data.map((todo) => (
                            <TodoBox
                                key={todo.id}
                                todo={todo as Todo}
                                openUpdateModal={() => {
                                    setUpdateTodo(todo as Todo)
                                    setUpdateModalOpen(true)
                                }}/>
                        )
                    )
                }
            </Box>
            <Box display={"flex"} justifyContent={"center"} paddingTop={"24px"}>
                {
                    paginator && (
                        <Box display={"flex"} width={"700px"}
                             justifyContent={"space-between"}>
                            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                                Back
                            </Button>
                            <Button onClick={() => setPage(page + 1)} disabled={page === paginator.lastPage}>
                                Next
                            </Button>
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}