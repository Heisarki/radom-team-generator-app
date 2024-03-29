import React, { ReactNode } from 'react'

export default function Loading({
    loading,
    children
}: {
    loading: boolean,
    children: ReactNode
}) {
    if (loading)
        return (
            <div className='flex items-center justify-center min-h-[60vh]'>
                Loading...
            </div>)
    return (
        <div>
            {children}
        </div>
    )
}
