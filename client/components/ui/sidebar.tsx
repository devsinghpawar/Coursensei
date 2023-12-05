"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
//import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation';
import TeamSwitcher from "@/components/ui/team-switcher"
import { useState } from "react";
import Link from "next/link";
export function Sidebar(){
  const [home,setConvo] = useState<string>('ghost');
  const [courses,setProduct] = useState<string>('ghost');
  const [aichat,setDashboard] = useState<string>('ghost');
  const router = useRouter();
  const openlink = (namet:string,current_page:string) => {
    router.push("/"+namet);
    if(current_page==="home"){
      setConvo("secondary");setProduct("ghost");setDashboard("ghost");
    }else if(current_page==="courses"){
      setConvo('ghost');setProduct('secondary');setDashboard("ghost");
    }else if(current_page==="aichat"){
      setConvo('ghost');setProduct('ghost');setDashboard("secondary");
    }
  }
  return (
    <div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 mt-2 px-4 text-lg font-semibold tracking-tight">
            General
          </h2>
          <div className="space-y-1">
              <Button variant={home} className="w-full justify-start" onClick={()=>openlink("","home")}>
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
                  <Link href="/">
                    Home
                  </Link>
                </div>
              </Button>
            <Button variant={aichat} className="w-full justify-start" onClick={()=>openlink("aichat","aichat")}>
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
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="9" x2="16" y2="9" />
                <line x1="8" y1="15" x2="14" y2="15" />
              </svg>
              <Link href="/dashboard">
                Chat with AI
              </Link>
            </Button>
              <Button variant={courses} className="w-full justify-start" onClick={()=>openlink("courses","courses")}>
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
                <rect x="3" y="4" width="18" height="14" rx="2" ry="2" />
                <line x1="12" y1="4" x2="12" y2="18" />
              </svg>
              <Link href="/courses">
                Courses
                </Link>
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
                <circle cx="12" cy="7" r="4" />
                <path d="M2 21a15.7 15.7 0 0 1 14-7" />
                <path d="M22 21a15.7 15.7 0 0 0-14-7" />
              </svg>
              <Link href="/friends">
              Friends
              </Link>
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
            <Link href="/settings">
              Settings
            </Link>
            </Button>
          </div>
        </div>
    </div>
    </div>
    
  )
}