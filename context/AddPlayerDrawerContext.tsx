"use client";
import { v4 } from 'uuid'
import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { PlayerListDataType } from '@/type';
import { useToast } from '@/components/ui/use-toast';
import { PlayerListContextType, usePlayerListContext } from './PlayerListContext';

/*-------------------------Type----------------------------*/
export type AddPlayerDrawerContextType = {
    playersTobeAdded: PlayerListDataType[],
    setPlayersTobeAdded: Dispatch<SetStateAction<PlayerListDataType[]>>,
    playersTobeAddedInputValue: string,
    setPlayersTobeAddedInpuValue: Dispatch<SetStateAction<string>>,
    handleAddPlayerClick: () => void,
    handleRemovePlayerClick: (e: any) => void,
    handleConfirmAddPlayerClick: () => void,
    onPlayerNameInputChange: (e: any) => void,
}
/*-------------------------Context----------------------------*/
const AddPlayerDrawerContext = createContext({} as AddPlayerDrawerContextType);

/*-------------------------Context Provider--------------------------*/
export const AddPlayerDrawerContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const {
        filteredPlayerList, setFilteredPlayerList,
        constantPlayerList, setConstantPlayerList
    }: PlayerListContextType = usePlayerListContext();
    const { toast } = useToast();
    const [playersTobeAdded, setPlayersTobeAdded] = useState<PlayerListDataType[]>([])
    const [playersTobeAddedInputValue, setPlayersTobeAddedInpuValue] = useState<string>("")
    /* Handler for "Add" button click to add player entered in the Text field*/
    function handleAddPlayerClick() {
        if (playersTobeAddedInputValue === "") {
            toast({
                variant: "default",
                // title: "Create player group",
                description: `Enter player name`,
            })
            return;
        }
        setPlayersTobeAdded([
            ...playersTobeAdded,
            {
                playerGroupNumber: 0,
                name: playersTobeAddedInputValue,
                id: v4(),
            }
        ])
        setPlayersTobeAddedInpuValue("");
    }

    /* Handler to remove Player added */
    function handleRemovePlayerClick(e: any) {
        const id = e.target.getAttribute("aria-label")
        console.log("GROUP", id)
        setPlayersTobeAdded((playersTobeAdded.filter((ele: PlayerListDataType) => ele.id !== id)))
    }

    /* Handler confirm and add the player to the list*/
    function getPlayerNameToBeAdded() {
        const str: string = playersTobeAdded.reduce((acc: string, playersTobeAddEle: PlayerListDataType) => (acc + playersTobeAddEle.name + ", "), "") as string
        console.log("GROUP", str.trim().substring(0, str.length - 2))
        return str.trim().substring(0, str.length - 2)
    }
    function handleConfirmAddPlayerClick() {
        if (playersTobeAdded.length === 0) {
            toast({
                variant: "default",
                title: "No players",
                description: `You have not entered any player`,
            })
            return;
        }
        setConstantPlayerList([...constantPlayerList, ...playersTobeAdded])
        setFilteredPlayerList([...filteredPlayerList, ...playersTobeAdded])
        setPlayersTobeAdded([])
        toast({
            variant: "default",
            title: "Players added",
            description: `${getPlayerNameToBeAdded()} ${getPlayerNameToBeAdded().split(",").length > 1 ? " are " : " is "} added to the players list`,
        })
    }

    /**/
    function onPlayerNameInputChange(e: any) {
        setPlayersTobeAddedInpuValue(e.target.value)
    }

    /*------------------Context value-------------------*/
    const value = {
        playersTobeAdded, setPlayersTobeAdded,
        playersTobeAddedInputValue, setPlayersTobeAddedInpuValue,
        handleAddPlayerClick,
        handleRemovePlayerClick,
        handleConfirmAddPlayerClick,
        onPlayerNameInputChange,
    }

    return (
        <AddPlayerDrawerContext.Provider value={value}>
            {children}
        </AddPlayerDrawerContext.Provider>
    );
};

/*------------------------Context Hook-----------------------------*/
export const useAddPlayerDrawerContext = () => useContext(AddPlayerDrawerContext);