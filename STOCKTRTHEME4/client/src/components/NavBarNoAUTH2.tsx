'use client'
import {TrendingUp } from 'lucide-react'

function NavBarNoAUTH2() {
  return (
    
    <>
<header className="flex justify-between items-center px-4 py-3 shadow-lg border-b border-purple-500/30 backdrop-blur-sm">
<div className="flex text-[#f3f3f3] items-center gap-2">
            <TrendingUp className="h-[1.5rem] w-[1.5rem] sm:h-[3rem] sm:w-[3rem]"/>
            <h1 className="text-[1rem] font-bold sm:text-[2rem]">StockTrackerPro</h1>
       </div>     
     </header>

 
    </>
  )
}

export default NavBarNoAUTH2