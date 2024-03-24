import {Box, Button, Divider, ToggleButton, Typography} from "@mui/material";
import {Todo} from "../lib/gql/graphql.ts";
import useDeleteTodo from "../lib/hooks/todo/useDeleteTodo.tsx";
import useUpdateTodo from "../lib/hooks/todo/useUpdateTodo.tsx";

interface Props {
    todo: Todo
    openUpdateModal: (todo: Todo) => void
}

const TodoBox = ({todo, openUpdateModal}: Props) => {
    const {deleteTodo, loading: deleteTodoLoading} = useDeleteTodo()
    const {updateTodo, loading: updateTodoLoading} = useUpdateTodo()

    return (
        <Box width={"700px"} rowGap={"10px"} display={"flex"}
             flexDirection={"column"} padding={"24px"}
             sx={{boxShadow: 2, borderRadius: "10px"}}>
            <Typography variant={"h6"} fontWeight={"bold"}>{todo.title}</Typography>
            <Divider/>
            <Typography variant={"body1"}>{todo.description}</Typography>
            <Divider/>
            <Box display={"flex"} height={"40px"} justifyContent={"space-between"} columnGap={"24px"}>
                <ToggleButton
                    value="Completed"
                    disabled={deleteTodoLoading || updateTodoLoading}
                    selected={todo.is_completed}
                    onChange={() => {
                        void updateTodo({
                            variables: {
                                input: {
                                    id: todo.id,
                                    title: todo.title,
                                    description: todo.description,
                                    is_completed: !todo.is_completed
                                }
                            }
                        })
                    }}
                >
                    {todo.is_completed ? "Completed" : "Active"}
                </ToggleButton>
                <Box display={"flex"} justifyContent={"space-between"} columnGap="24px">
                    <Button
                        color={"info"}
                        disabled={deleteTodoLoading || updateTodoLoading}
                        onClick={() => openUpdateModal(todo)}
                        variant={"outlined"}>
                        Edit
                    </Button>
                    <Button
                        color={"error"}
                        disabled={deleteTodoLoading || updateTodoLoading}
                        onClick={() => void deleteTodo({
                            variables: {
                                input: {
                                    id: todo.id
                                }
                            }
                        })}
                        variant={"outlined"}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default TodoBox