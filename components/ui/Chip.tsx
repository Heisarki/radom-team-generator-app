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
            className={`${selectedChip?.includes(label) && `bg-background-chip-hover-900`} border py-2 px-4 rounded-xl text-muted-foreground cursor-pointer hover:bg-background-chip-hover-900 flex-shrink-0`}
        >
            <p aria-label={label}>{text}</p>
        </div>
    )
}
