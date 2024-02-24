"use client"
import { HomeContextType, useHomeContext } from '@/context/HomeContext';
import React from 'react'
import { Accordion } from '@/components/ui/accordion';
import CreatedTeamList from './CreatedTeamList';
import { Button } from '../ui/button';
import { GeneratedTeamListType } from '@/type';

export default function HomePage() {
    const {
        openConfirmDeleteDialog,
        generatedTeamList,
        handleCreatTeamClick,
        handleConfirmDeleteCreatedTeam,
        handleOpenConfirmDeleteDialog,
        handleCloseConfirmDeleteDialog,
    }: HomeContextType = useHomeContext();
    return (
        <>
            <Accordion type="single" collapsible className='flex flex-col gap-4'>
                {
                    generatedTeamList && generatedTeamList.length > 0
                    && generatedTeamList.map((createdTeamELE: GeneratedTeamListType) => (
                        <CreatedTeamList
                            key={createdTeamELE.id}
                            createdTeam={createdTeamELE}
                            handleConfirmDeleteCreatedTeam={handleConfirmDeleteCreatedTeam}
                            openConfirmDeleteDialog={openConfirmDeleteDialog}
                            handleCloseConfirmDeleteDialog={handleCloseConfirmDeleteDialog}
                            handleOpenConfirmDeleteDialog={handleOpenConfirmDeleteDialog}
                        />
                    ))
                }
            </Accordion>
            {
                generatedTeamList.length === 0 &&
                <div className='text-center flex flex-col gap-4'>
                    No Team created!
                    <div className='flex items-center w-full justify-center'>
                        <Button onClick={handleCreatTeamClick}>
                            Create Team
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}
