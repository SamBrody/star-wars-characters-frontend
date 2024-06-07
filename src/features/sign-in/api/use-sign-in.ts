import {signIn, SignIn, SignInErrorKeys, UserSession} from "../../../entities/access";
import {useMutation} from "@tanstack/react-query";

export const useSignIn = (onSuccess: (userSession: UserSession) => void, onError: (error: Record<SignInErrorKeys, string[]>) => void) => {
    return useMutation({
        mutationFn: async (value: SignIn) => signIn(value),
        onSuccess: (userSession?: UserSession) => {
            if (userSession === undefined) return;

            onSuccess(userSession);
        },
        onError: onError,
    })
}