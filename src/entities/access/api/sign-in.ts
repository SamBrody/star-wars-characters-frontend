import {SignIn} from "../dto/sign-in.ts";
import {axiosClient, IValidationError} from "../../../shared";
import axios from "axios";
import {UserSession} from "../model/user-session.ts";

export type SignInErrorKeys = 'login' | 'password'

export const signIn = async(value: SignIn) => {
    try {
        const response = await axiosClient.post<SignIn, UserSession>('/access/sign-in', value);

        return response.data;
    } catch (e) {
        if (
            axios.isAxiosError<
                IValidationError<Record<SignInErrorKeys, string[]>>,
                Record<SignInErrorKeys, string[]>
            >(e)
        ) {
            throw e.response?.data.errors;
        }
    }
}