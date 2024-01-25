'use client'
import React, { useEffect, useState } from 'react'
import minifaker from 'minifaker'
import 'minifaker/locales/en'

export default function Suggestions() {
    const [suggestions,setSuggestions] = useState([])
    useEffect(() => {
        const suggestions = minifaker.array(10, (i)=>{
            return {
                username: minifaker.username({locale:"en"}).toLowerCase(),
                image: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}`,
                jobTitle: minifaker.jobTitle(),
                id: i,
            }
        })
        setSuggestions(suggestions)
    },[])
  return (
    <div className='mt-4 ml-5 mr-5  '>
    <div className='flex justify-between mb-5 text-sm '>
      <h3 className='font-bold text-gray-400'>Suggestions for you</h3>
      <button className='font-semibold text-gray-600'>See All</button>
    </div>
    <div className='overflow-y-scroll max-h-screen scrollbar-none'>
    {suggestions.map(suggestion=>{ 
        return <div key={suggestion.id} className='flex items-center justify-between mt-3 '>
            <img src={suggestion.image} alt="" className='w-10 h-10 rounded-full border p-[2px]' />
            <div className='flex-1 ml-4 max-w-[15vw]'>
              <h2 className='font-semibold text-sm truncate'>{suggestion.username}</h2>
              <h3 className='text-gray-400 text-sm truncate '>{suggestion.jobTitle}</h3>
            </div>
            <button className='text-blue-400 text-sm font-semibold '>Follow</button>
        </div>
    })}</div>
    </div>
  )
}
