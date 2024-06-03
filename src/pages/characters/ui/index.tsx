import {Container, Row} from "react-bootstrap";
import {Characters} from "./characters.tsx";
import {CharacterFilters} from "./character-filters.tsx";
import {GetCharactersRequest, useGetCharacters} from "../../../entities/character/api/get-characters.ts";

const PAGE = 1;
const PER_PAGE = 4;

export const CharactersPage = () => {
    const req: GetCharactersRequest = {
        page: PAGE,
        perPage: PER_PAGE,
    }

    const {data, isError, isFetching, isLoading, isSuccess} = useGetCharacters(req);

    return(
        <Container fluid>
            <Row>
                <h1>Каталог персонажей StarWars</h1>
            </Row>
            <hr/>
            <Row style={{marginTop: 30, marginBottom: 30}}>
                <CharacterFilters/>
            </Row>
            <hr/>
            <Row>
                <Characters characters={isSuccess ? data.items : []}/>
            </Row>
        </Container>
    )
}