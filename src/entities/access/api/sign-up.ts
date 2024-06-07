import {SignUp} from "../dto/signUp.ts";
import {axiosClient, IValidationError} from "../../../shared";
import axios from "axios";

export type SignUpErrorKeys = 'login'

export const signUp = async(value: SignUp) => {
    try {
        return await axiosClient.post('/access/sign-up', value);
    } catch (e) {
        if (
            axios.isAxiosError<
                IValidationError<Record<SignUpErrorKeys, string[]>>,
                Record<SignUpErrorKeys, string[]>
            >(e)
        ) {
            throw e.response?.data.errors;
        }
    }
}