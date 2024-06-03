import {Character} from "../model/character.ts";
import {Col, Container, Row} from "react-bootstrap";

type Props = {
    character: Character
}

export const CharacterCard = ({character}: Props) => {
  return (
      <Container fluid>
          <Row>
              <Col>{character.name} ({character.originalName})</Col>
          </Row>
      </Container>
  )
}