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
import { useToast } from '@/components/ui/use-toast';

/*-------------------------Type----------------------------*/
export type CreateTeamSettingsContextType = {
    teamNamesArrObject: TeamNamesArrObjectType[],
    teamNames: string[],
    setTeamNames: Dispatch<SetStateAction<string[]>>,
    selectedNumberOfTeam: string,
    setSelectedNumberOfTeam: Dispatch<SetStateAction<string>>,
    handleContinueAddTeam: () => void,
    handleEditTeamName: (e: any, teamNameObjEle: TeamNamesArrObjectType) => void,
    handleOnChangeNumberOfTeam: (value: string) => void,
    openCreatedTeamSettingsDialog: boolean, setOpenCreatedTeamSettingsDialog: Dispatch<SetStateAction<boolean>>,
    // handleSaveEditedTeamName: () => void,
    handleOnChangeEditedTeamname: (e: any, teamNameObjEle: TeamNamesArrObjectType) => void,
    editedTeamName: string,
    setEditedTeamName: Dispatch<SetStateAction<string>>,
}
export type TeamNamesArrObjectType = {
    teamName: string,
    id: string,
    editFlag: boolean,
}
/*-------------------------Context----------------------------*/
const CreateTeamSettingsContext = createContext({} as CreateTeamSettingsContextType);

/*-------------------------Context Provider--------------------------*/
export const CreateTeamSettingsContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const { toast } = useToast();
    const [teamNames, setTeamNames] = useState<string[]>([])
    const [selectedNumberOfTeam, setSelectedNumberOfTeam] = useState("")
    const [openCreatedTeamSettingsDialog, setOpenCreatedTeamSettingsDialog] = useState(false)
    const [teamNamesArrObject, setTeamNamesArrObject] = useState<TeamNamesArrObjectType[]>([])
    const [editedTeamName, setEditedTeamName] = useState("")

    /*-------------Function to Auto Generate Team-----------*/
    function autoGenerateTeam() {
        let autoTeam = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        // setTa([...autoTeam.splice(0, Number(selectedNumberOfTeam))])
        const autoTeamArrObject = autoTeam.map((ele: string) => ({ teamName: ele, id: v4(), editFlag: false }))
        setTeamNamesArrObject(autoTeamArrObject.splice(0, Number(selectedNumberOfTeam)))
    }
    useEffect(() => {
        autoGenerateTeam();
    }, [selectedNumberOfTeam])

    /*--------------Function to handle on Continue Click----------------*/
    function handleContinueAddTeam() {
        setTeamNames(teamNamesArrObject.map((ele: TeamNamesArrObjectType) => (String(ele.teamName))))
    }
    /*--------------Function to handle Edit Team Name-----------------*/
    function handleEditTeamName(e: any, teamNameObjEle: TeamNamesArrObjectType) {
        setTeamNamesArrObject(teamNamesArrObject.map((teamNameObjMapEle: TeamNamesArrObjectType) => (
            teamNameObjMapEle.id === teamNameObjEle.id ? { ...teamNameObjMapEle, editFlag: true } : teamNameObjMapEle
        )))
    }
    /*----------------Funtion to handle Onchange of Edited Name Input------------ */
    function handleOnChangeEditedTeamname(e: any, teamNameObjEle: TeamNamesArrObjectType) {
        setTeamNamesArrObject(teamNamesArrObject.map((teamNameObjMapEle: TeamNamesArrObjectType) => (
            teamNameObjMapEle.id === teamNameObjEle.id ? { ...teamNameObjMapEle, teamName: e.target.value } : teamNameObjMapEle
        )))
    }

    /*--------------Select Number of Team on Change function-----------------*/
    function handleOnChangeNumberOfTeam(value: any) {
        setSelectedNumberOfTeam(value)
        console.log("GROUP", value)
        // toast({
        //     variant: "default",
        //     title: "Team created",
        //     description: <>
        //         You have successufully created {selectedNumberOfTeam} teams. Click on {` "Edit" `} icon to change the auto generated Team name.
        //         <div className='my-2'>
        //             {
        //                 teamNamesArrObject.map(ele => (
        //                     <p className='text-xs' key={ele.id}>Team {ele.teamName}</p>
        //                 ))
        //             }
        //         </div>
        //         Or click on {` "Continue" `} to confirm the Team names
        //     </>,
        // })
    }

    /*------------------Context value-------------------*/
    const value = {
        teamNamesArrObject,
        teamNames, setTeamNames,
        selectedNumberOfTeam, setSelectedNumberOfTeam,
        handleContinueAddTeam,
        handleEditTeamName,
        handleOnChangeNumberOfTeam,
        openCreatedTeamSettingsDialog, setOpenCreatedTeamSettingsDialog,
        // handleSaveEditedTeamName,
        handleOnChangeEditedTeamname,
        editedTeamName, setEditedTeamName,
    }

    return (
        <CreateTeamSettingsContext.Provider value={value}>
            {children}
        </CreateTeamSettingsContext.Provider>
    );
};

/*------------------------Context Hook-----------------------------*/
export const useCreateTeamSettingsContext = () => useContext(CreateTeamSettingsContext);