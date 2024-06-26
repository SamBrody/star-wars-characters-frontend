import {Character} from "../model/character.ts";
import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "../../../shared";

const getDetailCharacter = async(characterId: number): Promise<Character> => {
    if (!characterId) return Promise.reject();

    const response = await axiosClient.get<Character>(`characters/${characterId}`);

    return response.data;
}

export const useGetDetailCharacter = (characterId: number) => useQuery(
    {
        queryKey: ['character', characterId],
        queryFn: () => getDetailCharacter(characterId)
    }
)