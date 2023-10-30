"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
//import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation';
import TeamSwitcher from "@/components/ui/team-switcher"
import { useState } from "react";
export function Sidebar(){
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
  return (
    <div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Loomen org
          </h2>
        <TeamSwitcher />
          <h2 className="mb-2 mt-2 px-4 text-lg font-semibold tracking-tight">
            General
          </h2>
          <div className="space-y-1">
            <Button variant={convo} className="w-full justify-start" onClick={()=>openlink("","convo")}>
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
                <div className="ml-2">
              Conversations
              </div>
            </Button>
            <Button variant={dashboard} className="w-full justify-start" onClick={()=>openlink("dashboard","dashboard")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              Dashboard
            </Button>
            <Button variant={product} className="w-full justify-start" onClick={()=>openlink("agreements","product")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
              Products
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              Teams
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              Settings
            </Button>
          </div>
        </div>
    </div>
    </div>
    
  )
}