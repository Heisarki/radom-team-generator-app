'use client'
import { playerListData } from '@/utils/constants'
import React, { useEffect, useState } from 'react'
import Chip from '../ui/Chip'
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext'

export default function PlayerList() {
    const { selectedPlayerChip, handleOnClickChip, filteredPlayerList }: PlayerListContextType = usePlayerListContext();

    return (
        <div className="flex flex-wrap gap-4">
            {
                filteredPlayerList?.map(ele => (
                    <Chip
                        selectedChip={selectedPlayerChip}
                        onClick={handleOnClickChip}
                        key={ele.id}
                        text={ele.name}
                        label={ele.id}
                    />
                ))
            }
        </div>
    )
}
