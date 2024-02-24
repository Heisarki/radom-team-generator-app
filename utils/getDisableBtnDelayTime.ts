export function getDisableBtnDelayTime(numberOfPlayers: number) {
    if (numberOfPlayers === 1)
        return 1500
    else if (numberOfPlayers < 5)
        return 900 * numberOfPlayers
    else if (numberOfPlayers < 10)
        return 700 * numberOfPlayers
    else if (numberOfPlayers < 15)
        return 600 * numberOfPlayers
    else
        return 500 * numberOfPlayers
}