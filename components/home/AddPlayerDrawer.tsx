"use client"
import React, { useState } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import { FaInfoCircle } from "react-icons/fa";
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

export default function AddPlayerDrawer() {
    const [openDrawer, setOpenDrawer] = useState(false)
    function handleOpenDrawer() {
        setOpenDrawer(true)
        console.log("GROUP OPEN")
    }
    function handleRemovePlayer() {

    }
    const arr = ["Ronaldo",
        "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
        "Ronaldo", "Messi", "Ramos", "Kaka",
    ]
    return (
        <>
            <div
                onClick={handleOpenDrawer}
                className="fixed bottom-[70px] text-slate-50 ml-1 text-3xl bg-primary rounded-full w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-primary/90">
                <p className="mb-1">+</p>
            </div>

            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} onRelease={() => console.log("GROUP CHANGE")}>
                <DrawerContent className='flex flex-col items-center  outline-none'>
                    <div className='flex flex-col gap-2 p-5 max-w-2xl'>
                        <DrawerHeader>
                            <DrawerDescription className='text-start flex flex-row gap-[1px]'>
                                <FaInfoCircle className='w-12 mt-1' />
                                <p className='pr-5'>
                                    {`Here you can add new players, once the players are added click on "Confirm" to save them.`}
                                </p>
                                <p onClick={() => setOpenDrawer(false)} className='rotate-45 text-3xl cursor-pointer absolute right-5 top-5'>+</p>
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className='flex gap-4 flex-col'>
                            <Label className='text-start text-sm'>Player name</Label>
                            <div className="flex w-full items-center space-x-2 ">
                                <Input type="text" placeholder="Loinel Messi" />
                                <Button type="submit">Add</Button>
                            </div>
                        </div>
                        <ScrollArea className="h-52 w-full rounded-md border p-2">
                            {
                                arr.map(ele => (
                                    <div key={ele} aria-label={ele} className='flex flex-row justify-between bg-secondary p-2 px-5 rounded-lg items-center mb-1'>
                                        <p className="text-sm">{ele}</p>
                                        <p className='rotate-45 cursor-pointer text-lg' onClick={handleRemovePlayer}>+</p>
                                    </div>
                                ))
                            }
                        </ScrollArea>
                        <Button type="submit">Confirm</Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

