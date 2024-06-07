import {Outlet, useNavigate} from "@tanstack/react-router";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import {isAuthorized} from "../../../shared";

export const HomePage = () => {
    const navigate = useNavigate();

    const Authorized = () => {
        const login = localStorage.getItem("login");

        const logoutHandle = () => {
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            localStorage.removeItem("login");

            navigate({to: "/characters"});
        }

        return(
            <Stack direction="horizontal" gap={4} style={{justifyContent: "right"}}>
                <>{login}</>

                <Button variant="secondary" size="lg" onClick={logoutHandle}>Выйти</Button>
            </Stack>
        );
    };

    const Unauthorized = () => {
        return(
            <Stack style={{justifyContent: "right"}}>
                <Button variant="secondary" size="lg" onClick={() => navigate({to: "/sign-in"})}>Войти</Button>
            </Stack>
        );
    };

    return(
        <Container style={{height: '100vh'}} className="homeContainer">
            <Row style={{alignItems: "baseline"}}>
                <Col>
                    <Stack direction="horizontal" gap={2} style={{marginTop: 10}}>
                        <Button variant="secondary" size="lg" onClick={() => navigate({to: "/characters"})}>
                            Каталог
                        </Button>
                        {
                            isAuthorized() && <Button variant="secondary" size="lg" onClick={() => navigate({to: "/characters/new"})}>
                                Добавить пресонажа
                            </Button>
                        }
                    </Stack>
                </Col>
                <Col style={{maxWidth: 120}}>
                    {isAuthorized() ? <Authorized/> : <Unauthorized/>}
                </Col>
            </Row>
            <Row style={{marginTop: 40}}>
                <Outlet/>
            </Row>
        </Container>
    )
}