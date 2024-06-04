import {CharacterGender} from "../../entities/character";

export const parseGender = (genderNum: number) => {
    const gender = CharacterGender[genderNum];

    if (gender === "male") return "Мужской";
    if (gender === "female") return "Женский";
}