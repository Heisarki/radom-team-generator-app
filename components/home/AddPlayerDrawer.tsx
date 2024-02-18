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
import { AddPlayerDrawerContextProvider, AddPlayerDrawerContextType, useAddPlayerDrawerContext } from '@/context/AddPlayerDrawerContext';
import { useToast } from '../ui/use-toast';
import { PlayerListDataType } from '@/type';

export default function AddPlayerDrawer() {
    const {
        playersTobeAddedInputValue,
        onPlayerNameInputChange,
        playersTobeAdded,
        handleAddPlayerClick,
        handleConfirmAddPlayerClick,
        handleRemovePlayerClick,
    }: AddPlayerDrawerContextType = useAddPlayerDrawerContext();
    const { toast } = useToast();
    const [openDrawer, setOpenDrawer] = useState(false)
    function handleOpenDrawer() {
        setOpenDrawer(true)
    }
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
                                <Input
                                    type="text"
                                    placeholder="Loinel Messi"
                                    onChange={onPlayerNameInputChange}
                                    value={playersTobeAddedInputValue}
                                />
                                <Button
                                    onClick={handleAddPlayerClick}
                                    type="submit"
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                        <ScrollArea className="h-52 w-full rounded-md border p-2">
                            {
                                playersTobeAdded?.map(ele => (
                                    <div key={ele.id} aria-label={ele.id} className='flex flex-row justify-between bg-secondary p-2 px-5 rounded-lg items-center mb-1'>
                                        <p className="text-sm">{ele.name}</p>
                                        <p
                                            className='rotate-45 cursor-pointer text-lg'
                                            onClick={(e: any) => handleRemovePlayerClick(e)}
                                            aria-label={ele.id}
                                        >
                                            +
                                        </p>
                                    </div>
                                ))
                            }
                        </ScrollArea>
                        <Button
                            onClick={() => {
                                handleConfirmAddPlayerClick();
                                if (playersTobeAdded.length === 0) {
                                    return;
                                }
                                setOpenDrawer(false);
                            }
                            }
                            type="submit"
                        >
                            Confirm
                        </Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

