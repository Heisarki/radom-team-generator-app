import { homeIcon, profileIcon, teamIcon } from "."

export const ROUTE = {
    HOME: "/",
    CREATE_TEAM: "/create-team",
    PROFILE: "/profile",
} as const

export const NAVLIST = [
    {
        id: 1,
        title: "Home",
        icon: homeIcon,
        route: "/",
    },
    {
        id: 2,
        title: "Create",
        icon: teamIcon,
        route: "/create-team",
    },
    {
        id: 3,
        title: "Profile",
        icon: profileIcon,
        route: "/profile",
    }
] as const