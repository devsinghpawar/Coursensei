"use client"
import React from 'react'
import TeamSwitcher from "@/components/ui/team-switcher"
import { UserNav } from "@/components/ui/user-nav"
import { Search } from "@/components/ui/search"
import { MainNav } from "@/components/ui/main-nav"
import { useState } from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Popup from './Popup'
import { useRouter,usePathname} from 'next/navigation'
import { useEffect } from 'react'
import { ModeToggle } from './Toggle'

export default function Navbar() {
  const[isSearch,setSearch]=useState<boolean>(true);
  const [Tokent, setToken] = useState<string>('');
  //const[isStr,setStr]=useState("block lg:hidden")
  const pathname = usePathname();
  
  useEffect(()=>{
    const access_tokenn: string | null = localStorage.getItem("access_tokenn");
    if(access_tokenn!==null){
      setToken(access_tokenn)
    }else{
      setToken("null")
    }
  })
  const assignSearch = (newValue:boolean) => {
    setSearch(newValue);
  };
  return (
    <>
    <div className="flex-col md:flex sticky top-0 backdrop-blur-sm z-20">
        <div className="">
          <div className="flex h-16 items-center px-4">
          <Avatar>
            <AvatarImage src="https://raw.githubusercontent.com/captain0jay/Loomen/main/assets/Screenshot%20(38).png" alt="@shadcn" />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
            <div className="ml-auto flex items-center space-x-3">
            <ModeToggle/>
            <UserNav />
              {pathname !== "/login"?
            <div className='block lg:hidden mr-4'>
                  <Popup/>
                </div>:<></>}
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
