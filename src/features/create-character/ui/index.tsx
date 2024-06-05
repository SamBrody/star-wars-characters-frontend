import {useCreateCharacter} from "../api/use-create-character.ts";
import {useSnackbar} from "notistack";
import {
    BirthDayEra,
    CharacterBirthday,
    CharacterGender,
    CreateCharacter,
    CreateCharacterErrorKeys
} from "../../../entities/character";
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import {useNavigate} from "@tanstack/react-router";
import {DefaultValues, SubmitHandler, useForm} from "react-hook-form";
import {InputField, MultipleSelectField, SelectField, SelectOptionType, TextAreaField} from "../../../shared";
import {useGetSpecies} from "../../../entities/species";
import {useGetPlanets} from "../../../entities/planet";
import {useEffect} from "react";
import {useGetMovies} from "../../../entities/movie";

type FormValues = {
    name: string,
    originalName: string,
    birthDay: number | string,
    birthEra: SelectOptionType | undefined,
    planets: SelectOptionType| undefined,
    gender: SelectOptionType| undefined,
    species: SelectOptionType | undefined,
    height: number | string,
    hairColor: string,
    eyeColor: string,
    description: string,
    movies: SelectOptionType[]
}

const defValues: DefaultValues<FormValues> = {
    name: '',
    originalName: '',
    birthDay: '',
    birthEra: undefined,
    planets: undefined,
    gender: undefined,
    species: undefined,
    height: '',
    hairColor: '',
    eyeColor: '',
    description: '',
    movies: [],
}

export const CreatePostForm = () => {
    const snackbar = useSnackbar();
    const navigate = useNavigate();

    const speciesResponse = useGetSpecies();
    const planetResponse = useGetPlanets();
    const moviesResponse = useGetMovies();

    const species = speciesResponse.isSuccess
        ? speciesResponse.data.map(x => ({value: x.id.toString(), label: x.name}))
        : [];

    const planets = planetResponse.isSuccess
        ? planetResponse.data.map(x => ({value: x.id.toString(), label: x.name}))
        : [];

    const movies = moviesResponse.isSuccess
        ? moviesResponse.data.map(x => ({value: x.id.toString() , label: x.name}))
        : [];

    const genders: SelectOptionType[] = [
        {value: CharacterGender.male.toString(), label: "Мужской"},
        {value: CharacterGender.female.toString(), label: "Женский"},
    ];

    const {
        setError,
        handleSubmit,
        control,
    } = useForm<FormValues>({defaultValues: defValues});

    const handleCreateSuccess = () => {
        const msg = 'Персонаж был успешно создан';
        snackbar.enqueueSnackbar(msg, {variant: 'success'});
    }

    const handleCreateError = (error: Record<CreateCharacterErrorKeys, string[]>) => {
        const msg = 'Произошла ошибка при создании!';
        snackbar.enqueueSnackbar(`${msg}`, {variant: 'error'});

        Object.keys(error).forEach(key => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setError(key, { message: error[key][0]});
        })
    }

    const {mutate, isSuccess} = useCreateCharacter(handleCreateSuccess, handleCreateError);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const birthDay: CharacterBirthday = {
            year: data.birthDay as number,
            era: data.birthEra?.value ? Number(data.birthEra.value) : BirthDayEra.BBY,
        }

        const character: CreateCharacter = {
            name: data.name,
            originalName: data.originalName,
            birthDay: birthDay,
            planetId: Number(data.planets?.value),
            gender: Number(data.gender?.value) === 0 ? CharacterGender.male : CharacterGender.female,
            speciesId: Number(data.species?.value),
            height: Number(data.height),
            hairColor: data.hairColor,
            eyeColor: data.eyeColor,
            description: data.description,
            movieIds: data.movies.map(x => Number(x.value)),
        }

        mutate(character);
    }

    useEffect(() => {
        isSuccess && navigate({to: '/characters'});
    }, [isSuccess]);

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h2>Добавление персонажа</h2>
            <Row style={{marginTop: 30}}>
                <Col>
                    <InputField control={control} name="name" labelValue="Имя персонажа"/>

                    <InputField control={control} name="originalName" labelValue="Имя (в оригинале)"/>

                    <InputField control={control} name="birthDay" labelValue="Дата рождения" type="number"/>

                    <SelectField control={control} name="planets" items={planets} labelValue="Планета"/>

                    <SelectField control={control} name="gender" items={genders} labelValue="Пол"/>

                    <SelectField control={control} name="species" items={species} labelValue="Раса"/>

                    <InputField control={control} name="height" type="number" labelValue="Рост (см)" />

                    <InputField control={control} name="hairColor" labelValue="Цвет волос"/>

                    <InputField control={control} name="eyeColor" labelValue="Цвет глаз"/>
                </Col>
                <Col>
                    <TextAreaField control={control} name="description" labelValue="Описание"/>

                    <MultipleSelectField control={control} items={movies} name="movies" labelValue="Фильмы"/>
                </Col>
            </Row>
            <Row>
                <Stack direction="horizontal" style={{justifyContent: 'right'}} gap={2}>
                    <Button variant="secondary" onClick={() => navigate({to: '/characters'})}>
                        Отменить
                    </Button>
                    <Button variant="secondary" type="submit">
                        Сохранить
                    </Button>
                </Stack>
            </Row>
        </Form>
    )
}