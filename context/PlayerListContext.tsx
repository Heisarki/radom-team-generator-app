"use client";
import { PlayerListDataType, playerListData } from "@/constants";
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
  const [constantPlayerList] = useState<PlayerListDataType[]>(playerListData?.data)
  const [filteredPlayerList, setFilteredPlayerList] = useState<PlayerListDataType[]>(playerListData?.data)
  const [groupPlayerList, setGroupPlayerList] = useState<GroupPlayerListType[]>([]);
  const [selectedPlayerListChip, setSelectedPlayerListChip] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('')
  const NUMBER_OF_PLAYER_IN_ONE_GROUP = 6
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
    const value = e.target.value
    setSearchValue(value)
  }

  /*------On clicking chip for adding Player to a Group--------*/
  function handleOnClickAddChip(e: any) {
    const id = e.target.getAttribute("aria-label")
    setSelectedPlayerListChip([...selectedPlayerListChip, id])
    setFilteredPlayerList([
      ...filteredPlayerList.filter(ele => ele.id !== id)
    ])
    if (currentPlayerGroup.groupList.length < NUMBER_OF_PLAYER_IN_ONE_GROUP) {
      setCurrentPlayerGroup({
        ...currentPlayerGroup,
        groupList: [...currentPlayerGroup.groupList, ...filteredPlayerList.filter(ele => ele.id === id)]
      })
    } else {
      setCurrentGroupIndex(prev => prev + 1)
      setCurrentPlayerGroup({
        groupNumber: GROUP_NUMBER[currentGroupIndex + 1],
        groupList: [...filteredPlayerList.filter(ele => ele.id === id)]
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

  useEffect(() => { console.log("GROUP LIST", currentPlayerGroup) })

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
        console.log("GROUP RE 1", tempGroupPlayerList)
        tempGroupPlayerList = tempGroupPlayerList.filter((groupPlayerEle: GroupPlayerListType, index: number) => groupPlayerEle.groupList.length > 0)
        tempGroupPlayerList = tempGroupPlayerList.map((groupPlayerEle: GroupPlayerListType, index: number) => (
          {
            ...groupPlayerEle,
            groupNumber: index + 1
          }
        ))
        console.log("GROUP RE 2", tempGroupPlayerList)
        setCurrentGroupIndex((cur) => cur - 1)
        setCurrentPlayerGroup({
          ...currentPlayerGroup,
          groupNumber: currentPlayerGroup.groupNumber - 1,
        })
        setGroupPlayerList(tempGroupPlayerList)
      }
      // if the player is from the last grouplist then just remove that one player selected 
      else {
        setFilteredPlayerList([
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
  /*------------------Context value-------------------*/
  const value = {
    filteredPlayerList, setFilteredPlayerList,
    searchValue, setSearchValue,
    onSeachInputChange,
    handleOnClickAddChip,
    handleOnClickRemoveChip,
    selectedPlayerListChip, setSelectedPlayerListChip,
    groupPlayerList, setGroupPlayerList,
  }

  return (
    <PlayerListContext.Provider value={value}>
      {children}
    </PlayerListContext.Provider>
  );
};

/*------------------------Context Hook-----------------------------*/
export const usePlayerListContext = () => useContext(PlayerListContext);