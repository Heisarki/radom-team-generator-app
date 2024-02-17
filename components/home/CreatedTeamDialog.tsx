"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext';
import { playerListData, saveTeamIcon } from '@/constants';
import Image from 'next/image';
import { CreatedTeamType, PlayerListDataType } from '@/type';
import SaveTeamIcon from '@/assets/svg/SaveTeamIcon';

export default function CreatedTeamDialog() {
  const { openCreatedTeamDialog, setOpenCreatedTeamDialog, createdTeam }: PlayerListContextType = usePlayerListContext();
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
                  <div className='border w-full h-28 pl-5 justify-center flex flex-col gap-1 rounded-xl bg-secondary'>
                    <SaveTeamIcon className={"fill-current"} />
                    <h1 className='text-lg'>Team {createdTeamELe.teamName}</h1>
                    <p className='text-sm'>{createdTeamELe.teamList.length} Players</p>
                  </div>
                  <div className='flex flex-col gap-2 pt-2 pl-5'>
                    {
                      createdTeamELe.teamList.map((playerEle: PlayerListDataType) => (
                        <p key={playerEle.id}>{playerEle.name}</p>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </ScrollArea>
        <Button className='mx-4' type="submit">Save Team</Button>
      </DialogContent >
    </Dialog >
  )
}
