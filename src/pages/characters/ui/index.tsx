import {Button, Container, Pagination, Placeholder, Row} from "react-bootstrap";
import {Characters} from "./characters.tsx";
import {CharacterFilters} from "./character-filters.tsx";
import {ReactNode, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {GetCharactersRequest, useGetCharacters} from "../../../entities/character";

const PAGE = 1;
const PER_PAGE = 4;

type DefaultFilterFormValues = {
    yearFrom?: number,
    toFrom?: number,
    planetId?: number,
    speciesId?: number,
    moviesIds?: number[],
}

export const CharactersPage = () => {
    const filtersForm = useForm<DefaultFilterFormValues>();

    const [page, setPage] = useState(PAGE);
    const req: GetCharactersRequest = {
        page: page,
        perPage: PER_PAGE,
    }

    const {
        data,
        isError,
        error,
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
                <FormProvider {...filtersForm}>
                    <CharacterFilters/>
                </FormProvider>
            </Row>
            <hr/>
            <Row style={{marginTop: 30, marginBottom: 30, minHeight: 190}}>
                {loadingOrFetching && <Placeholder animation="glow" xs={12} size="lg" />}
                {isSuccess && !(isLoading || isFetching) && <Characters characters={data.items}/>}
                {isError && <h3>Возникла ошибка! {error.message}</h3>}
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