import React from 'react'

export default function Button({
    btnText = "Click me",
    onClick = () => { },
}: {
    btnText?: string,
    onClick?: () => void,
}) {
    return (
        <button
            onClick={onClick}
            className='py-2 px-4 rounded-xl w-full bg-background-button-900 focus:opacity-90'>
            {btnText}
        </button>
    )
}
