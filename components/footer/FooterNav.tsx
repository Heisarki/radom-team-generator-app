"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAVLIST } from '@/constants'

export default function FooterNav() {
    const pathname = usePathname()
    return (
        <footer>
            <nav className='fixed bottom-0 left-0 flex justify-between items-center right-0 h-16 px-8 bg-background'>
                {
                    NAVLIST.map(ele => (
                        <Link
                            key={ele.id}
                            className={`${pathname === ele.route && 'bg-secondary'} flex flex-col justify-center items-center gap-1 px-3 pt-1 rounded-md cursor-pointer`}
                            href={ele.route}
                        >
                            <Image
                                className='h-6'
                                src={ele.icon}
                                alt={ele.title}
                            />
                            <p className='text-xs text-muted-foreground'>{ele.title}</p>
                        </Link>
                    ))
                }
            </nav >
        </footer>
    )
}
