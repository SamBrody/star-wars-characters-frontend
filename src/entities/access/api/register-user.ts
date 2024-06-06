import {RegisterUser} from "../dto/register-user.ts";
import {axiosClient, IValidationError} from "../../../shared";
import axios from "axios";

export type RegisterUserErrorKeys = 'login' | 'password'

export const registerUser = async(newUser: RegisterUser) => {
    try {
        return await axiosClient.post('/access/register', newUser);
    } catch (e) {
        if (
            axios.isAxiosError<
                IValidationError<Record<RegisterUserErrorKeys, string[]>>,
                Record<RegisterUserErrorKeys, string[]>
            >(e)
        ) {
            throw e.response?.data.errors;
        }
    }
}