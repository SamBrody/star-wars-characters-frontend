import {updateCharacter, UpdateCharacter, UpdateCharacterErrorKeys} from "../../../entities/character";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useUpdateCharacter = (onSuccess: () => void, onError: (error: Record<UpdateCharacterErrorKeys, string[]>) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updCharacter: UpdateCharacter) => updateCharacter(updCharacter),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['characters']});
            onSuccess();
        },
        onError: onError,
    })
}