import {Spinner} from "react-bootstrap";
import {CharacterInfoCard, useGetDetailCharacter} from "../../../entities/character";
import {useParams} from "@tanstack/react-router";

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
            {isLoading &&  <Spinner animation="border"/>}
            {isSuccess && <CharacterInfoCard character={data}/>}
        </>
    )
}