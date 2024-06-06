import {axiosClient, IValidationError} from "../../../shared";
import {CreateCharacter} from "../dto/create-character.ts";
import axios from "axios";

export type CreateCharacterErrorKeys =
    'name' | 'originalName' | 'birthDay' | 'planetId' | 'gender' | 'speciesId' |
    'height' | 'hairColor' | 'eyeColor' | 'description' | 'moviesIds'

export const createCharacter = async(newCharacter: CreateCharacter) => {
    try {
        return await axiosClient.post('/characters', newCharacter);
    } catch (e) {
        if (
            axios.isAxiosError<
                IValidationError<Record<CreateCharacterErrorKeys, string[]>>,
                Record<CreateCharacterErrorKeys, string[]>
            >(e)
        ) {
            throw e.response?.data.errors;
        }
    }
}