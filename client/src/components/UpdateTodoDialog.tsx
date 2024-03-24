import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField
} from "@mui/material";
import {useForm} from "@tanstack/react-form";
import {zodValidator} from "@tanstack/zod-form-adapter";
import {z} from "zod";
import {Todo} from "../lib/gql/graphql.ts";
import useUpdateTodo from "../lib/hooks/todo/useUpdateTodo.tsx";
import useDeleteTodo from "../lib/hooks/todo/useDeleteTodo.tsx";

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
    todo?: Todo
    setTodo?: (value?: Todo) => void
}

const UpdateTodoDialog = ({open, setOpen, todo, setTodo}: Props) => {
    const {updateTodo, loading: updateTodoLoading} = useUpdateTodo()
    const {deleteTodo, loading: deleteTodoLoading} = useDeleteTodo()

    const {Field, handleSubmit} = useForm({
        defaultValues: {
            title: todo?.title ?? "",
            description: todo?.description ?? "",
            is_completed: todo?.is_completed ?? false
        },
        onSubmit: async ({value}) => {
            void updateTodo({
                variables: {
                    input: {
                        id: todo?.id ?? "",
                        title: value.title,
                        description: value.description,
                        is_completed: value.is_completed
                    }
                }
            }).then((data) => {
                if (data.data?.update_todo) {
                    setTodo?.(undefined)
                    setOpen(false)
                }
            })
        },
        validatorAdapter: zodValidator,
    })


    return (
        <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={() => {
            if (updateTodoLoading || deleteTodoLoading) return
            setOpen(false)
            setTodo?.(undefined)
        }}>
            <DialogTitle>Update Todo</DialogTitle>
            <DialogContent sx={{display: "flex", flexDirection: "column", rowGap: "24px"}}>
                <Field
                    name="title"
                    validators={{
                        onChange: z.string().min(1, "Title is required")
                            .max(244, "Title should be max 255 characters.")
                    }}
                    children={({state, handleChange, handleBlur}) => {
                        return (
                            <TextField
                                error={state.meta.errors.length > 0}
                                type={"text"}
                                label="Title"
                                variant="filled"
                                defaultValue={state.value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                                placeholder="Enter todo title"
                                helperText={state.meta.errors.length > 0 ? state.meta.errors[0] : null}
                            />
                        );
                    }}
                />
                <Field
                    name="description"
                    validators={{
                        onChange: z.string()
                    }}
                    children={({state, handleChange, handleBlur}) => {
                        return (
                            <TextField
                                error={state.meta.errors.length > 0}
                                type={"text"}
                                label="Description"
                                variant="filled"
                                multiline
                                rows={5}
                                defaultValue={state.value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                                placeholder="Enter todo description"
                                helperText={state.meta.errors.length > 0 ? state.meta.errors[0] : null}
                            />
                        );
                    }}
                />
                <Field
                    name="is_completed"
                    validators={{
                        onChange: z.boolean()
                    }}
                    children={({state, handleChange, handleBlur}) => {
                        return (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onBlur={handleBlur}
                                        value={state.value}
                                        onChange={(e) => handleChange(e.target.checked)}
                                    />
                                }
                                label="is Completed"
                            />
                        );
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant={"outlined"} color={"error"} disabled={updateTodoLoading || deleteTodoLoading}
                        onClick={() => {
                            if (todo) {
                                void deleteTodo({
                                    variables: {
                                        input: {
                                            id: todo.id
                                        }
                                    }
                                }).then((data) => {
                                    if (data.data?.delete_todo) {
                                        setTodo?.(undefined)
                                        setOpen(false)
                                    }
                                })
                            }
                        }}>
                    Delete
                </Button>
                <Button variant={"contained"} disabled={updateTodoLoading || deleteTodoLoading} onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateTodoDialog