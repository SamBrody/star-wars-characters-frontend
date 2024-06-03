import {CharacterWithPagination} from "../model/character-with-pagination.ts";
import {axiosClient} from "../../../shared/api/base.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

export type GetCharactersRequest = {
    page: number,
    perPage: number,
    bornDateFrom?: number,
    bornDateTo?: number,
    moviesIds?: number[],
    homeWorldId?: number,
    gender?: number,
}

const getCharacters = async(
    {page, perPage, bornDateFrom, bornDateTo, moviesIds, homeWorldId, gender}: GetCharactersRequest
): Promise<CharacterWithPagination> => {
    let url = `characters?page=${page}&per_page=${perPage}`;

    if (bornDateFrom) url += `&born_year_from=${bornDateFrom}`;

    if (bornDateTo) url += `&born_year_to=${bornDateTo}`;

    if (moviesIds) moviesIds.forEach(function (value) {
        url += `&movie_id=${value}`
    })

    if (homeWorldId) url += `&home_world_id=${homeWorldId}`;

    if (gender) url += `&gender=${gender}`;

    const response = await axiosClient.get<CharacterWithPagination>(url);

    return response.data;
}

export const useGetCharacters = (request: GetCharactersRequest) => useQuery(
    {
        queryKey: ['characters', request],
        queryFn: () => getCharacters(request),
        placeholderData: keepPreviousData,
    }
)