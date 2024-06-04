import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateCharacter} from "../../../entities/character/rdo/create-character.ts";
import {createCharacter, CreateCharacterErrorKeys} from "../../../entities/character";

export const useCreateCharacter = (onSuccess: () => void, onError: (error: Record<CreateCharacterErrorKeys, string[]>) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCharacter: CreateCharacter) => createCharacter(newCharacter),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['characters']});
            onSuccess();
        },
        onError: onError,
    })
}