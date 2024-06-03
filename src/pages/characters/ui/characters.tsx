import {Character} from "../../../entities/character";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";

type Props = {
    characters?: Character[],
}

export const Characters = ({characters}: Props) => {
    const btnSize = 20;
    
    return(
        <Container>
            <Row>
                {characters?.map((c) => (
                    <Col key={c.id} xs={6} style={{marginBottom: 15}}>
                        <Stack direction="horizontal" style={{border: 'solid 2px lightgray', minHeight: 80, padding: 5}}>
                            <Stack direction="vertical">
                                <h5>{c.name}</h5>
                                <h6>{c.originalName}</h6>
                            </Stack>
                            <Button variant="link">
                                <img width={btnSize} height={btnSize} src="/info-circle-fill.svg" alt="Info"/>
                            </Button>
                            <Button variant="link">
                                <img width={btnSize} height={btnSize} src="/pencil-fill.svg" alt="Edit"/>
                            </Button>
                        </Stack>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}