'use client'
import Link from "next/link";
import { TrendingUp } from 'lucide-react'
import { User } from '@/Types/User' // Import the User type
import { useUserIcon } from '@/tools/useUserIcon';
import Image from "next/image"


interface NavBarNoAUTHProps {
  UserData: User | null; 
}


const NavBarNoAUTH = ({UserData }: NavBarNoAUTHProps) => {
  const { userIcon } = useUserIcon()

  return (
    <header className="flex justify-between bg-gray-100">
      <div className="flex text-[#333333]">
        <TrendingUp className="h-[1.5rem] w-[1.5rem] sm:h-[3rem] sm:w-[3rem]"/>
        <h1 className="text-[1rem] font-bold sm:text-[2rem]">StockTrackerPro</h1>
      </div>
      <div className="flex gap-5 mr-10 text-[#333333]">
    
      <div className="UserInfo flex justify-center text-center items-center gap-2">
      <Link href={'/Profile'} className="UserICON bg-gray-300 rounded-full text-center flex items-center justify-center overflow-hidden" style={{ width: 'clamp(40px, 4vw, 55px)', height: 'clamp(40px, 4vw, 55px)' }}>  
        {userIcon ? (
          <Image 
            src={userIcon} 
            alt="Profile Icon" 
            width={55}
            height={55}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-sm sm:text-base font-bold">?</span>
        )}
      </Link>
        <Link href={'/Profile'} className="userName p-1.5">{UserData?.username || 'Guest'}</Link>
      </div>
  
     
      </div>
    </header>
  )
}

export default NavBarNoAUTH
