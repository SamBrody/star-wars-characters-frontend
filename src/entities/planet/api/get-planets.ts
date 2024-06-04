import {axiosClient} from "../../../shared/api/base.ts";
import {useQuery} from "@tanstack/react-query";
import {Planet} from "../model/planet.ts";

const getPlanets = async(): Promise<Array<Planet>> => {
    const response = await axiosClient.get<Array<Planet>>('/planets');

    return response.data;
}

export const useGetPlanets = () => useQuery({queryKey: ['planets'], queryFn: () => getPlanets()});