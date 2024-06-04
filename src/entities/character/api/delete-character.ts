import {axiosClient} from "../../../shared";

export const deleteCharacter = async(characterId: number) => {
    if (!characterId) return Promise.reject();

    await axiosClient.delete(`characters/${characterId}`);
}