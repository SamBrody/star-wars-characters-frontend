import {Container, Row} from "react-bootstrap";
import {Characters} from "./characters.tsx";
import {CharacterFilters} from "./character-filters.tsx";

export const CharactersPage = () => {
    return(
        <Container fluid>
            <Row>
                <h1>Каталог персонажей StarWars</h1>
            </Row>
            <hr/>
            <Row style={{marginTop: 30}}>
                <CharacterFilters/>
            </Row>
            <hr/>
            <Row>
                <Characters characters={[]}/>
            </Row>
        </Container>
    )
}