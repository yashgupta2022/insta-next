'use client'

import { useSession ,signOut } from "next-auth/react"

export default function MiniProfile() {
  const {data:session} = useSession()
  return (
    <div className='flex items-center justify-between mt-10 ml-5 mr-5'>
      <img src={session?.user.image} alt="" className='h-16 rounded-full border p-[2px]' />
      <div className='flex-1 ml-4'>
        <h2 className='font-bold'>{session?.user.username}</h2>
        <h3 className='text-sm text-gray-400 text-wrap pr-4'>Welcome to Instagram</h3>
      </div>
      <button onClick={signOut} className='font-semibold text-blue-400 text-sm'>Sign Out</button>
    </div>
  )
}
