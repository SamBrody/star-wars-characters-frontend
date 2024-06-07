import {Button, Container, Form, Row, Stack} from "react-bootstrap";
import {InputField} from "../../../shared";
import {DefaultValues, SubmitHandler, useForm} from "react-hook-form";
import {useSignIn} from "../api/use-sign-in.ts";
import {SignIn, SignInErrorKeys, UserSession} from "../../../entities/access";
import {useSnackbar} from "notistack";
import {useNavigate} from "@tanstack/react-router";

type FormValues = {
    login: string,
    password: string,
}

const defValues: DefaultValues<FormValues> = {
    login: "",
    password: "",
}

export const SignInForm = () => {
    const snackbar = useSnackbar();

    const navigate = useNavigate();

    const {handleSubmit, control, setError} = useForm<FormValues>({defaultValues: defValues});

    const handleSignInSuccess = (userSession: UserSession) => {
        localStorage.setItem("userId", userSession.userId);
        localStorage.setItem("token", userSession.token);
        localStorage.setItem("login", userSession.login);

        navigate({to: '/characters'});
    }

    const handleSignInError = (error: Record<SignInErrorKeys, string[]>) => {
        const msg = 'Произошла ошибка при входе!';
        snackbar.enqueueSnackbar(`${msg}`, {variant: 'error'});

        Object.keys(error).forEach(key => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setError(key, { message: error[key][0]});
        })
    }

    const {mutate} = useSignIn(handleSignInSuccess, handleSignInError);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const req: SignIn = {
            login: data.login,
            password: data.password,
        }

        mutate(req);
    }

    const handleSignUp = () => navigate({to: '/sign-up'});

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container style={{maxWidth: '400px', minWidth: '400px', marginTop: 50}}>
                <Row style={{marginBottom: 15}}>
                    <Stack direction="horizontal" style={{justifyContent: 'center'}}>
                        <h2>Авторизация</h2>
                    </Stack>
                </Row>
                <Row style={{marginBottom: 15}}>
                    <Stack gap={1} style={{justifyContent: 'center'}}>
                        <InputField name="login" control={control} labelValue="Логин" labelMaxWidth={70}/>
                        <InputField name="password" control={control} labelValue="Пароль" type="password" labelMaxWidth={70}/>
                    </Stack>
                </Row>
                <Row>
                    <Stack gap={2} style={{justifyContent: 'right'}}>
                        <Button variant="secondary" type="submit">
                            Войти
                        </Button>
                        <Button variant="outline-secondary" onClick={handleSignUp}>
                            Регистрация
                        </Button>
                    </Stack>
                </Row>
            </Container>
        </Form>
    )
}