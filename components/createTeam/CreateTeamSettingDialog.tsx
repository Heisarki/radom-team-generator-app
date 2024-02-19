"use client"
import { useEffect } from 'react'
import { GoGear } from "react-icons/go";
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from '../ui/use-toast';
import { ScrollArea } from '../ui/scroll-area';
import { CiEdit } from "react-icons/ci";
import { NUMBER_IN_WORDS } from '@/constants';
import { CreateTeamSettingsContextType, TeamNamesArrObjectType, useCreateTeamSettingsContext } from '@/context/CreateTeamSettingContext';
import { Input } from '../ui/input';

export default function CreateTeamSettingDialog() {
    const {
        teamNamesArrObject,
        selectedNumberOfTeam, setSelectedNumberOfTeam,
        handleContinueAddTeam,
        handleEditTeamName,
        handleOnChangeNumberOfTeam,
        openCreatedTeamSettingsDialog, setOpenCreatedTeamSettingsDialog,
        // handleSaveEditedTeamName,
        handleOnChangeEditedTeamname,
        editedTeamName, setEditedTeamName,
    }: CreateTeamSettingsContextType = useCreateTeamSettingsContext();
    const { toast } = useToast();
    useEffect(() => {
        setOpenCreatedTeamSettingsDialog(true)
    }, [])
    const NUMBER_OF_TEAM_ARR = []
    for (let i = 0; i < 10; i++) {
        NUMBER_OF_TEAM_ARR.push({
            id: i,
            number: i + 2,
            numberInWords: NUMBER_IN_WORDS[i]
        })
    }
    function handleCloseDialog() {
        if (!selectedNumberOfTeam) {
            toast({
                variant: "default",
                title: "Number of team is not selected",
                description: `Select the number of team that you would like to create.`,
            })
            return;
        }
        toast({
            variant: "default",
            title: "Click on Continue"
        })
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
    return (
        <Dialog open={openCreatedTeamSettingsDialog} onOpenChange={handleCloseDialog}>
            <DialogContent className='w-[95vw] rounded-xl'>
                <DialogHeader className='flex flex-row items-center gap-2'>
                    <GoGear size={"18px"} className='mt-1.5' />
                    <h1 className='text-lg text-center'>Settings</h1>
                </DialogHeader>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-2'>
                        {/* <h1 className='text-sm'>Select Number of Team</h1> */}
                        <Select onValueChange={(value: any) =>
                            handleOnChangeNumberOfTeam(value)}
                            value={selectedNumberOfTeam}
                        >
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder="Select number of team" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    NUMBER_OF_TEAM_ARR.map((noOfTeamArrEle: any) => (
                                        <SelectItem
                                            defaultValue={"four"}
                                            key={noOfTeamArrEle.id}
                                            className='capitalize'
                                            value={noOfTeamArrEle.number}
                                        >
                                            {noOfTeamArrEle.numberInWords}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <ScrollArea className={`${teamNamesArrObject.length > 4 ? "pr-2" : "pr-0"} h-52 w-full rounded-md border pb-1`}>
                        {
                            teamNamesArrObject.map((teamNameEle: TeamNamesArrObjectType) => {
                                if (teamNameEle.editFlag)
                                    return (
                                        <div className='flex flex-row gap-2 px-1 pt-1'>
                                            <Input
                                                value={teamNameEle.teamName}
                                                onChange={(e: any) => handleOnChangeEditedTeamname(e, teamNameEle)}
                                            />
                                            {/* <Button
                                                onClick={handleSaveEditedTeamName}
                                                variant={"outline"}
                                                className='text-xs'
                                            >
                                                Save
                                            </Button> */}
                                        </div>
                                    )
                                else
                                    return (
                                        <div key={teamNameEle.id} className='flex flex-row justify-between bg-secondary mx-1 mt-1 p-2 px-5 rounded-lg items-center mb-1'>
                                            <p className="text-sm">
                                                {
                                                    teamNameEle.teamName.length > 20
                                                        ? teamNameEle.teamName.substring(0, 22)
                                                        : teamNameEle.teamName
                                                }
                                            </p>
                                            <div
                                                className='cursor-pointer pl-2 '
                                                aria-label={teamNameEle.id}
                                                onClick={(e: any) => handleEditTeamName(e, teamNameEle)}>
                                                <CiEdit />
                                            </div>
                                        </div>
                                    )
                            })
                        }
                    </ScrollArea>
                </div>
                {
                    teamNamesArrObject.length > 0 && (
                        <Button
                            onClick={() => {
                                toast({
                                    variant: "default",
                                    title: "Team created",
                                    description: `Start groupping players in a group of ${selectedNumberOfTeam} by clicking on the player name`,
                                })
                                handleContinueAddTeam();
                                setOpenCreatedTeamSettingsDialog(false);
                            }}
                            type="submit"
                        >
                            Continue
                        </Button>
                    )
                }
            </DialogContent >
        </Dialog >
    )
}
