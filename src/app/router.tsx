import {redirect, RootRoute, Route, Router} from "@tanstack/react-router";
import {HomePage} from "../pages/home";
import {CharacterPage} from "../pages/character";
import {CreateCharacterPage} from "../pages/create-character";
import {CharactersPage} from "../pages/characters";
import {UpdateCharacterPage} from "../pages/update-character";

export const routeRoot = new RootRoute();

const homeRoute = new Route({
    beforeLoad: async () => {
        redirect({to: '/characters'})
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

const routeTree = routeRoot.addChildren([homeRoute,]);

homeRoute.addChildren([characterDetailRoute, createCharacterRoute, updateCharacterRoute, charactersRoute])

export const router = new Router({routeTree: routeTree});