import { homeIcon, profileIcon, teamIcon } from "."

export const ROUTE = {
    HOME: "/",
    TEAMS: "/teams",
    PROFILE: "/profile",
} as const

export const NAVLIST = [
    {
        id: 1,
        text: "Home",
        icon: homeIcon,
        link: "/",
    },
    {
        id: 2,
        text: "Teams",
        icon: teamIcon,
        link: "/teams",
    },
    {
        id: 3,
        text: "Profile",
        icon: profileIcon,
        link: "/profile",
    }
] as const