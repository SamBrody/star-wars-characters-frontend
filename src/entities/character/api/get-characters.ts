import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {CharacterWithPagination} from "../model/character-with-pagination.ts";
import {axiosClient} from "../../../shared";

export type GetCharactersRequest = {
    page: number,
    perPage: number,
    yearLowerBound?: number,
    yearUpperBound?: number,
    moviesIds?: number[],
    homeWorldId?: number,
    gender?: number,
}

const getCharacters = async(
    {page, perPage, yearLowerBound, yearUpperBound, moviesIds, homeWorldId, gender}: GetCharactersRequest
): Promise<CharacterWithPagination> => {
    let url = `characters?page=${page}&per_page=${perPage}`;

    if (yearLowerBound) url += `&year_lower_bound=${yearLowerBound}`;

    if (yearUpperBound) url += `&year_upper_bound=${yearUpperBound}`;

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