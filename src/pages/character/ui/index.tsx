type Props = {
    characterId: number,
}

export const CharacterPage = ({characterId}: Props) => {
    return(
        <h1>DETAILS {characterId}</h1>
    )
}