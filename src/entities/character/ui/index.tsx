import {Character} from "../model/character.ts";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import {useNavigate} from "@tanstack/react-router";
import {useState} from "react";
import {CharacterDeleteModal} from "../../../features/delete-character";
import {parseEra, parseGender} from "../../../shared";

type Props = {
    character: Character
}

export const CharacterCard = ({character}: Props) => {
    const propertyStyle = {width: 120, maxWidth: 120};
    const propValueStyle = {fontSize: 16};

    const navigate = useNavigate();
    const handleClick = (routeName: string) => navigate({to: routeName});

    const [showModal, setShowModal] = useState(false);
    
    return (
        <Container>
            <Row style={{marginBottom: 15}}>
                <Col>
                    <Row style={{marginBottom: 30}}>
                      <h2>{`${character.name} (${character.originalName})`}</h2>
                  </Row>
                    <Row style={{marginBottom: 30}}>
                        <Col>
                            <Stack direction="horizontal" style={{alignItems: "baseline"}} gap={3}>
                                <h6 style={propertyStyle}>Дата рождения</h6>
                                <p style={propValueStyle}>{character.birthDay.year} {parseEra(character.birthDay.era)}</p>
                            </Stack>

                            <Stack direction="horizontal" style={{alignItems: "baseline"}} gap={3}>
                                <h6 style={propertyStyle}>Планета</h6>
                                <p style={propValueStyle}>{character.homeWorld.name}</p>
                            </Stack>

                            <Stack direction="horizontal" style={{alignItems: "baseline"}} gap={3}>
                                <h6 style={propertyStyle}>Пол</h6>
                                <p style={propValueStyle}>{parseGender(character.gender)}</p>
                            </Stack>
                            
                            <Stack direction="horizontal" style={{alignItems: "baseline"}} gap={3}>
                                <h6 style={propertyStyle}>Раса</h6>
                                <p style={propValueStyle}>{character.species.name}</p>
                            </Stack>
                        </Col>
                        <Col>
                            <Stack direction="horizontal" style={{alignItems: "baseline"}} gap={3}>
                                <h6 style={propertyStyle}>Рост</h6>
                                <p style={propValueStyle}>{character.height / 100} м</p>
                            </Stack>
                            <Stack direction="horizontal"  style={{alignItems: "baseline"}} gap={3}>
                                <h6 style={propertyStyle}>Цвет волос</h6>
                                <p style={propValueStyle}>{character.hairColor}</p>
                            </Stack>
                            <Stack direction="horizontal" style={{alignItems: "baseline"}} gap={3}>
                                <h6 style={propertyStyle}>Цвет глаз</h6>
                                <p style={propValueStyle}>{character.eyeColor}</p>
                            </Stack>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <h3>Фильмы:</h3>
                    {character.movies.map(x => (
                        <Stack key={x.id}>
                             - {x.name}
                        </Stack>
                    ))}
                </Col>
            </Row>
            <Row style={{marginBottom: 15}}>
                <p style={{fontSize: 24}}>{character.description}</p>
            </Row>
            <Row>
                <Stack direction="horizontal" style={{justifyContent: 'right'}} gap={2}>
                    <Button variant="secondary" onClick={() => setShowModal(true)}>
                        Удалить
                    </Button>
                    <Button variant="secondary" onClick={() => handleClick(`/characters/${character.id}/edit`)}>
                        Редактировать
                    </Button>
                </Stack>
            </Row>
            <CharacterDeleteModal
                characterId={character.id}
                show={showModal}
                handleSubmit={() => navigate({to: '/characters'})}
                handleClose={() => setShowModal(false)}
            />
        </Container>
    )
}