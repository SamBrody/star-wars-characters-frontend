import {Movie} from "../../movie";
import {Planet} from "../../planet";
import {Species} from "../../species";
import {SelectOptionType} from "../../../shared";

export type Character = {
    id: number,
    name: string,
    originalName: string,
    birthDay: CharacterBirthday,
    homeWorld: Planet,
    gender: CharacterGender,
    species: Species,
    height: number,
    hairColor: string,
    eyeColor: string,
    description: string,
    movies: Movie[],
}

export type CharacterBirthday = {
    year: number,
    era: BirthDayEra,
}

export enum BirthDayEra {
    BBY,
    ABY
}

export const eraOptions: SelectOptionType[] = [
    {value: BirthDayEra.BBY.toString(), label: "ПБЯ"},
    {value: BirthDayEra.ABY.toString(), label: "АБЯ"},
];

export enum CharacterGender {
    male,
    female
}

export const genderOptions: SelectOptionType[] = [
    {value: CharacterGender.male.toString(), label: "Мужской"},
    {value: CharacterGender.female.toString(), label: "Женский"},
];