"use client"
import React from 'react'
import { CreatedTeamType, GeneratedTeamListType, PlayerListDataType } from '@/type'
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"
import SaveTeamIcon from '@/assets/svg/SaveTeamIcon'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '../ui/button'

export default function CreatedTeamList({
    openConfirmDeleteDialog,
    createdTeam,
    handleConfirmDeleteCreatedTeam,
    handleOpenConfirmDeleteDialog,
    handleCloseConfirmDeleteDialog,
    key,
}: {
    openConfirmDeleteDialog: boolean,
    createdTeam: GeneratedTeamListType,
    handleConfirmDeleteCreatedTeam: (id: string) => void,
    handleOpenConfirmDeleteDialog: () => void,
    handleCloseConfirmDeleteDialog: () => void,
    key: string,
}) {
    return (
        <div className='flex flex-col border rounded-xl' key={key}>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className='pr-2'>
                        <h1 className='text-md text-start pt-2 pl-4'>Created on {createdTeam.date}</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='grid grid-cols-2 gap-x-4 gap-y-4 p-2'>
                            {
                                createdTeam?.createdTeam?.map((createdTeamELe: CreatedTeamType) => (
                                    // Teams created
                                    <div key={createdTeamELe.teamName} className='pb-2 overflow-hidden  border rounded-xl' >
                                        <div className='border w-full h-28 px-5 justify-center flex flex-col gap-1 rounded-xl bg-secondary items-start'>
                                            <SaveTeamIcon className={"fill-current"} />
                                            <h1 className='text-lg'>
                                                {/* Team */}
                                                {createdTeamELe.teamName}</h1>
                                            <p className='text-sm'>{createdTeamELe.teamList.length} Players</p>
                                        </div>
                                        <div className='overflow-hidden'>
                                            <div className='flex flex-col gap-2 pt-2 pl-5 items-start'
                                                style={{ transition: "all 1s ease-in", transform: "translateY(0%)" }}
                                            >
                                                {
                                                    createdTeamELe.teamList.map((playerEle: PlayerListDataType) => (
                                                        <>
                                                            <p key={playerEle.id}>{playerEle.name}</p>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button
                className='w-fit self-end'
                onClick={handleOpenConfirmDeleteDialog}
                variant={"ghost"}>
                Delete
            </Button>
            <Dialog open={openConfirmDeleteDialog} onOpenChange={handleCloseConfirmDeleteDialog}>
                <DialogContent className='w-[95vw] rounded-xl flex flex-col items-start'>
                    <DialogHeader>
                        <h1 className='text-xl'>
                            Are you absolutely sure?
                        </h1>
                    </DialogHeader>
                    <h1 className='text-sm w-full'>This action cannot be undone. This will permanently delete the created team.</h1>
                    <div className='flex gap-2 justify-end w-full'>
                        <Button
                            variant={"outline"}
                            onClick={handleCloseConfirmDeleteDialog}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleConfirmDeleteCreatedTeam(createdTeam.id)}>
                            Delete
                        </Button>
                    </div>
                </DialogContent >
            </Dialog >
        </div>
    )
}
