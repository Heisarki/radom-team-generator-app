"use client"
import CreatedTeamList from '@/components/home/CreatedTeamList';
import { Button } from '@/components/ui/button'
import { HomeContextType, useHomeContext } from '@/context/HomeContext';
import { GeneratedTeamListType } from '@/type';
import React, { useEffect, useState } from 'react'
import { Accordion } from '@/components/ui/accordion';
import Loading from '@/components/ui/loading';
import { Skeleton } from '@/components/ui/skeleton';

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
  /**
   * Imitating api call
   */
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => { setIsLoading(false) }, 500)
  }, [])
  return (
    <div className='text-center flex flex-col gap-4' >
      <Accordion type="single" collapsible className='flex flex-col gap-4'>
        {
          isLoading && generatedTeamList.length === 0
            ? <div className="flex items-center gap-4 flex-col border rounded-xl px-4 py-5">
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-20 h-6 self-end" />
            </div>
            : generatedTeamList?.length > 0
              ? generatedTeamList?.map((createdTeamELE: GeneratedTeamListType) => (
                <CreatedTeamList
                  key={createdTeamELE.id}
                  createdTeam={createdTeamELE}
                  handleConfirmDeleteCreatedTeam={handleConfirmDeleteCreatedTeam}
                  openConfirmDeleteDialog={openConfirmDeleteDialog}
                  handleCloseConfirmDeleteDialog={handleCloseConfirmDeleteDialog}
                  handleOpenConfirmDeleteDialog={handleOpenConfirmDeleteDialog}
                />
              ))
              : <p>
                No team created!
              </p>
        }
      </Accordion>
      <div>
        <Button onClick={handleCreatTeamClick} className='w-fit'>
          Create Team
        </Button>
      </div>
    </div >
  )
}
