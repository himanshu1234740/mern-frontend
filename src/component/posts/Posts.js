import { useSelector } from 'react-redux'
import React from 'react'
import Post from './post/Post'
import './style.css'
import Spiner from "../spinner/Spiner";

export default function Posts(props) {
  const posts = useSelector((state) => state.posts)
  

  return (
    <div className="main" >
      {props.loading && <Spiner />}
      {posts.map(post => {
        return <Post pogress={props.setProgress} key={post._id} post={post} />
      })
      }

    </div>



  )
}
