"use client"
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext'
import React from 'react'

export default function SearchInput() {
    const { onSeachInputChange, searchValue }: PlayerListContextType = usePlayerListContext()
    return (
        <input
            value={searchValue}
            onChange={onSeachInputChange}
            className="min-w-full px-5 py-3 rounded-xl border-none bg-background-chip-900 focus:border-none focus:outline-1 outline-slate-950 text-white"
            placeholder="Search for a player"
            type="search"
        />
    )
}
