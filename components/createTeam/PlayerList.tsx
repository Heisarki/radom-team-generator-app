'use client'
import React from 'react'
import Chip from '../ui/Chip'
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext'
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
            <div className='flex justify-center w-full'>
                <Button
                    className='w-full'
                    onClick={handleOnClickCreateTeam}
                >
                    Create Team
                </Button>
            </div>
        </div>
    )
}
