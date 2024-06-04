import {Planet} from "../../planet/model/planet.ts";
import {Species} from "../../species/model/species.ts";
import {Movie} from "../../movie/model/movie.ts";

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