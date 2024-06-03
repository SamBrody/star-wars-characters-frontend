import {Character} from "../../../entities/character";
import {Stack} from "react-bootstrap";

type Props = {
    characters?: Character[],
}

export const Characters = ({characters}: Props) => {
    return(
        <>
            {characters?.map(() => (
                <Stack>
                    <>items</>
                </Stack>
            ))}
        </>
    )
}