import {axiosClient, IValidationError} from "../../../shared";
import axios from "axios";
import {UpdateCharacter} from "../dto/update-character.ts";

export type UpdateCharacterErrorKeys =
    'name' | 'originalName' | 'birthDay' | 'planetId' | 'gender' | 'speciesId' |
    'height' | 'hairColor' | 'eyeColor' | 'description' | 'moviesIds' | 'generalErrors'

export const updateCharacter = async(updCharacter: UpdateCharacter) => {
    try {
        return await axiosClient.put(`/characters/${updCharacter.id}`, updCharacter);
    } catch (e) {
        if (
            axios.isAxiosError<
                IValidationError<Record<UpdateCharacterErrorKeys, string[]>>,
                Record<UpdateCharacterErrorKeys, string[]>
            >(e)
        ) {
            throw e.response?.data.errors;
        }
    }
}