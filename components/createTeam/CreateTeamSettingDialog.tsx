"use client"
import React, { useEffect, useState } from 'react'
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
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { LiaEditSolid } from "react-icons/lia";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { NUMBER_IN_WORDS } from '@/constants';
import { CreateTeamSettingsContextType, useCreateTeamSettingsContext } from '@/context/CreateTeamSettingContext';

export default function CreateTeamSettingDialog() {
    const {
        selectedNumberOfTeam, setSelectedNumberOfTeam,
        teamNames, setTeamNames,
        handleAutoGenerateTeam,
        handleContinueAddTeam,
        handleDeleteTeamName,
        handleEditTeamName,
        handleOnChangeNumberOfTeam,
        openCreatedTeamSettingsDialog, setOpenCreatedTeamSettingsDialog,
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
        setOpenCreatedTeamSettingsDialog(false)
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
                        <h1 className='text-sm'>Select Number of Team</h1>
                        <Select onValueChange={(value: any) => handleOnChangeNumberOfTeam(value)} value={selectedNumberOfTeam}>
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder="Four" defaultValue={"Four"} />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    NUMBER_OF_TEAM_ARR.map((noOfTeamArrEle: any) => (
                                        <SelectItem
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
                    {/* <div className='flex flex-col gap-2'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-sm'>Enter Team name</h1>
                            <Button
                                className='rounded-full text-xs'
                                variant={"outline"}
                                onClick={handleAutoGenerateTeam}
                            >
                                Auto
                            </Button>
                        </div>
                        <Input
                            placeholder='FC Barcelona'
                        />
                    </div> */}
                    <ScrollArea className="h-52 w-full rounded-md border p-2">
                        {
                            teamNames.map((teamNameEle: string, index: number) => (
                                <div key={teamNameEle + index} className='flex flex-row justify-between bg-secondary p-2 px-5 rounded-lg items-center mb-1'>
                                    <p className="text-sm">
                                        {
                                            teamNameEle.length > 20
                                                ? teamNameEle.substring(0, 22)
                                                : teamNameEle
                                        }
                                    </p>
                                    <div className='flex flex-row'>
                                        <div className='cursor-pointer pl-2'>
                                            <CiEdit />
                                        </div>
                                        {/* <div className='cursor-pointer px-1'>
                                            <MdDeleteForever />
                                        </div> */}
                                    </div>
                                </div>
                            ))
                        }
                    </ScrollArea>
                </div>
                <Button
                    onClick={() => {
                        // if (!checkIfAllSettingAreValid()) {
                        //     toast({
                        //         variant: "default",
                        //         title: "Setting not valid!",
                        //         description: ``,
                        //     })
                        //     return;
                        // }
                        toast({
                            variant: "default",
                            title: "Team created",
                            description: <>
                                You have successufully created {selectedNumberOfTeam} teams
                                <div className='my-2'>
                                    {
                                        teamNames.map(ele => (
                                            <p className='text-xs' key={ele}>Team {ele}</p>
                                        ))
                                    }
                                </div>
                                Click on a player name to start grouping players in a group of {selectedNumberOfTeam}  and click {" Create Team"}.
                            </>,
                        })
                        setOpenCreatedTeamSettingsDialog(false)
                    }}
                    type="submit"
                >
                    Continue
                </Button>
            </DialogContent >
        </Dialog >
    )
}
