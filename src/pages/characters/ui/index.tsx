import {Button, Container, Pagination, Row, Spinner} from "react-bootstrap";
import {Characters} from "./characters.tsx";
import {CharacterFilters} from "./character-filters.tsx";
import {GetCharactersRequest, useGetCharacters} from "../../../entities/character/api/get-characters.ts";
import {ReactNode, useState} from "react";

const PAGE = 1;
const PER_PAGE = 4;

export const CharactersPage = () => {
    const [page, setPage] = useState(PAGE);
    const req: GetCharactersRequest = {
        page: page,
        perPage: PER_PAGE,
    }

    const {
        data, 
        isFetching,
        isLoading,
        isSuccess
    } = useGetCharacters(req);

    const pageInfo = data?.pageInfo;
    
    const GetPagination = (count: number, currentPage: number) => {
        const items: ReactNode[] = [];
        
        for (let i = 1; i <= count; i++) {
            items.push(
                <Button variant="outline-secondary" key={i} active={i === currentPage} onClick={()=>setPage(i)}>
                    {i}
                </Button>);
        }
        
        return items;
    }
    
    const loadingOrFetching = isLoading || isFetching;
    
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
            <Row style={{marginTop: 30, marginBottom: 30}}>
                {loadingOrFetching && <Spinner animation="grow" />}
                {isSuccess && !(isLoading || isFetching) && <Characters characters={data.items}/>}
                {isSuccess && data.items && data.items.length === 0 && <h3>Не нашлось ни одного персонажа :(</h3>}
            </Row>
            <Row style={{marginTop: 30}}>
                <Pagination style={{justifyContent: 'center',}}>
                    {!loadingOrFetching && isSuccess && pageInfo && GetPagination(pageInfo.pages, pageInfo.page)}
                </Pagination>
            </Row>
        </Container>
    )
}