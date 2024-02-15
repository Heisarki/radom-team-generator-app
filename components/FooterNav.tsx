import { homeIcon, profileIcon, teamIcon } from '@/constants/icon'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function FooterNav() {
    const navList = [
        {
            id: 1,
            text: "Home",
            icon: homeIcon,
            link: "/",
        },
        {
            id: 2,
            text: "Teams",
            icon: teamIcon,
            link: "/teams",
        },
        {
            id: 3,
            text: "Profile",
            icon: profileIcon,
            link: "/profile",
        }
    ]
    return (
        <nav className='fixed bottom-0 left-0 flex justify-between items-center right-0 h-16 px-8 text-foreground-900 bg-muted'>
            {
                navList.map(ele => (
                    <Link
                        key={ele.id}
                        className='flex flex-col justify-center items-center gap-1 px-3 py-1 rounded-md cursor-pointer'
                        href={ele.link}
                    >
                        <Image
                            className='h-6'
                            src={ele.icon}
                            alt={ele.text}
                        />
                        <p className='text-xs text-muted-foreground'>{ele.text}</p>
                    </Link>
                ))
            }
        </nav>
    )
}
