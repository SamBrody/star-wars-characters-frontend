import {Character} from "../../../entities/character";
import {Button, Container, Stack} from "react-bootstrap";

type Props = {
    characters?: Character[],
}

export const Characters = ({characters}: Props) => {
    return(
        <Container>
            {characters?.map((c) => (
                <Stack direction="horizontal" style={{border: 'solid 2px lightgray'}}>
                    <Stack direction="vertical">
                        <h4>{c.name}</h4>
                        <h6>{c.originalName}</h6>
                    </Stack>
                    <Button variant="link"><img width={24} height={24} src="/info-circle-fill.svg"/> </Button>
                    <Button variant="link"><img width={24} height={24} src="/pencil-fill.svg"/> </Button>
                </Stack>
            ))}
        </Container>
    )
}