import Image from 'next/image'
import React from 'react'
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";

export default function Header() {
  return (
    <div className='shadow-md  sticky top-0 bg-white z-30 '>
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
        <CiCirclePlus className='h-6 w-6 hover:scale-125 transition-transform duration-200 ease-out cursor-pointer ' />
        <img src='https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png' alt='logo' className='h-10 rounded-full cursor-pointer'  />

        </div>
      </div>
    </div>
  )
}
