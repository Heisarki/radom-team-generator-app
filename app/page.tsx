"use client"
import { Button } from '@/components/ui/button'
import { ROUTE } from '@/constants';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const router = useRouter();
  return (
    <div className='text-center flex flex-col gap-4'>
      No Team created!
      <div className='flex items-center w-full justify-center'>
        <Button onClick={() => router.push(ROUTE.CREATE_TEAM)}>
          Create Team
        </Button>
      </div>
    </div>
  )
}
