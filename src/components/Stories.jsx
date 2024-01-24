'use client'
import React, { useEffect, useState } from 'react'
import minifaker from 'minifaker'
import 'minifaker/locales/en'
import Story from './Story'
import { useSession } from 'next-auth/react'
export default function Stories() {
    const [storyUsers, setStoryUsers] = useState([])
    const {data:session} = useSession()
    useEffect(() => {
        const storyUsers = minifaker.array(20, (i)=>{
            return {
                username: minifaker.username({locale:"en"}).toLowerCase(),
                image: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}`,
                id: i,
            }
        })
        setStoryUsers(storyUsers)
    },[])
  return (
    <div className='flex space-x-2 bg-white  mt-8 p-6 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none'>
      {session && (
        <Story img={session.user.image} username={session.user.username} isUser='true' />
      )}
      {storyUsers.map(user=>{
          return <Story key={user.id} username={user.username} img={user.image}/>
      })}
    </div>
  )
}
