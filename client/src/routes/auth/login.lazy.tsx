import {createLazyFileRoute, useNavigate} from '@tanstack/react-router'
import {Box, Button, CircularProgress, TextField, Typography} from "@mui/material";
import {useForm} from "@tanstack/react-form";
import {zodValidator} from "@tanstack/zod-form-adapter";
import {z} from "zod";
import useLogin from "../../lib/hooks/auth/useLogin.tsx";

export const Route = createLazyFileRoute('/auth/login')({
    component: () => <Login/>
})

const Login = () => {
    const {login, loading} = useLogin()
    const navigate = useNavigate()

    const {Field, handleSubmit} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({value}) => {
            await login({
                variables: {
                    input: {
                        email: value.email,
                        password: value.password,
                    }
                }
            })
        },
        validatorAdapter: zodValidator,
    })


    return (
        <Box position={"absolute"} sx={{boxShadow: 1}} padding={"24px"} width={"450px"} top={"50%"}
             style={{transform: "translate(-50%,-50%)"}}
             left={"50%"} display={"flex"}
             flexDirection={"column"} rowGap={"48px"}>
            <Typography variant={"h2"} fontWeight={"bold"}>Login</Typography>
            <Box display={"flex"} flexDirection={"column"} rowGap={"24px"}>
                <Field
                    name="email"
                    validators={{
                        onChange: z.string().min(1, "Email is required")
                            .email("Email format should be correct.")
                    }}
                    children={({state, handleChange, handleBlur}) => {
                        return (
                            <TextField
                                error={state.meta.errors.length > 0}
                                type={"email"}
                                label="Email"
                                variant="filled"
                                defaultValue={state.value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                                placeholder="Enter your email"
                                helperText={state.meta.errors.length > 0 ? state.meta.errors[0] : null}
                            />
                        );
                    }}
                />
                <Field
                    name="password"
                    validators={{
                        onChange: z.string()
                            .min(1, "Password is required")
                    }}
                    children={({state, handleChange, handleBlur}) => {
                        return (
                            <TextField
                                error={state.meta.errors.length > 0}
                                type={"password"}
                                label="Password"
                                variant="filled"
                                defaultValue={state.value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                                placeholder="Enter your password"
                                helperText={state.meta.errors.length > 0 ? state.meta.errors[0] : null}
                            />
                        );
                    }}
                />
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Button variant="outlined" sx={{width: "150px"}}
                        onClick={() => navigate({to: "/auth/register"})}>
                    Register
                </Button>
                {
                    loading ? <CircularProgress size={30}/>
                        : (
                            <Button variant="contained" sx={{width: "150px"}}
                                    onClick={() => handleSubmit()}>
                                Login
                            </Button>
                        )
                }
            </Box>
        </Box>
    )
}