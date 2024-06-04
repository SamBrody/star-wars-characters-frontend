import {BirthDayEra} from "../../entities/character";

export const parseEra = (eraNum: number) => {
    const gender = BirthDayEra[eraNum];

    if (gender === "BBY") return "ДБЯ";
    if (gender === "ABY") return "ПБЯ";
}