import {signUp, SignUp, SignUpErrorKeys} from "../../../entities/access";
import {useMutation} from "@tanstack/react-query";

export const useSignUp = (onSuccess: () => void, onError: (error: Record<SignUpErrorKeys, string[]>) => void) => {
    return useMutation({
        mutationFn: async (value: SignUp) => signUp(value),
        onSuccess: () => onSuccess(),
        onError: onError,
    })
}