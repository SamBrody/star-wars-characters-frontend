import {useQuery} from "@tanstack/react-query";
import {Movie} from "../model/movie.ts";
import {axiosClient} from "../../../shared";

const getMovies = async(): Promise<Array<Movie>> => {
    const response = await axiosClient.get<Array<Movie>>('/movies');

    return response.data;
}

export const useGetMovies = () => useQuery({queryKey: ['movies'], queryFn: () => getMovies()});