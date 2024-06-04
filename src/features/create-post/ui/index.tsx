import {useCreateCharacter} from "../api/use-create-character.ts";
import {useSnackbar} from "notistack";
import {CreateCharacterErrorKeys} from "../../../entities/character";
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import {useNavigate} from "@tanstack/react-router";

export const CreatePostForm = () => {
    const snackbar = useSnackbar();
    const navigate = useNavigate();

    const handleCreateSuccess = () => {
        const msg = 'Персонаж был успешно создан';
        snackbar.enqueueSnackbar(msg, {variant: 'success'});
    }

    const handleCreateError = (error: Record<CreateCharacterErrorKeys, string[]>) => {
        const msg = 'Ошибка:';
        snackbar.enqueueSnackbar(`${msg} ${error}`, {variant: 'error'});
    }

    const {mutate, isSuccess} = useCreateCharacter(handleCreateSuccess, handleCreateError);

    return(
        <Form noValidate>
            <h2>Добавление персонажа</h2>
            <Row style={{marginTop: 30}}>
                <Col>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column>
                            Имя персонажа
                        </Form.Label>
                        <Col>
                            <Form.Control/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="originalName">
                        <Form.Label column>
                            Имя (в оригинале)
                        </Form.Label>
                        <Col>
                            <Form.Control/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="birthDay">
                        <Form.Label column>
                            Дата рождения
                        </Form.Label>
                        <Col>
                            <Form.Control/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="planet">
                        <Form.Label column>
                            Планета
                        </Form.Label>
                        <Col>
                            <Form.Control/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="species">
                        <Form.Label column>
                            Пол
                        </Form.Label>
                        <Col>
                            <Form.Control/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="species">
                        <Form.Label column>
                            Раса
                        </Form.Label>
                        <Col>
                            <Form.Control/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="height">
                        <Form.Label column>
                            Рост
                        </Form.Label>
                        <Col>
                            <Form.Control/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="hairColor">
                        <Form.Label column>
                            Цвет волос
                        </Form.Label>
                        <Col>
                            <Form.Control/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="eyeColor">
                        <Form.Label column>
                            Цвет глаз
                        </Form.Label>
                        <Col>
                            <Form.Control/>
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group as={Row} className="mb-3" controlId="eyeColor">
                        <Form.Label>
                            Описание
                        </Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows={5}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="eyeColor">
                        <Form.Label>
                            Фильмы
                        </Form.Label>
                        <Col>
                            <Form.Select>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Stack direction="horizontal" style={{justifyContent: 'right'}} gap={2}>
                    <Button variant="secondary" onClick={() => navigate({to: '/characters'})}>
                        Отменить
                    </Button>
                    <Button variant="secondary" onClick={() => {}}>
                        Сохранить
                    </Button>
                </Stack>
            </Row>
        </Form>
    )
}