"use client";
import { playerListData } from "@/constants";
import { CreatedTeamType, PlayerListDataType } from "@/type";
import { randomizeArrayIndex, toaster } from "@/utils";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactNode,
} from "react";

/*-------------------------Type----------------------------*/
export type PlayerListContextType = {
  filteredPlayerList?: PlayerListDataType[],
  setFilteredPlayerList?: Dispatch<SetStateAction<PlayerListDataType[]>>,
  searchValue?: string,
  setSearchValue?: Dispatch<SetStateAction<string>>,
  onSeachInputChange?: (e: any) => void,
  handleOnClickAddChip?: (e: any) => void,
  handleOnClickRemoveChip?: (e: any) => void,
  groupPlayerList?: GroupPlayerListType[],
  setGroupPlayerList?: Dispatch<SetStateAction<GroupPlayerListType[]>>,
  selectedPlayerListChip?: string[],
  setSelectedPlayerListChip?: Dispatch<SetStateAction<string[]>>,
  createdTeam?: CreatedTeamType[],
  setCreatedTeam?: Dispatch<SetStateAction<CreatedTeamType[]>>,
  handleOnClickCreateTeam: () => void,
}
export type GroupPlayerListType = {
  groupNumber: number,
  groupList: PlayerListDataType[],
}

/*-------------------------Context----------------------------*/
const PlayerListContext = createContext({} as PlayerListContextType);

/*-------------------------Context Provider--------------------------*/
export const PlayerListContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [constantPlayerList, setConstantPlayerList] = useState<PlayerListDataType[]>(playerListData?.data)
  const [filteredPlayerList, setFilteredPlayerList] = useState<PlayerListDataType[]>(playerListData?.data)
  const [groupPlayerList, setGroupPlayerList] = useState<GroupPlayerListType[]>([]);
  const [selectedPlayerListChip, setSelectedPlayerListChip] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('')
  const [createdTeam, setCreatedTeam] = useState<CreatedTeamType[]>([])
  const [teamName, setTeamName] = useState<string[]>([
    "AA", "BB", "CC", "DD"
  ])
  const NUMBER_OF_PLAYER_IN_ONE_GROUP = 4
  const GROUP_NUMBER: number[] = []
  for (let i = 0; i < 20; i++) {
    GROUP_NUMBER.push(i + 1)
  }
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0);
  const [currentPlayerGroup, setCurrentPlayerGroup] = useState<GroupPlayerListType>({
    groupNumber: GROUP_NUMBER[currentGroupIndex],
    groupList: []
  })
  /*------------------Search logic-------------------*/
  useEffect(() => {
    if (searchValue)
      setFilteredPlayerList([
        ...constantPlayerList.filter((ele: any) => ele.name.toLowerCase().includes(searchValue.trim().toLowerCase()))
      ])
    else
      setFilteredPlayerList(constantPlayerList)
  }, [searchValue])
  function onSeachInputChange(e: any) {
    setSearchValue(e.target.value)
  }

  /*------On clicking chip for adding Player to a Group--------*/
  function handleOnClickAddChip(e: any) {
    const id = e.target.getAttribute("aria-label")
    setSelectedPlayerListChip([...selectedPlayerListChip, id])
    setFilteredPlayerList([
      ...filteredPlayerList.filter(ele => ele.id !== id)
    ])
    setConstantPlayerList([
      ...filteredPlayerList.filter(ele => ele.id !== id)
    ])
    const playerToBeAdded: PlayerListDataType = filteredPlayerList.filter(ele => ele.id === id)[0]
    playerToBeAdded.playerGroupNumber = currentGroupIndex + 1 // change the playerGroupNumber to the groupNumber
    // If player number is less than NUMBER_OF_PLAYER_IN_ONE_GROUP add to current group
    if (currentPlayerGroup.groupList.length < NUMBER_OF_PLAYER_IN_ONE_GROUP) {
      setCurrentPlayerGroup({
        ...currentPlayerGroup,
        groupList: [
          ...currentPlayerGroup.groupList,
          playerToBeAdded,
        ]
      })
    }
    // If player number is more than NUMBER_OF_PLAYER_IN_ONE_GROUP add to next group
    else {
      setCurrentGroupIndex(prev => prev + 1)
      playerToBeAdded.playerGroupNumber = currentGroupIndex + 2 // change the playerGroupNumber to the groupNumber
      setCurrentPlayerGroup({
        groupNumber: GROUP_NUMBER[currentGroupIndex + 1],
        groupList: [
          playerToBeAdded,
        ]
      })
    }
  }
  /* side effect to add a player to "GroupPlayerList" */
  useEffect(() => {
    const groupPlayerToBeAdded = [...groupPlayerList, currentPlayerGroup]
    const filteredArr: any = groupPlayerToBeAdded.reduce((acc: any, curr: any) => {
      const index = acc.findIndex((item: any) => item.groupNumber === curr.groupNumber);
      if (index !== -1) {
        acc.splice(index, 1, curr);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    setGroupPlayerList(filteredArr)

  }, [currentPlayerGroup.groupList.length])

  useEffect(() => { console.log("GROUP LIST", groupPlayerList) })

  /*------On clicking chip for removing Player from a Group--------*/
  function handleOnClickRemoveChip(e: any) {
    const id = e.target.getAttribute("aria-label")
    setSelectedPlayerListChip(selectedPlayerListChip.filter(ele => ele !== id))
    console.log("GROUP", id, e.target, selectedPlayerListChip)
    let playerToBeRemoved: any;
    let findIndex: number = -1;

    groupPlayerList.forEach((groupPlayerEle: GroupPlayerListType, index: number) => {
      const findPlayer = groupPlayerEle.groupList.find((ele: PlayerListDataType) => ele.id === id)
      if (findPlayer) {
        playerToBeRemoved = findPlayer
        findIndex = index
        if (index !== groupPlayerList.length - 1)
          playerToBeRemoved = groupPlayerEle.groupList
      }
    })
    if (findIndex !== -1) {
      // check if player to be removed is not the last grouplist, then remove all player from this grouplist 
      if (findIndex !== groupPlayerList.length - 1) {
        setFilteredPlayerList([
          ...filteredPlayerList,
          ...playerToBeRemoved
        ])
        setConstantPlayerList([
          ...filteredPlayerList,
          ...playerToBeRemoved
        ])
        let tempGroupPlayerList = groupPlayerList.map((groupPlayerEle: GroupPlayerListType, index: number) => (
          {
            ...groupPlayerEle,
            groupNumber: index + 1,
            groupList:
              // find the GroupList and remove all the player from that List
              groupPlayerEle.groupList.some((ele: PlayerListDataType) => ele.id === id)
                ? []
                : groupPlayerEle.groupList
          }
        ))
        tempGroupPlayerList = tempGroupPlayerList.filter((groupPlayerEle: GroupPlayerListType, index: number) => groupPlayerEle.groupList.length > 0)
        tempGroupPlayerList = tempGroupPlayerList.map((groupPlayerEle: GroupPlayerListType, index: number) => (
          {
            ...groupPlayerEle,
            groupNumber: index + 1,
            // map and change the playerGroupNumber to the groupNumber
            groupList: groupPlayerEle.groupList.map((groupListEele: PlayerListDataType) => ({ ...groupListEele, playerGroupNumber: index + 1 }))
          }
        ))
        setCurrentGroupIndex((cur) => cur - 1)
        setCurrentPlayerGroup({
          ...currentPlayerGroup,
          groupNumber: currentPlayerGroup.groupNumber - 1,
          // map and change the playerGroupNumber to the groupNumber
          groupList: currentPlayerGroup.groupList.map((groupListEele: PlayerListDataType) => ({ ...groupListEele, playerGroupNumber: currentPlayerGroup.groupNumber - 1 }))
        })
        setGroupPlayerList(tempGroupPlayerList)
      }
      // if the player is from the last grouplist then just remove that one player selected 
      else {
        setFilteredPlayerList([
          ...filteredPlayerList,
          playerToBeRemoved
        ])
        setConstantPlayerList([
          ...filteredPlayerList,
          playerToBeRemoved
        ])
        setGroupPlayerList(groupPlayerList.map((groupPlayerEle: GroupPlayerListType) => (
          {
            ...groupPlayerEle,
            groupList: groupPlayerEle.groupList.filter((ele: PlayerListDataType) => ele.id !== id)
          }
        )))
        setCurrentPlayerGroup({
          ...currentPlayerGroup,
          groupList: currentPlayerGroup.groupList.filter((groupListEle: PlayerListDataType) => groupListEle.id !== id)
        })
      }
    }
  }
  /*-------On clicking generating Team player handler------------*/
  function handleOnClickCreateTeam() {
    if (filteredPlayerList.length > 0) {
      toaster.error("All the players must be grouped!")
      return;
    }
    // creating the team template array data
    const createdTeamTemplate: CreatedTeamType[] = [];
    for (let i = 0; i < NUMBER_OF_PLAYER_IN_ONE_GROUP; i++) {
      const teamTeamplate: CreatedTeamType = {
        teamName: teamName[i],
        teamList: []
      }
      createdTeamTemplate.push(teamTeamplate);
    }
    //
    for (let i = 0; i < groupPlayerList.length; i++) {
      const groupPlayer = groupPlayerList[i].groupList;
      console.log("GROUP !", groupPlayer)
      const randomIndex = randomizeArrayIndex(NUMBER_OF_PLAYER_IN_ONE_GROUP);
      for (let j = 0; j < NUMBER_OF_PLAYER_IN_ONE_GROUP; j++) {
        console.log("GROUP", { randomIndex }, randomIndex[j])
        createdTeamTemplate[j].teamList.push(groupPlayer[randomIndex[j]])
      }
    }
    console.log("GROUP created Team", createdTeamTemplate)
    setCreatedTeam(createdTeamTemplate)
  }

  /*------------------Context value-------------------*/
  const value = {
    filteredPlayerList, setFilteredPlayerList,
    searchValue, setSearchValue,
    onSeachInputChange,
    handleOnClickAddChip,
    handleOnClickRemoveChip,
    selectedPlayerListChip, setSelectedPlayerListChip,
    groupPlayerList, setGroupPlayerList,
    createdTeam, setCreatedTeam,
    handleOnClickCreateTeam,
  }

  return (
    <PlayerListContext.Provider value={value}>
      {children}
    </PlayerListContext.Provider>
  );
};

/*------------------------Context Hook-----------------------------*/
export const usePlayerListContext = () => useContext(PlayerListContext);