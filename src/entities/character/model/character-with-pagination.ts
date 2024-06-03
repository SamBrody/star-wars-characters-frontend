import {Character} from "./character.ts";

export type CharacterWithPagination = {
    items: Character[],
    pageInfo: PageInfo,
}

type PageInfo = {
    items: number,
    page: number,
    perPage: number,
    pages: number,
}