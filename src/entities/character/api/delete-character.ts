import {axiosClient, IValidationError} from "../../../shared";
import axios from "axios";

export type DeleteCharacterErrorKeys = 'generalErrors'

export const deleteCharacter = async(characterId: number) => {
    if (!characterId) return Promise.reject();

    try {
        await axiosClient.delete(`characters/${characterId}`);
    } catch (e) {
        if (
            axios.isAxiosError<
                IValidationError<Record<DeleteCharacterErrorKeys, string[]>>,
                Record<DeleteCharacterErrorKeys, string[]>
            >(e)
        ) {
            throw e.response?.data.errors;
        }
    }
}