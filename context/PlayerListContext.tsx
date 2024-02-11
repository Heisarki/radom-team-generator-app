"use client";
import { PlayerListDataType, playerListData } from "@/utils/constants";
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
  selectedPlayerChip?: string[],
  setSelectedPlayerChip?: Dispatch<SetStateAction<string[]>>,
  handleOnClickChip?: (e: any) => void,
  groupPlayerList?: PlayerListDataType[],
  setGroupPlayerList?: Dispatch<SetStateAction<PlayerListDataType[]>>,
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
  const [selectedPlayerChip, setSelectedPlayerChip] = useState<string[]>([]);
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

  /*------------------On clicking chip logic-------------------*/
  function handleOnClickChip(e: any) {
    const id = e.target.getAttribute("aria-label")
    if (selectedPlayerChip.includes(id)) {
      setSelectedPlayerChip(selectedPlayerChip.filter(ele => ele !== id))
      setGroupPlayerList([
        ...groupPlayerList.filter(ele => ele.id !== id)
      ])
      setFilteredPlayerList([
        ...filteredPlayerList,
        ...filteredPlayerList.filter(ele => ele.id !== id)
      ])
    }
    else {
      setSelectedPlayerChip([...selectedPlayerChip, id])
      setGroupPlayerList([
        ...groupPlayerList,
        ...filteredPlayerList.filter(ele => ele.id === id)
      ])
      setFilteredPlayerList([
        ...filteredPlayerList.filter(ele => ele.id !== id)
      ])
    }
  }

  /*------------------Context value-------------------*/
  const value = {
    filteredPlayerList, setFilteredPlayerList,
    searchValue, setSearchValue,
    onSeachInputChange,
    handleOnClickChip,
    selectedPlayerChip, setSelectedPlayerChip,
    groupPlayerList, setGroupPlayerList,
  }

  return (
    <PlayerListContext.Provider value={value}>
      {children}
    </PlayerListContext.Provider>
  );
};

export const usePlayerListContext = () => useContext(PlayerListContext);
/*-----------------------------------------------------*/


/*-----------------------------------------------------*/
/*-----------------------------------------------------*/