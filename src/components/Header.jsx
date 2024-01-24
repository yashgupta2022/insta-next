'use client'
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { useRouter } from 'next/navigation';

export default function Header() {
  const {data:session} = useSession()
  const router = useRouter()
  console.log(session)
  return (
    <div className='shadow-md  h-25 sticky top-0 bg-white z-30 '>
      <div className=' flex items-center justify-between max-w-6xl mx-4 xl:mx-auto'>
        <div className='h-24 w-24 relative cursor-pointer hidden lg:inline-grid'>
          <Image src='https://assets.stickpng.com/images/5a4e432a2da5ad73df7efe7a.png' alt='logo' layout='fill' className='object-contain' />
        </div>
        <div className='h-24 w-10 relative cursor-pointer lg:hidden'>
          <Image src='https://i.pinimg.com/originals/72/9f/77/729f7798561be2cb67f39e916a22eb6a.png' alt='logo' layout='fill' className='object-contain' />
        </div>

        <div className='relative mt-1 ml-2 mr-0'>
          <div className='absolute top-2 left-2 '>
          <CiSearch className='h-6 w-6  text-gray-600 ' />
          </div>
          <input type='text' placeholder='Search' className='h-10 max-w-[50vw] bg-gray-50 pl-10 text-sm  border-2 border-gray-300  focus:ring-black focus:border-black rounded-md' />
        </div>

        <div className='flex space-x-4 items-center  '>
        <IoMdHome className='hidden md:inline-flex h-6 w-6 hover:scale-125 transition-transform duration-200 ease-out cursor-pointer'/>
        
        {session ? <> 
          <CiCirclePlus className='h-6 w-6 hover:scale-125 transition-transform duration-200 ease-out cursor-pointer ' />
        <img onClick={signOut} src={session.user.image} alt='logo' className='h-10 rounded-full cursor-pointer'  />
        </> : <button onClick={signIn} className='text-sm font-semibold text-blue-500 hover:text-blue-600 transition duration-200'>Sign in</button>} 
        </div>
      </div>
    </div>
  )
}
