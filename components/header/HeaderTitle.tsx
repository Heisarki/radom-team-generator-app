"use client"
import { NAVLIST } from '@/constants'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function HeaderTitle() {
    const pathname = usePathname()
    return (
        <div>
            <p className='font-semibold text-lg'>
                {
                    NAVLIST?.find((navListEle: any) => (navListEle.route === pathname))?.title || ""
                }
            </p>
        </div>
    )
}
