"use client"
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext'
import React from 'react'
import { Input } from '../ui/input'
import { GoGear } from "react-icons/go";
import { CreateTeamSettingsContextType, useCreateTeamSettingsContext } from '@/context/CreateTeamSettingContext';

export default function SearchInputWithSetting() {
    const { onSeachInputChange, searchValue }: PlayerListContextType = usePlayerListContext();
    const { setOpenCreatedTeamSettingsDialog }: CreateTeamSettingsContextType = useCreateTeamSettingsContext();
    return (
        <div className="sticky top-16 pb-3 bg-background pt-2 flex flex-row gap-2 items-center w-full">
            <Input
                type='search'
                className='px-5 py-6'
                value={searchValue}
                onChange={onSeachInputChange}
                placeholder='Search player'
            />
            <div className="border p-3 rounded-lg cursor-pointer" onClick={() => setOpenCreatedTeamSettingsDialog(true)}>
                <GoGear size="24px" />
            </div>
        </div>


    )
}
