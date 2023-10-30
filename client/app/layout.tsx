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

export const metadata: Metadata = {
  title: 'ProjectX',
  description: 'Random Description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [Tokent, setToken] = useState<string>('');
  useEffect(() => {
    const access_tokenn: string | null = localStorage.getItem("access_tokenn");
    if(access_tokenn!==null){
      setToken(access_tokenn)
    }else{
      setToken("null")
    }
  })
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-purple-500 to-purple-950">
        <Navbar/>
        {Tokent!=="null"?
        <div className="grid grid-cols-5 gap-3">
            <div className="hidden lg:block"><Sidebar/></div>
            {children}
        </div>:
        <Landing/>
        }
        </body>
    </html>
  )
}
