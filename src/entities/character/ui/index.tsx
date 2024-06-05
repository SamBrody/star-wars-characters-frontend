import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import {InputField, MultipleSelectField, SelectField, TextAreaField} from "../../../shared";
import {useFormContext} from "react-hook-form";
import {ReactNode} from "react";
import {useGetSpecies} from "../../species";
import {useGetPlanets} from "../../planet";
import {useGetMovies} from "../../movie";
import {genderOptions} from "../model/character.ts";

type Props = {
    title?: ReactNode,
    actionBtnText?: ReactNode,
    onSubmit: () => void,
    onAction: () => void,
}

export const CharacterCard = (
    {
        title = "",
        actionBtnText = "",
        onSubmit,
        onAction
    }: Props
) => {
    const {control} = useFormContext();

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

    return(
        <Form onSubmit={onSubmit}>
            <h2>{title}</h2>
            <Row style={{marginTop: 30}}>
                <Col>
                    <InputField control={control} name="name" labelValue="Имя персонажа"/>

                    <InputField control={control} name="originalName" labelValue="Имя (в оригинале)"/>

                    <InputField control={control} name="birthYear" labelValue="Дата рождения" type="number"/>

                    <SelectField control={control} name="planets" items={planets} labelValue="Планета"/>

                    <SelectField control={control} name="gender" items={genderOptions} labelValue="Пол"/>

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
                    <Button variant="secondary" onClick={onAction}>
                        {actionBtnText}
                    </Button>
                    <Button variant="secondary" type="submit">
                        Сохранить
                    </Button>
                </Stack>
            </Row>
        </Form>
    )
}