import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal,HiOutlineEmojiHappy, HiOutlineChat, HiHeart } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import {useSession} from 'next-auth/react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../app/firebase';
import Moment from 'react-moment'
export default function Post({id,username,userImage,img,caption,timestamp}) {

    const {data:session} = useSession()
    const [comment,setComment] = useState("")
    const [comments,setComments] = useState([])
    const [hasLiked,setHasLiked] = useState(false)
    const [likes,setLikes] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')), (snapshot) => {
            setComments(snapshot.docs)
        })
        return unsubscribe  
    }, [db, id])

    const sendComment = async (e) => {
        e.preventDefault()
        await addDoc(collection(db,'posts',id,'comments'),{
            comment:comment,
            username:session.user.username,
            userImage:session.user.image,
            timestamp:serverTimestamp()
        })
        setComment('')
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db,'posts',id,'likes'), (snapshot) => {
            setLikes(snapshot.docs)
        })
        return unsubscribe
    }, [db, id])
    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
    },[db, likes])
    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db,'posts',id,'likes',session.user.uid))
        }
        else{
        await setDoc(doc(db,'posts',id,'likes',session.user.uid),{
            username:session.user.username
        })}
    }

  return (
    <div className='bg-white my-7 border rounded-md'>
        {/* PostHeader */}
        <div className='flex items-center  p-5'>
            <img src={userImage} alt=""  className=' h-12 rounded-full object-cover border mr-3 p-1'/>
            <p className='flex-1 font-bold '>{username} </p>
            <HiDotsHorizontal />
        </div>
        {/* PostImage */}
        <img src={img} alt="" className='object-cover w-full'/>

        {/* PostButtons */}
        {session && (
        <div className='flex justify-between p-4 pb-2'>
            <div className='flex space-x-4'>
                {hasLiked?<HiHeart onClick={likePost} className='btn  text-red-500'/> :<FiHeart onClick ={likePost} className='btn'/>}
                <HiOutlineChat className='btn'/>
            </div>
            <FaRegBookmark className='btn' />
        </div> )}

        

        {/* Post Comments */}
        <div className='flex justify-between items-center'>
        <p className='p-5 truncate flex-1'>
            {likes.length > 0 && (<p className='font-bold mb-1'>{likes.length} likes</p>)}
            <span className='font-bold mr-2'>{username}</span>{caption}</p>
        <Moment className='text-sm mr-4 truncate' fromNow>{timestamp}</Moment>
        </div>

        {comments.length >0 && (
            <div className='mx-10 max-h-24 overflow-y-scroll scrollbar-none'>
                {comments.map((comment) => (
                    <div key={comment.id} className='flex items-center space-x-2 mb-3 text-sm'>
                        <img src={comment.data().userImage} alt="" className='h-7 rounded-full object-cover'/>
                        <p className='font-semibold'>{comment.data().username}</p>
                        <p className='flex-1 truncate'>{comment.data().comment}</p>
                        <Moment fromNow >{comment.data().timestamp?.toDate()}</Moment>
                    </div>
                ))}
            </div>
        )}
        
        {/* Post Input */}
        {session && (
        <form className='flex items-center p-4'>
            <HiOutlineEmojiHappy className='mr-2 h-6 btn'/>
            <input onChange={(e)=>setComment(e.target.value)} value={comment} type="text" placeholder='Enter your comment...' className='border-none flex-1 focus:ring-0  outline-none' />
            <button type='submit' onClick={sendComment} disabled={comment.trim()===''} className='disabled:text-blue-200 font-bold text-blue-400'>Post</button>
        </form>)}
        
    </div>
  )
}
