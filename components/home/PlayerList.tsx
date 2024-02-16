'use client'
import React, { useEffect, useState } from 'react'
import Chip from '../ui/Chip'
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext'
import { CreatedTeamType, PlayerListDataType } from '@/type'
import { Button } from '../ui/button'

export default function PlayerList() {
    const { selectedPlayerListChip, handleOnClickAddChip, filteredPlayerList, createdTeam, handleOnClickCreateTeam }: PlayerListContextType = usePlayerListContext();

    return (
        <div className="flex flex-wrap gap-4">
            {
                filteredPlayerList?.map(ele => (
                    <Chip
                        selectedChip={selectedPlayerListChip}
                        onClick={handleOnClickAddChip}
                        key={ele.id}
                        text={ele.name}
                        label={ele.id}
                    />
                ))
            }
            {/* {
                filteredPlayerList?.length === 0 && */}
            <div className='flex justify-center w-full'>
                <Button className='w-full text-slate-50'
                    onClick={handleOnClickCreateTeam}
                >
                    Create Team
                </Button>
            </div>
            <div className='flex justify-between w-full'>
                {
                    createdTeam?.map((createTeamEle: CreatedTeamType, index: number) => (
                        <div className='flex flex-col' key={index}>
                            <h1 className='text-2xl'>{createTeamEle.teamName}</h1>
                            {
                                createTeamEle.teamList.map((teamListEle: PlayerListDataType) => (
                                    <p key={teamListEle.id}>{teamListEle.name}</p>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            {/* } */}
        </div>
    )
}
