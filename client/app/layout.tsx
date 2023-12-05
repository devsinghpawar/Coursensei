"use client"
import './globals.css'
import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './(components)/Navbar'
import { Sidebar } from '@/components/ui/sidebar'
import Popup from './(components)/Popup'
import { Separator } from "@/components/ui/separator"
import Landing from './(components)/Landing'
const inter = Inter({ subsets: ['latin'] })
import { useRouter,usePathname } from 'next/navigation';
import { Smallsidebar } from './(components)/Smallsidebar'
import { Sidehover } from './(components)/Sidehover'
import { EdgeStoreProvider } from '../lib/edgestore';
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [Tokent, setToken] = useState<string>('');
  const [uselogin, setLogin] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    const access_tokenn: string | null = localStorage.getItem("access_tokenn");
    const login: string | null = localStorage.getItem("login");
    if(access_tokenn!==null){
      setToken(access_tokenn)
    }else{
      setToken("null")
    }
    if(login!==null){
      setLogin(login)
    }
  })
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={Tokent!=="null" || pathname === "/login"?" ":"bg-gradient-to-r from-purple-500 to-purple-950"}>
        <Navbar/>
        {Tokent!=="null" || pathname === "/login"?
        <div className={pathname !== "/login"?"flex":""}>
          {pathname !== "/login"?
            <div className="hidden lg:block"><Smallsidebar/></div>:<></>}
            <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </ThemeProvider>
        </div>:
        <Landing/>
        }
        </body>
    </html>
  )
}
