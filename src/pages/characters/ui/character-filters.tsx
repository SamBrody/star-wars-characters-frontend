import {Col, Container, Form, Row, Stack} from "react-bootstrap";

const yearInputStyle = {width: '100%'}
const labelStyle = {minWidth: 70}

export const CharacterFilters = () => {
    return(
        <Container style={{marginBottom: 30}}>
            <Row>
                <Col>
                    <Stack direction="horizontal" gap={2} style={{marginBottom: 15}}>
                        <Form.Label style={{minWidth: 120}}>Дата рождения</Form.Label>
                        <Form.Label htmlFor="yearFrom">с</Form.Label>
                        <Form.Control style={yearInputStyle} type="number" id="yearFrom"/>
                        <Form.Label htmlFor="yearTo">по</Form.Label>
                        <Form.Control style={yearInputStyle} type="number" id="yearTo"/>
                        <Form.Label>ДБЯ</Form.Label>
                    </Stack>
                    <Stack direction="horizontal" gap={2}>
                        <Form.Label htmlFor="movies">Фильмы</Form.Label>
                        <Form.Select id="movies"></Form.Select>
                    </Stack>
                </Col>
                <Col>
                    <Row style={{marginBottom: 15}}>
                        <Stack direction="horizontal" gap={2}>
                            <Form.Label style={labelStyle} htmlFor="planets" >Планета</Form.Label>
                            <Form.Select id="planets"></Form.Select>
                        </Stack>
                    </Row>
                    <Row>
                        <Stack direction="horizontal" gap={2}>
                            <Form.Label  style={labelStyle} htmlFor="genders">Пол</Form.Label>
                            <Form.Select id="genders"></Form.Select>
                        </Stack>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}