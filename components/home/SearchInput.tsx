"use client"
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext'
import React from 'react'
import { Input } from '../ui/input'

export default function SearchInput() {
    const { onSeachInputChange, searchValue }: PlayerListContextType = usePlayerListContext()
    return (
        <input
            value={searchValue}
            onChange={onSeachInputChange}
            className="min-w-full px-5 py-3 rounded-xl border focus:border-none focus:outline-1 outline-slate-950 bg-input"
            placeholder="Search for a player"
            type="search"
        />
        // <Input
        //     placeholder='Search player'
        // />
    )
}
