import {Movie} from "../../movie";
import {Planet} from "../../planet";
import {Species} from "../../species";

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

export enum CharacterGender {
    male,
    female
}