import {useQuery} from "@tanstack/react-query";
import {Species} from "../model/species.ts";
import {axiosClient} from "../../../shared";

const getSpecies = async(): Promise<Array<Species>> => {
    const response = await axiosClient.get<Array<Species>>('/species');

    return response.data;
}

export const useGetSpecies = () => useQuery({queryKey: ['species'], queryFn: () => getSpecies()});