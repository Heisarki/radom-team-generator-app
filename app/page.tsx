"use client"
import CreatedTeamList from '@/components/home/CreatedTeamList';
import { Button } from '@/components/ui/button'
import { HomeContextType, useHomeContext } from '@/context/HomeContext';
import { GeneratedTeamListType } from '@/type';
import React from 'react'
import { Accordion } from '@/components/ui/accordion';
import Loading from '@/components/ui/loading';

export default function Page() {
  const {
    openConfirmDeleteDialog,
    generatedTeamList,
    handleCreatTeamClick,
    handleConfirmDeleteCreatedTeam,
    handleOpenConfirmDeleteDialog,
    handleCloseConfirmDeleteDialog,
  }: HomeContextType = useHomeContext();
  console.log({ generatedTeamList })
  return (
    <div className='text-center flex flex-col gap-4' >
      <Loading loading={!generatedTeamList.length}>
        <Accordion type="single" collapsible className='flex flex-col gap-4'>
          {
            generatedTeamList?.length > 0
            && generatedTeamList?.map((createdTeamELE: GeneratedTeamListType) => (
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
          !generatedTeamList.length &&
          <>
            No Team created!
            <div className='flex items-center w-full justify-center'>
              <Button onClick={handleCreatTeamClick}>
                Create Team
              </Button>
            </div>
          </>
        }
      </Loading>
    </div >
  )
}
