import {CharacterBirthday, CharacterGender} from "../model/character.ts";

export type UpdateCharacter = {
    id: number,
    name: string,
    originalName: string,
    birthDay: CharacterBirthday,
    planetId: number,
    gender: CharacterGender,
    speciesId: number,
    height: number,
    hairColor: string,
    eyeColor: string,
    description: string,
    movieIds: number[],
}