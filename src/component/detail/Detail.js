import React from 'react'
import { useSelector } from 'react-redux'
import './detail.css'
export default function Detail() {
    const id = localStorage.getItem('postId')
    const posts = useSelector((state) => state.posts)
    return (
        posts.map((element) => {
            if (element._id === id) {
                return <div key={element._id} className="detailImg" >
                    <img src={`http://localhost:5000/upload/${element.
                        selectedFiles}`} alt="..." className="imgDetail" />
                    <h3>{element.title}</h3>
                    <p>{element.description}</p>
                    <div className="detailflex" >
                        <div>
                            <h4>like</h4><p className="detailLikeCount" >{element.likeCount.length}</p>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div>
                            <h4>Comment</h4><p className="detailLikeCount" >{element.comments.length}</p>
                        </div>
                    </div>
                </div>

            }
        })
    )
}
