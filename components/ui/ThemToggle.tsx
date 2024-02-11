"use client"
import React, { useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemToggle() {
    const [dark, setDark] = useState(false)
    function handleToggleTheme() {
        setDark(!dark)
    }
    return (
        <div className='cursor-pointer' onClick={handleToggleTheme}>
            {
                dark ? <FiSun /> : <FiMoon />
            }
        </div>
    )
}
