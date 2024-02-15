'use client'
import { playerListData } from '@/constants'
import React, { useEffect, useState } from 'react'
import Chip from '../ui/Chip'
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext'
import Button from '../ui/Button'

export default function PlayerList() {
    const { selectedPlayerListChip, handleOnClickAddChip, filteredPlayerList }: PlayerListContextType = usePlayerListContext();

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
                <Button
                    btnText="Create team"
                    onClick={() => { }}
                />
            </div>
            {/* } */}
        </div>
    )
}
