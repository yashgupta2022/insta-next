import React, { useEffect, useState } from 'react'
import Post from './Post'
import {onSnapshot, collection, orderBy, query} from 'firebase/firestore'
import { db } from '../app/firebase'


export default function Posts() {
  const [posts,setPosts] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db,'posts'), orderBy('timestamp','desc')) , (snapshot) => {
      setPosts(snapshot.docs)
    })
    return unsubscribe
    
  },[db])
  return (
    <div classname=''>
      {posts.map((post) => 
      
      <Post key={post.id} id={post.id} username={post.data().username} userImage={post.data().profileImg} img={post.data().image} caption={post.data().caption} timestamp ={post.data().timestamp?.toDate()}/> )}
    </div>
  )
}
