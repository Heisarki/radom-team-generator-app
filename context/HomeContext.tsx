"use client";
import { v4 } from 'uuid'
import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
    ReactNode,
} from "react";
import { GeneratedTeamListType } from '@/type';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';

/**
 ********************** Context Type
 */
export type HomeContextType = {
    generatedTeamList: GeneratedTeamListType[],
    setGeneratedTeamList: Dispatch<SetStateAction<GeneratedTeamListType[]>>,
    handleCreatTeamClick: () => void,
    openConfirmDeleteDialog: boolean,
    setOpenConfirmDeleteDialog: Dispatch<SetStateAction<boolean>>,
    handleConfirmDeleteCreatedTeam: (id: string) => void,
    handleOpenConfirmDeleteDialog: () => void,
    handleCloseConfirmDeleteDialog: () => void,
}
/**
 ********************** Context
 */
const HomeContext = createContext({} as HomeContextType);

/**
 ******************* Context Provider
 */
export const HomeContextProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const router = useRouter();
    const [generatedTeamList, setGeneratedTeamList] = useLocalStorage("_rtg_generated_team_list", [] as GeneratedTeamListType[])
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)

    /**
     * on clicking the "Create Team" button
     */
    function handleCreatTeamClick() {
        router.push(ROUTE.CREATE_TEAM)
    }
    /**
     * Function to delete created Team
     */
    function handleOpenConfirmDeleteDialog() {
        setOpenConfirmDeleteDialog(true)
    }
    function handleCloseConfirmDeleteDialog() {
        setOpenConfirmDeleteDialog(false)
    }
    function handleConfirmDeleteCreatedTeam(id: string) {
        setGeneratedTeamList(generatedTeamList.filter((teamList: GeneratedTeamListType) => teamList.id !== id))
        setOpenConfirmDeleteDialog(false)
    }

    /**
     ****************Context Value
     */
    const value = {
        generatedTeamList, setGeneratedTeamList,
        openConfirmDeleteDialog, setOpenConfirmDeleteDialog,
        handleCreatTeamClick,
        handleOpenConfirmDeleteDialog,
        handleCloseConfirmDeleteDialog,
        handleConfirmDeleteCreatedTeam,
    }

    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    );
};

/**
 **************** Home Context hook
 */
export const useHomeContext = () => useContext(HomeContext);