import {PostLogin} from "../dto/post-login.ts";
import {axiosClient, IValidationError} from "../../../shared";
import axios from "axios";

export type LoginErrorKeys = 'login' | 'password'

export const postLogin = async(login: PostLogin) => {
    try {
        return await axiosClient.post('/access/signin', login);
    } catch (e) {
        if (
            axios.isAxiosError<
                IValidationError<Record<LoginErrorKeys, string[]>>,
                Record<LoginErrorKeys, string[]>
            >(e)
        ) {
            throw e.response?.data.errors;
        }
    }
}