import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCharacter} from "../../../entities/character";

export const useDeleteCharacter = (onSuccess: () => void, onError: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (characterId: number) => deleteCharacter(characterId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['characters']});
            onSuccess();
        },
        onError: () => onError()
    });
}