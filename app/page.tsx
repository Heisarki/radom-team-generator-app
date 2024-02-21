"use client"
import CreatedTeamList from '@/components/home/CreatedTeamList';
import { Button } from '@/components/ui/button'
import { HomeContextType, useHomeContext } from '@/context/HomeContext';
import { GeneratedTeamListType } from '@/type';
import React from 'react'

export default function Page() {
  const {
    openConfirmDeleteDialog,
    generatedTeamList,
    handleCreatTeamClick,
    handleConfirmDeleteCreatedTeam,
    handleOpenConfirmDeleteDialog,
    handleCloseConfirmDeleteDialog,
  }: HomeContextType = useHomeContext();
  return (
    <div className='text-center flex flex-col gap-4'>
      {
        generatedTeamList.length > 0
          ? generatedTeamList.map((createdTeamELE: GeneratedTeamListType) => (
            <CreatedTeamList
              key={createdTeamELE.id}
              createdTeam={createdTeamELE}
              handleConfirmDeleteCreatedTeam={handleConfirmDeleteCreatedTeam}
              openConfirmDeleteDialog={openConfirmDeleteDialog}
              handleCloseConfirmDeleteDialog={handleCloseConfirmDeleteDialog}
              handleOpenConfirmDeleteDialog={handleOpenConfirmDeleteDialog}
            />
          ))
          : <>
            No Team created!
            <div className='flex items-center w-full justify-center'>
              <Button onClick={handleCreatTeamClick}>
                Create Team
              </Button>
            </div>
          </>
      }
    </div>
  )
}
