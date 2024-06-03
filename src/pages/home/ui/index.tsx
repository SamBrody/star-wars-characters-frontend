import {Outlet, useNavigate} from "@tanstack/react-router";
import {Button, Container, Row, Stack} from "react-bootstrap";

export const HomePage = () => {
    const navigate = useNavigate();

    const handleClick = (routeName: string) => navigate({to: routeName})

    return(
        <Container style={{marginTop: 10}} className="homeContainer">
            <Row>
                <Stack direction="horizontal" gap={2}>
                    <Button variant="secondary" size="lg" onClick={() => handleClick('/characters')}>Каталог</Button>
                    <Button variant="secondary" size="lg" onClick={() => handleClick('/characters/new')}>Добавить пресонажа</Button>
                </Stack>
            </Row>
            <Row style={{marginTop: 40}}>
                <Outlet/>
            </Row>
        </Container>
    )
}