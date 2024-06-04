import {Col, Container, Form, Row, Stack} from "react-bootstrap";
import {CharacterGender} from "../../../entities/character";
import {useGetMovies} from "../../../entities/movie";
import {useGetPlanets} from "../../../entities/planet";

const yearInputStyle = {width: '100%'}
const labelStyle = {minWidth: 70}

type Item = {
    id: number,
    label: string,
}

const parseItems = (items: Item[]) => items.map(x => (<option value={x.id}>{x.label}</option>))

export const CharacterFilters = () => {
    const moviesResponse = useGetMovies();
    const planetResponse = useGetPlanets();

    return(
        <Container>
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
                        <Form.Select id="movies">
                            <option>...</option>
                            {moviesResponse.isSuccess && parseItems(moviesResponse.data.map(x => ({id: x.id, label: x.name})))}
                        </Form.Select>
                    </Stack>
                </Col>
                <Col>
                    <Row style={{marginBottom: 15}}>
                        <Stack direction="horizontal" gap={2}>
                            <Form.Label style={labelStyle} htmlFor="planets" >Планета</Form.Label>
                            <Form.Select id="planets">
                                <option>...</option>
                                {planetResponse.isSuccess && parseItems(planetResponse.data.map(x => ({id: x.id, label: x.name})))}
                            </Form.Select>
                        </Stack>
                    </Row>
                    <Row>
                        <Stack direction="horizontal" gap={2}>
                            <Form.Label  style={labelStyle} htmlFor="genders">Пол</Form.Label>
                            <Form.Select id="genders">
                                <option>...</option>
                                <option value={CharacterGender.male}>Мужской</option>
                                <option value={CharacterGender.female}>Женский</option>
                            </Form.Select>
                        </Stack>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}