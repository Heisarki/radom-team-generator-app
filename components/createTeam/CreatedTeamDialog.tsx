"use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext';
import { CreatedTeamType, PlayerListDataType } from '@/type';
import SaveTeamIcon from '@/assets/svg/SaveTeamIcon';
import { twMerge } from 'tailwind-merge';

export default function CreatedTeamDialog() {
  const {
    openCreatedTeamDialog, setOpenCreatedTeamDialog,
    createdTeam,
    handleSaveTeam
  }: PlayerListContextType = usePlayerListContext();

  const [loadingPlayers, setLoadingPlayers] = useState(true)
  const [loadingTeamName, setLoadingTeamName] = useState(true)

  useEffect(() => {
    // Simulating loadingPlayers delay for demonstration
    setTimeout(() => {
      setLoadingPlayers(false)
    }, 300);
    setTimeout(() => {
      setLoadingTeamName(false)
    }, 1);
    return () => {
      setLoadingPlayers(true)
      setLoadingTeamName(true)
    }
  }, [openCreatedTeamDialog]);

  return (
    <Dialog open={openCreatedTeamDialog} onOpenChange={() => setOpenCreatedTeamDialog(false)}>
      <DialogContent className='w-[95vw] p-0 m-0 py-4 rounded-xl'>
        <DialogHeader>
          <h1 className='text-2xl text-center'>Teams</h1>
        </DialogHeader>
        <ScrollArea className="h-[60vh] rounded-md">
          <div className='grid grid-cols-2 gap-x-4 gap-y-4 mx-4 pb-2'>
            {
              createdTeam?.map((createdTeamELe: CreatedTeamType) => (
                // Teams created
                <div key={createdTeamELe.teamName} className='grid grid-rows-1 border rounded-xl pb-2' >
                  <div className={twMerge(
                    'w-full h-28 pl-5 justify-center flex flex-col gap-1 rounded-xl bg-secondary transition-transform duration-700 ease-[cubic-bezier(0.42, 0, 0, 1.05)]',
                    loadingTeamName ? "scale-0" : "scale-100"
                  )}
                  >
                    <SaveTeamIcon className={"fill-current"} />
                    <h1 className='text-lg'>Team {createdTeamELe.teamName}</h1>
                    <p className='text-sm'>{createdTeamELe.teamList.length} Players</p>
                  </div>
                  <div className='flex flex-col gap-2 pt-2 pl-5 overflow-hidden'>
                    {
                      createdTeamELe.teamList.map((playerEle: PlayerListDataType, index: number) => (
                        <p
                          key={playerEle.id}
                          className={twMerge(
                            `transition-transform duration-1000 ease-[cubic-bezier(0.42, 0, 0, 1.05)]`,
                            loadingPlayers ? 'translate-x-80' : 'translate-x-0',
                          )}
                          style={{
                            transitionDelay: `${index * 0.5 + 0.1}s`,
                          }}
                        >
                          {playerEle.name}
                        </p>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </ScrollArea>
        <Button className='mx-4' type="submit" onClick={handleSaveTeam}>Save Team</Button>
      </DialogContent >
    </Dialog >
  )
}
