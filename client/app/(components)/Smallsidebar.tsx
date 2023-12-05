"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
//import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation';
import TeamSwitcher from "@/components/ui/team-switcher"
import { useState } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Sidebar } from "@/components/ui/sidebar";
import { Drawer } from "vaul";
import { Separator } from "@/components/ui/separator"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export function Smallsidebar(){
  const [convo,setConvo] = useState<string>('ghost');
  const [product,setProduct] = useState<string>('ghost');
  const [dashboard,setDashboard] = useState<string>('ghost');
  const router = useRouter();
  const openlink = (namet:string,current_page:string) =>{
    router.push("/"+namet);
    if(current_page==="convo"){
      setConvo("secondary");setProduct("ghost");setDashboard("ghost");
    }else if(current_page==="product"){
      setConvo('ghost');setProduct('secondary');setDashboard("ghost");
    }else if(current_page==="dashboard"){
      setConvo('ghost');setProduct('ghost');setDashboard("secondary");
    }
  }

  async function handleHover(){
    const button = document.getElementById('sidebartrigger');
    if(button!==null){
    button.click();
    }
  }
  return (
    <div>
      <div className="w-[70px] space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 mt-2 px-4 text-lg font-semibold tracking-tight">
          </h2>
          <div className="space-y-1">
          <Sheet>
          <SheetTrigger asChild>
            <Button variant={convo} id="sidebartrigger" onMouseOver={handleHover} className="w-[50px] justify-start" onClick={()=>openlink("","")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>    
            </Button>
            </SheetTrigger>
            <Button variant={convo} className="w-[50px] justify-start" onClick={()=>openlink("","convo")}>
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="17" height="17" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#000000" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
            </Button>  
            <Button variant={dashboard} className="w-[50px] justify-start" onClick={()=>openlink("dashboard","dashboard")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '24px', height: '24px' }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="8" y1="9" x2="16" y2="9" />
              <line x1="8" y1="15" x2="14" y2="15" />
            </svg>


            </Button>
            <Button variant={product} className="w-[50px] justify-start" onClick={() => openlink("courses", "courses")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '24px', height: '24px' }} // Adjusted size using inline styles
            >
              <rect x="3" y="4" width="18" height="14" rx="2" ry="2" />
              <line x1="12" y1="4" x2="12" y2="18" />
            </svg>
          </Button>


            <Button variant="ghost" className="w-[50px] justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '24px', height: '24px' }} // Adjusted size using inline styles
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M2 21a15.7 15.7 0 0 1 14-7" />
              <path d="M22 21a15.7 15.7 0 0 0-14-7" />
            </svg>
            </Button>
            <Button variant="ghost" className="w-[50px] justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '24px', height: '24px' }} // Adjusted size using inline styles
            >
              <circle cx="12" cy="12" r="2" />
              <path d="M19.39 12a7.5 7.5 0 0 0-1.32-4.17" />
              <path d="M21 12a10 10 0 0 0-2-6" />
              <path d="M3 12a10 10 0 0 1 2-6" />
              <path d="M4.61 16.39a7.5 7.5 0 0 0 1.32 4.17" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.73" y1="4.73" x2="6.14" y2="6.14" />
              <line x1="17.86" y1="17.86" x2="19.27" y2="19.27" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.73" y1="19.27" x2="6.14" y2="17.86" />
              <line x1="17.86" y1="6.14" x2="19.27" y2="4.73" />
            </svg>
            </Button>
            <SheetContent>
            <Sidebar/>
            </SheetContent>
        </Sheet>
          </div>
        </div>
    </div>
    </div>
    
  )
}