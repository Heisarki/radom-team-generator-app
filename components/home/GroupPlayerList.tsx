"use client"
import { GroupPlayerListType, PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext';
import React from 'react'
import Chip from '../ui/Chip';
import { PlayerListDataType } from '@/constants';

export default function GroupPlayerList() {
    const { groupPlayerList, handleOnClickRemoveChip, selectedPlayerListChip }: PlayerListContextType = usePlayerListContext();
    if (groupPlayerList)
        return (
            <div className='flex flex-col overflow-auto border border-background-600 rounded-xl gap-3 py-2'>
                {
                    groupPlayerList?.map((groupPlayerEle: GroupPlayerListType) => (
                        <div className='flex items-center gap-2 px-2'>
                            <p>{groupPlayerEle.groupNumber}</p>
                            <div className="flex gap-4 overflow-auto rounded-xl items-center">
                                {
                                    groupPlayerEle.groupList.map((playerEle: PlayerListDataType) => {
                                        return (
                                            <>
                                                <Chip
                                                    selectedChip={selectedPlayerListChip}
                                                    onClick={handleOnClickRemoveChip}
                                                    key={playerEle.id}
                                                    text={playerEle.name}
                                                    label={playerEle.id}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
                {/* {
                    groupPlayerList && groupPlayerList?.length > 0
                        ? <div className="flex gap-4 overflow-auto pb-3">
                            {
                                groupPlayerList?.map(ele => (
                                    <Chip
                                        selectedChip={selectedPlayerListChip}
                                        onClick={handleOnClickRemoveChip}
                                        key={ele.id}
                                        text={ele.name}
                                        label={ele.id}
                                    />
                                ))
                            }
                        </div>
                        : <></>
                } */}
            </div>
        )
    return <></>
}

