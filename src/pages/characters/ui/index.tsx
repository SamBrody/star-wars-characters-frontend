import {Button, Container, Pagination, Row, Spinner} from "react-bootstrap";
import {Characters} from "./characters.tsx";
import {CharacterFilters} from "./character-filters.tsx";
import {ReactNode, useEffect, useState} from "react";
import {DefaultValues, FormProvider, useForm} from "react-hook-form";
import {GetCharactersRequest, useGetCharacters} from "../../../entities/character";
import {SelectOptionType} from "../../../shared";

const PAGE = 1;
const PER_PAGE = 4;

type FormValues = {
    yearLowerBound?: number | string,
    yearUpperBound?: number | string,
    planet?: SelectOptionType | undefined,
    gender?: SelectOptionType | undefined,
    movies?: SelectOptionType[],
}

const defValues: DefaultValues<FormValues> = {
    yearLowerBound: '',
    yearUpperBound: '',
    planet: undefined,
    gender: undefined,
    movies: [],
}

export const CharactersPage = () => {
    const filtersForm = useForm<FormValues>({defaultValues: defValues});

    const defaultRequest: GetCharactersRequest = {
        page: PAGE,
        perPage: PER_PAGE,
    }

    const [request, setRequest] = useState<GetCharactersRequest>(defaultRequest);

    const {
        data,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess
    } = useGetCharacters(request);

    const pageInfo = data?.pageInfo;

    /// Наблюдатели за фильтрами
    const watchYearLowerBound = filtersForm.watch('yearLowerBound');
    const watchYearUpperBound = filtersForm.watch('yearUpperBound');
    const watchMovies = filtersForm.watch('movies');
    const watchPlanet = filtersForm.watch('planet');
    const watchGender = filtersForm.watch('gender');

    useEffect(() => {
        setRequest(prevState => ({...prevState, yearLowerBound: Number(watchYearLowerBound!)}))
    }, [watchYearLowerBound]);

    useEffect(() => {
        setRequest(prevState => ({...prevState, yearUpperBound: Number(watchYearUpperBound!)}))
    }, [watchYearUpperBound]);

    useEffect(() => {
        const ids = watchMovies!.map(x => Number(x.value));

        setRequest(prevState => ({...prevState, moviesIds: ids}))
    }, [watchMovies]);

    useEffect(() => {
        const id = watchPlanet ? Number(watchPlanet.value) : undefined;

        setRequest(prevState => ({...prevState, homeWorldId: id}))
    }, [watchPlanet]);

    useEffect(() => {
        const id = watchGender ? Number(watchGender.value) : undefined;

        setRequest(prevState => ({...prevState, gender: id}))
    }, [watchGender]);

    const GetPagination = (count: number, currentPage: number) => {
        const items: ReactNode[] = [];
        
        for (let i = 1; i <= count; i++) {
            items.push(
                <Button
                    variant="outline-secondary"
                    key={i}
                    active={i === currentPage}
                    onClick={() => setRequest(prevState => ({...prevState, page: i}))}
                >
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
                {loadingOrFetching &&  <Spinner animation="border"/>}
                {isSuccess && !(isLoading || isFetching) && <Characters characters={data.items}/>}
                {isError && <h3>Возникла ошибка! {error.message}</h3>}
                {!loadingOrFetching && isSuccess && data.items && data.items.length === 0 && <h3>Не нашлось ни одного персонажа :(</h3>}
            </Row>
            <Row style={{marginTop: 30}}>
                <Pagination style={{justifyContent: 'center',}}>
                    {!loadingOrFetching && isSuccess && pageInfo && GetPagination(pageInfo.pages, pageInfo.page)}
                </Pagination>
            </Row>
        </Container>
    )
}