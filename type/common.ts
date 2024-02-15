export { }

export type Object = {
    data: PlayerListDataType[],  
}

export type PlayerListDataType = {
    playerGroupNumber: number,
    id: string,
    name: string
}

export type CreatedTeamType = {
    teamName: string,
    teamList: PlayerListDataType
}