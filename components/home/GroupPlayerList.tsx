"use client"
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext';
import React from 'react'
import Chip from '../ui/Chip';

export default function GroupPlayerList() {
    const { groupPlayerList, handleOnClickChip, selectedPlayerChip }: PlayerListContextType = usePlayerListContext();
    return (
        <>
            {
                groupPlayerList && groupPlayerList?.length > 0
                    ? <div className="flex gap-4 overflow-auto pb-3">
                        {
                            groupPlayerList?.map(ele => (
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
                    : <></>
            }
        </>
    )
}
