'use client'
import Link from "next/link";
import {TrendingUp } from 'lucide-react'

function NavBar() {
  return (
    <>
<header className="flex justify-between bg-gray-100">
<div className="flex text-[#333333]">
            <TrendingUp className="h-[1.5rem] w-[1.5rem] sm:h-[3rem] sm:w-[3rem]"/>
            <h1 className="text-[1rem] font-bold sm:text-[2rem]">StockTrackerPro</h1>
       </div>
    <div className="flex gap-5 m-1 text-[#333333]">
    <Link href="/signup" className="text-responsive-sm  text-gray-700 sm:text-responsive-base hover:text-[#009688] transition-colors ">Signup</Link>
            <Link href="/Login" className="text-responsive-sm sm:text-responsive-base hover:text-[#009688] transition-colors">Login</Link>
     </div>
     
     </header>

 
    </>
  )
}

export default NavBar