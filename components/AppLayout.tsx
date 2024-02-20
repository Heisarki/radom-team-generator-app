import React, { ReactNode } from 'react'
import HeaderNav from './header/HeaderNav'
import FooterNav from './footer/FooterNav'

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className='relative flex min-h-screen justify-center w-full'>
            <HeaderNav />
            <section className='absolute w-full px-4 min-h-screen max-w-2xl py-20'>
                {children}
            </section>
            <FooterNav />
        </div>
    )
}
