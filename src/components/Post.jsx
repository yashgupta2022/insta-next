import React from 'react'
import { HiDotsHorizontal,HiOutlineEmojiHappy, HiOutlineChat } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";

export default function Post({username,userImage,img,caption}) {
  return (
    <div className='bg-white my-7 border rounded-md'>
        {/* PostHeader */}
        <div className='flex items-center  p-5'>
            <img src={userImage} alt=""  className=' h-12 rounded-full object-cover border mr-3 p-1'/>
            <p className='flex-1 font-bold '>{username}</p>
            <HiDotsHorizontal />
        </div>
        {/* PostImage */}
        <img src={img} alt="" className='object-cover w-full'/>
        {/* PostButtons */}
        <div className='flex justify-between p-4'>
            <div className='flex space-x-4'>
                <FiHeart className='btn'/>
                <HiOutlineChat className='btn'/>
            </div>
            <FaRegBookmark className='btn' />
        </div>

        {/* Post Comments */}
        <p className='p-5 truncate '><span className='font-bold mr-2'>{username}</span>{caption}</p>

        {/* Post Input */}
        <form className='flex items-center p-4'>
            <HiOutlineEmojiHappy className='mr-2 h-6 btn'/>
            <input type="text" placeholder='Enter your  comment...' className='border-none flex-1 focus:ring-0  outline-none' />
            <button className='font-bold text-blue-400'>Post</button>
        </form>
    </div>
  )
}
