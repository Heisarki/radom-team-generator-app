import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { CreatedTeamType, PlayerListDataType } from '@/type'
import SaveTeamIcon from '@/assets/svg/SaveTeamIcon'
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext'

export default function CreatedTeamList() {
    const { createdTeam }: PlayerListContextType = usePlayerListContext();
    return (
        <div className=' flex flex-col border rounded-xl'>
            <h1 className='text-md text-start pt-2 pl-4'>Created on 24/02/2024</h1>
            <div className='grid grid-cols-2 gap-x-4 gap-y-4 p-2'>
                {
                    createdTeam?.map((createdTeamELe: CreatedTeamType) => (
                        // Teams created
                        <div key={createdTeamELe.teamName} className='grid grid-rows-1 border rounded-xl pb-2' >
                            <div className='border w-full h-28 pl-5 justify-center flex flex-col gap-1 rounded-xl bg-secondary items-start'>
                                <SaveTeamIcon className={"fill-current"} />
                                <h1 className='text-lg'>Team {createdTeamELe.teamName}</h1>
                                <p className='text-sm'>{createdTeamELe.teamList.length} Players</p>
                            </div>
                            <div className='flex flex-col gap-2 pt-2 pl-5 items-start'>
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
        </div >
    )
}
