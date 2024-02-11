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

export type PlayerListContextType = {
  filteredPlayerList?: PlayerListDataType[],
  setFilteredPlayerList?: Dispatch<SetStateAction<PlayerListDataType[]>>,
  searchValue?: string,
  setSearchValue?: Dispatch<SetStateAction<string>>,
  onSeachInputChange?: (e: any) => void,
  handleOnClickAddChip?: (e: any) => void,
  handleOnClickRemoveChip?: (e: any) => void,
  groupPlayerList?: PlayerListDataType[],
  setGroupPlayerList?: Dispatch<SetStateAction<PlayerListDataType[]>>,
  selectedPlayerListChip?: string[],
  setSelectedPlayerListChip?: Dispatch<SetStateAction<string[]>>,
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
  const [searchValue, setSearchValue] = useState('')
  const [selectedPlayerListChip, setSelectedPlayerListChip] = useState<string[]>([]);
  const [groupPlayerList, setGroupPlayerList] = useState<PlayerListDataType[]>([]);

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
    setGroupPlayerList([
      ...groupPlayerList,
      ...filteredPlayerList.filter(ele => ele.id === id)
    ])
  }
  /*------On clicking chip for removing Player from a Group--------*/
  function handleOnClickRemoveChip(e: any) {
    const id = e.target.getAttribute("aria-label")
    setSelectedPlayerListChip(selectedPlayerListChip.filter(ele => ele !== id))
    setFilteredPlayerList([
      ...filteredPlayerList,
      ...groupPlayerList.filter(ele => ele.id === id)
    ])
    setGroupPlayerList([
      ...groupPlayerList.filter(ele => ele.id !== id)
    ])
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