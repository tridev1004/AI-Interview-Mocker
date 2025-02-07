"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const Header = () => {
    const path=usePathname();
  

  return (
    <div className='flex items-center justify-between p-4 shadow-sm bg-secondary'>
        <img src={'/logo.svg'} width={160} height={100} alt="logo"/>
        <ul className='hidden gap-6 md:flex '>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer  ${path=='/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer  ${path=='/dashboard/quesitons' && 'text-primary font-bold'}`}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer  ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer  ${path=='/dashboard/how' && 'text-primary font-bold'}`}>How it Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header