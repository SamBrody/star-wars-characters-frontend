import {Col, Container, Form, Row, Stack} from "react-bootstrap";
import {CharacterGender} from "../../../entities/character";
import {useGetMovies} from "../../../entities/movie";
import {useGetPlanets} from "../../../entities/planet";
import {InputField, MultipleSelectField, SelectField, SelectOptionType} from "../../../shared";
import {useFormContext} from "react-hook-form";

export const CharacterFilters = () => {
    const {control} = useFormContext();

    const moviesResponse = useGetMovies();
    const planetResponse = useGetPlanets();

    const movies = moviesResponse.isSuccess
        ? moviesResponse.data.map(x => ({value: x.id.toString() , label: x.name}))
        : [];

    const planets = planetResponse.isSuccess
        ? planetResponse.data.map(x => ({value: x.id.toString(), label: x.name}))
        : [];

    const genders: SelectOptionType[] = [
        {value: CharacterGender.male.toString(), label: "Мужской"},
        {value: CharacterGender.female.toString(), label: "Женский"},
    ];

    return(
        <Container>
            <Row>
                <Col>
                    <Stack direction="horizontal" gap={2} style={{ alignItems: 'baseline'}}>
                        <Form.Label style={{minWidth: 115}}>Дата рождения</Form.Label>

                        <InputField name="yearFrom" control={control} type="number" labelMaxWidth={40} labelValue="с"/>

                        <InputField name="yearTo" control={control} type="number" labelMaxWidth={40} labelValue="по"/>

                        <Form.Label>ДБЯ</Form.Label>
                    </Stack>
                    <Row>
                        <MultipleSelectField
                            control={control}
                            items={movies}
                            isVertical={true}
                            labelMaxWidth={100}
                            name="movies"
                            labelValue="Фильмы"
                        />
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <SelectField control={control} name="planet" items={planets} labelMaxWidth={100} labelValue="Планета"/>
                    </Row>
                    <Row>
                        <SelectField control={control} name="gender" items={genders} labelMaxWidth={100} labelValue="Пол"/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}