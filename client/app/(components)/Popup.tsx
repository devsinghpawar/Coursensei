"use client"
import React from 'react'
import { Drawer } from 'vaul';
import { Sidebar } from '@/components/ui/sidebar'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
export default function Popup() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild className='ml-[42%] inline-block'>
        <Button variant="link">Sidebar</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-1 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="">
              <ScrollArea className="h-60 rounded-md">
                <Sidebar/>
              </ScrollArea>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
