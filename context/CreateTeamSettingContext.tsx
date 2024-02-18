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

/*-------------------------Type----------------------------*/
export type CreateTeamSettingsContextType = {
    teamNames: string[],
    setTeamNames: Dispatch<SetStateAction<string[]>>,
    selectedNumberOfTeam: string,
    setSelectedNumberOfTeam: Dispatch<SetStateAction<string>>,
    handleAutoGenerateTeam: () => void,
    handleContinueAddTeam: () => void,
    handleEditTeamName: (e: any) => void,
    handleDeleteTeamName: (e: any) => void,
    handleOnChangeNumberOfTeam: (value: string) => void,
    openCreatedTeamSettingsDialog: boolean, setOpenCreatedTeamSettingsDialog: Dispatch<SetStateAction<boolean>>,
}
/*-------------------------Context----------------------------*/
const CreateTeamSettingsContext = createContext({} as CreateTeamSettingsContextType);

/*-------------------------Context Provider--------------------------*/
export const CreateTeamSettingsContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const [teamNames, setTeamNames] = useState<string[]>([])
    const [selectedNumberOfTeam, setSelectedNumberOfTeam] = useState("4")
    const [openCreatedTeamSettingsDialog, setOpenCreatedTeamSettingsDialog] = useState(false)

    /*-------------Function to handle On Adding Auto Generate Team-----------*/
    function handleAutoGenerateTeam() {
        let autoTeam = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        setTeamNames([...autoTeam.splice(0, Number(selectedNumberOfTeam))])
    }
    useEffect(() => {
        handleAutoGenerateTeam();
    }, [selectedNumberOfTeam])
    /*--------------Function to handle on Continue Click----------------*/
    function handleContinueAddTeam() {
    }
    /*--------------Function to handle Edit Team Name-----------------*/
    function handleEditTeamName(e: any) {

    }
    /*--------------Function to handle Delete Team Name-----------------*/
    function handleDeleteTeamName(e: any) {

    }
    /*--------------Select Number of Team on Change function-----------------*/
    function handleOnChangeNumberOfTeam(value: any) {
        setSelectedNumberOfTeam(value)
        console.log("GROUP", value)
    }

    /*------------------Context value-------------------*/
    const value = {
        teamNames, setTeamNames,
        selectedNumberOfTeam, setSelectedNumberOfTeam,
        handleAutoGenerateTeam,
        handleContinueAddTeam,
        handleEditTeamName,
        handleDeleteTeamName,
        handleOnChangeNumberOfTeam,
        openCreatedTeamSettingsDialog, setOpenCreatedTeamSettingsDialog,
    }

    return (
        <CreateTeamSettingsContext.Provider value={value}>
            {children}
        </CreateTeamSettingsContext.Provider>
    );
};

/*------------------------Context Hook-----------------------------*/
export const useCreateTeamSettingsContext = () => useContext(CreateTeamSettingsContext);