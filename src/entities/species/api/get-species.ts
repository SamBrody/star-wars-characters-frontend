import {axiosClient} from "../../../shared/api/base.ts";
import {useQuery} from "@tanstack/react-query";
import {Species} from "../model/species.ts";

const getSpecies = async(): Promise<Array<Species>> => {
    const response = await axiosClient.get<Array<Species>>('/species');

    return response.data;
}

export const useGetSpecies = () => useQuery({queryKey: ['species'], queryFn: () => getSpecies()});