'use client'
import Link from "next/link";
import {TrendingUp } from 'lucide-react'

function NavBar() {
  return (
    <>
<header className="flex justify-between items-center px-4 py-3 shadow-lg border-b border-purple-500/30 backdrop-blur-sm">
<div className="flex text-[#f3f3f3] items-center gap-2">
            <TrendingUp className="h-[1.5rem] w-[1.5rem] sm:h-[3rem] sm:w-[3rem]"/>
            <h1 className="text-[1rem] font-bold sm:text-[2rem]">StockTrackerPro</h1>
       </div>
    <div className="flex gap-5 m-1 text-[#f3f3f3]">
    <Link href="/signup" className="text-responsive-sm text-white sm:text-responsive-base hover:text-green-400 transition-colors">Signup</Link>
            <Link href="/Login" className="text-responsive-sm sm:text-responsive-base hover:text-cyan-400 transition-colors">Login</Link>
     </div>
     
     </header>

 
    </>
  )
}

export default NavBar