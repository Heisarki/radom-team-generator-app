"use client"
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { ScrollArea } from "@/components/ui/scroll-area"
import { FaInfoCircle } from "react-icons/fa";

export default function AddPlayerDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  function handleOnclickAddPlayer() {
    setOpenDialog(true)
  }
  function handleRemovePlayer() {

  }
  const arr = ["Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
    // "Ronaldo", "Messi", "Ramos", "Kaka",
  ]
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="fixed bottom-[70px] text-slate-50 ml-1 text-3xl bg-primary rounded-full w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-primary/90">
          <p className="mb-1">+</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align='start'>
          <DropdownMenuItem onClick={handleOnclickAddPlayer}>
            Add Player
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className='text-start flex flex-row gap-[1px]'>
              <FaInfoCircle className='w-12 mt-1' />
              <p className='pr-5'>
                {`Here you can add new players, once the players are added click on "Confirm" to save them.`}
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className='flex gap-4 flex-col'>
            <Label className='text-start text-sm'>Player name</Label>
            <div className="flex w-full items-center space-x-2 ">
              <Input type="text" placeholder="Loinel Messi" />
              <Button type="submit">Add</Button>
            </div>
          </div>
          <ScrollArea className="max-h-96 w-full rounded-md border p-2">
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
        </DialogContent >
      </Dialog >
    </>
  )
}
