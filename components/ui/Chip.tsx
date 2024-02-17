import React from 'react'

export default function Chip({
    text,
    key,
    label,
    onClick,
    selectedChip,
}: {
    text: string,
    key: string,
    label: string,
    onClick?: (e: any) => void,
    selectedChip?: string[]
}) {
    return (
        <div
            aria-label={label}
            key={key}
            onClick={onClick}
            className={`${selectedChip?.includes(label) && ``} border py-2 px-4 rounded-xl flex-shrink-0 bg-secondary cursor-pointer`}
        >
            <p aria-label={label}>{text}</p>
        </div>
    )
}
