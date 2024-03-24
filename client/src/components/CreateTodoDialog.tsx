import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useForm} from "@tanstack/react-form";
import {zodValidator} from "@tanstack/zod-form-adapter";
import {z} from "zod";
import useCreateTodo from "../lib/hooks/todo/useCreateTodo.tsx";

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
}

const CreateTodoDialog = ({open, setOpen}: Props) => {
    const {createTodo, loading} = useCreateTodo()

    const {Field, handleSubmit} = useForm({
        defaultValues: {
            title: "",
            description: ""
        },
        onSubmit: async ({value}) => {
            void createTodo({
                variables: {
                    input: {
                        title: value.title,
                        description: value.description
                    }
                }
            }).then((data) => {
                if (data.data?.create_todo) setOpen(false)
            })
        },
        validatorAdapter: zodValidator,
    })


    return (
        <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={() => {
            if (loading) return
            setOpen(false)
        }}>
            <DialogTitle>Create Todo</DialogTitle>
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
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} disabled={loading} onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateTodoDialog