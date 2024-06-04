import {Placeholder} from "react-bootstrap";
import {useGetDetailCharacter} from "../../../entities/character";
import {useParams} from "@tanstack/react-router";
import {CharacterCard} from "../../../entities/character/ui";

export const CharacterPage = () => {
    const characterId = useParams({
        from: '/characters/$characterId',
        select: (params) => params.characterId,
    })

    const {
        data,
        isSuccess,
        isLoading,
    } = useGetDetailCharacter(characterId);

    return(
        <>
            {isLoading && <Placeholder xs={12} size="lg" />}
            {isSuccess && <CharacterCard character={data}/>}
        </>
    )
}