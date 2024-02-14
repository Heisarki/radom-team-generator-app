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
  groupName: string,
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
  const PLAYER_NUMBER_IN_ONE_GROUP = 4
  const GROUP_NAME = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0);
  const [currentPlayerGroup, setCurrentPlayerGroup] = useState<GroupPlayerListType>({
    groupName: GROUP_NAME[currentGroupIndex],
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
    setRemoveClick(false)
    const id = e.target.getAttribute("aria-label")
    setSelectedPlayerListChip([...selectedPlayerListChip, id])
    setFilteredPlayerList([
      ...filteredPlayerList.filter(ele => ele.id !== id)
    ])
    if (currentPlayerGroup.groupList.length < PLAYER_NUMBER_IN_ONE_GROUP) {
      setCurrentPlayerGroup({
        ...currentPlayerGroup,
        groupList: [...currentPlayerGroup.groupList, ...filteredPlayerList.filter(ele => ele.id === id)]
      })
    } else {
      console.log("GROUP YES")
      // setGroupPlayerList([...groupPlayerList, currentPlayerGroup])
      setCurrentGroupIndex(prev => prev + 1)
      setCurrentPlayerGroup({
        groupName: GROUP_NAME[currentGroupIndex + 1],
        groupList: [...filteredPlayerList.filter(ele => ele.id === id)]
      })
    }
    // setGroupPlayerList([
    //   ...groupPlayerList,
    //   ...filteredPlayerList.filter(ele => ele.id === id)
    // ])
  }
  useEffect(() => {
    // if (currentPlayerGroup.groupList.length === PLAYER_NUMBER_IN_ONE_GROUP)
    // setGroupPlayerList([...groupPlayerList, currentPlayerGroup])
    if (removeClick)
      return
    const groupPlayerToBeAdded = [...groupPlayerList, currentPlayerGroup]
    const filteredArr: any = groupPlayerToBeAdded.reduce((acc: any, curr: any) => {
      const index = acc.findIndex((item: any) => item.groupName === curr.groupName);
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
  const [removeClick, setRemoveClick] = useState(false)

  /*------On clicking chip for removing Player from a Group--------*/
  function handleOnClickRemoveChip(e: any) {
    setRemoveClick(true)
    const id = e.target.getAttribute("aria-label")
    setSelectedPlayerListChip(selectedPlayerListChip.filter(ele => ele !== id))
    console.log("GROUP", id, e.target, selectedPlayerListChip)
    let playerToBeRemoved: any = {}
    groupPlayerList.forEach((groupPlayerEle: GroupPlayerListType) => {
      playerToBeRemoved = groupPlayerEle.groupList.filter((ele: PlayerListDataType) => ele.id === id)[0]
    })
    console.log("GROUP REMOVE, ", playerToBeRemoved)
    setFilteredPlayerList([
      ...filteredPlayerList,
      playerToBeRemoved
      // ...groupPlayerList.filter(ele => ele.id === id)
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
    // setGroupPlayerList([
    //   ...groupPlayerList.filter(ele => ele.id !== id)
    // ])
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