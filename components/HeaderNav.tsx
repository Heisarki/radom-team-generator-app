import React from 'react'
import { profileIcon } from '@/utils/constants/icon'
import Image from 'next/image'
import ThemToggle from './ui/ThemToggle'

export default function HeaderNav() {
    return (
        <header
            className='fixed top-0 left-0 flex justify-center items-center right-0 h-16 px-8 text-foreground-900 bg-background-900 border-b border-background-700'>
            <div className='absolute left-4 w-10 h-10 rounded-full overflow-hidden'>
                <Image
                    className='w-10 h-10 object-cover'
                    src={profileIcon}
                    alt="profile"
                />
            </div>
            <div>
                <p className='font-semibold text-lg'>Pick players</p>
            </div>
            <div className='absolute right-5 top-5'>
                <ThemToggle />
            </div>
        </header>
    )
}