import {axiosClient} from "../../../shared/api/base.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const deleteCharacter = async(characterId: number) => {
    if (!characterId) return Promise.reject();

    await axiosClient.delete(`characters/${characterId}`);
}

export const useDeleteCharacter = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (characterId: number) => deleteCharacter(characterId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['characters']});
            onSuccess();
        }
    });
}