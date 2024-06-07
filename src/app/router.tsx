import {redirect, RootRoute, Route, Router} from "@tanstack/react-router";
import {HomePage} from "../pages/home";
import {CharacterPage} from "../pages/character";
import {CreateCharacterPage} from "../pages/create-character";
import {CharactersPage} from "../pages/characters";
import {UpdateCharacterPage} from "../pages/update-character";
import {SignInPage} from "../pages/sign-in";
import {SignUpPage} from "../pages/sign-up";
import {jwtDecode} from "jwt-decode";

export const routeRoot = new RootRoute();

const signInRoute = new Route({
    getParentRoute: () => routeRoot,
    path: '/sign-in',
    component: SignInPage,
});

const signUpRoute = new Route({
    getParentRoute: () => routeRoot,
    path: '/sign-up',
    component: SignUpPage,
});

const homeRoute = new Route({
    beforeLoad: async () => {
        const token = localStorage.getItem("token");

        if (!token) throw redirect({to: '/sign-in'});

        const decode = jwtDecode(token);
        const isExpired = Date.now() >= decode.exp! * 1000;

        if (isExpired) throw redirect({to: '/sign-in'});

        if (router.state.location.pathname === '/') throw redirect({to: '/characters'});
    },
    getParentRoute: () => routeRoot,
    path: '/',
    component: HomePage,
});

const characterDetailRoute = new Route({
    getParentRoute: () => homeRoute,
    path: '/characters/$characterId',
    component: CharacterPage,
});

const createCharacterRoute = new Route({
    getParentRoute: () => homeRoute,
    path: '/characters/new',
    component: CreateCharacterPage,
});

const updateCharacterRoute = new Route({
    getParentRoute: () => homeRoute,
    path: '/characters/$characterId/edit',
    component: UpdateCharacterPage,
});

const charactersRoute = new Route({
    getParentRoute: () => homeRoute,
    path: '/characters',
    component: CharactersPage,
});

const routeTree = routeRoot.addChildren([homeRoute, signInRoute, signUpRoute]);

homeRoute.addChildren([characterDetailRoute, createCharacterRoute, updateCharacterRoute, charactersRoute]);

export const router = new Router({routeTree: routeTree});