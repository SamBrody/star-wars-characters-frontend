import {axiosClient} from "../../../shared/api/base.ts";
import {useQuery} from "@tanstack/react-query";
import {Movie} from "../model/movie.ts";

const getMovies = async(): Promise<Array<Movie>> => {
    const response = await axiosClient.get<Array<Movie>>('/movies');

    return response.data;
}

export const useGetMovies = () => useQuery({queryKey: ['movies'], queryFn: () => getMovies()});