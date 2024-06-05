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
        isFetching,
    } = useGetDetailCharacter(characterId);

    const isLoadingOrFetching = isLoading || isFetching;

    return(
        <>
            {isLoadingOrFetching &&  <Spinner animation="border"/>}
            {!isLoadingOrFetching && isSuccess && <CharacterInfoCard character={data}/>}
        </>
    )
}