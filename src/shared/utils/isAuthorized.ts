import {jwtDecode} from "jwt-decode";

export const isAuthorized = () => {
    const token = localStorage.getItem("token");

    if (!token) return false;

    const decode = jwtDecode(token);

    return !(Date.now() >= decode.exp! * 1000);
}