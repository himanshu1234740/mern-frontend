import { useSelector } from 'react-redux'
import React from 'react'
import Post from './post/Post'
import './style.css'

export default function Posts(props) {
  const posts = useSelector((state) => state.posts)
 

  return (
    <div className="main" >
    
      {posts.map(post => {
        return <Post pogress={props.setProgress} key={post._id} post={post} />
      })
      }

    </div>



  )
}
