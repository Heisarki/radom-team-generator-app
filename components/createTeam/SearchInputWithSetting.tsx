"use client"
import { PlayerListContextType, usePlayerListContext } from '@/context/PlayerListContext'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { GoGear } from "react-icons/go";
import { CreateTeamSettingsContextType, useCreateTeamSettingsContext } from '@/context/CreateTeamSettingContext';

export default function SearchInputWithSetting() {
    const {
        searchValue,
        onSeachInputChange,
    }: PlayerListContextType = usePlayerListContext();
    const {
        setOpenCreatedTeamSettingsDialog
    }: CreateTeamSettingsContextType = useCreateTeamSettingsContext();
    /**
     * Typing animation for placeholder
     */
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const text = "Search player here  "
    useEffect(() => {
        if (searchValue) {
            setCurrentText("")
            setCurrentIndex(0)
            return;
        }
        let delay = 70
        if (currentIndex === text.length - 1)
            delay = 2000
        const timeout = setTimeout(() => {
            setCurrentText(prevText => prevText + text[currentIndex]);
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, delay);
        if (currentIndex === text.length) {
            setCurrentIndex(0)
            setCurrentText("")
        }
        return () => clearTimeout(timeout);
    }, [currentIndex, searchValue]);
    return (
        <div className="sticky top-16 pb-3 bg-background pt-2 flex flex-row gap-2 items-center w-full">
            <Input
                type='search'
                className='px-5 py-6'
                value={searchValue}
                onChange={onSeachInputChange}
                placeholder={currentText}
            />
            <div className="border p-3 rounded-lg cursor-pointer" onClick={() => setOpenCreatedTeamSettingsDialog(true)}>
                <div className='animate-rotate-gear'>
                    <GoGear size="24px" />
                </div>
            </div>
        </div>
    )
}
