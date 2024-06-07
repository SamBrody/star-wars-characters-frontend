import {DefaultValues, SubmitHandler, useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {useNavigate} from "@tanstack/react-router";
import {SignUp, SignUpErrorKeys} from "../../../entities/access";
import {Button, Container, Form, Row, Stack} from "react-bootstrap";
import {InputField} from "../../../shared";
import {useSignUp} from "../api/use-sign-up.ts";

type FormValues = {
    login: string,
    password: string,
}

const defValues: DefaultValues<FormValues> = {
    login: "",
    password: "",
}

export const SignUpForm = () => {
    const snackbar = useSnackbar();

    const navigate = useNavigate();

    const {handleSubmit, control, setError} = useForm<FormValues>({defaultValues: defValues});

    const handleSignUpSuccess = () => {
        navigate({to: '/sign-in'});
    };

    const handleSignUpError = (error: Record<SignUpErrorKeys, string[]>) => {
        const msg = 'Произошла ошибка при регистрации!';
        snackbar.enqueueSnackbar(`${msg}`, {variant: 'error'});

        Object.keys(error).forEach(key => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setError(key, { message: error[key][0]});
        });
    };

    const {mutate} = useSignUp(handleSignUpSuccess, handleSignUpError);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const req: SignUp = {
            login: data.login,
            password: data.password,
        };

        mutate(req);
    };

    const handleBackClick = () => navigate({to: '/sign-in'});

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container style={{maxWidth: '400px', minWidth: '400px', marginTop: 50}}>
                <Row style={{marginBottom: 15}}>
                    <Stack direction="horizontal" style={{justifyContent: 'center'}}>
                        <h2>Регистрация</h2>
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
                            Отправить
                        </Button>
                        <Button variant="outline-secondary" onClick={handleBackClick}>
                            Назад
                        </Button>
                    </Stack>
                </Row>
            </Container>
        </Form>
    )
}