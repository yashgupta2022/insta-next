import React from 'react'
import Post from './Post'

export default function Posts() {

  const posts = [
    {
      id:"1",
      username:"mike",
      userImage:"https://i.pravatar.cc/150?img=3",
      img : 'https://images.unsplash.com/photo-1705504966754-0b0df453a7f0?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption : 'Nature is beautiful'
    },
    {
      id:"2",
      username:"yash",
      userImage:"https://i.pravatar.cc/150?img=10",
      img : 'https://images.unsplash.com/photo-1705917662542-7fd6af312a1c?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D',
      caption : 'Snacks Time..'
    },

  ]

  return (
    <div classname=''>
      {posts.map((post) => 
      <Post key={post.id} username={post.username} userImage={post.userImage} img={post.img} caption={post.caption} /> )}
    </div>
  )
}
