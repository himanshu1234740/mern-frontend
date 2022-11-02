import React from 'react'
import profile from '../../../images/profile.png'
import { useSelector } from 'react-redux'

export default function Comment(props) {
  const user = useSelector((user) => user.User)
  
  return (
    <>
      {!props.comment ? null : props.comment.map((element) => {
        for (let i = 0; i < user.length; i++) {
          if (element.id === user[i]._id) {

            return <div className="showUserComment" >
              <div className="userComment">
              {user[i].profile!==""?<img className="userCommentImage" src={`http://localhost:5000/profile/${user[i].profile}`} alt="" />:<img className="userCommentImage" src={profile} alt="" />}
                <div className="commentData">
                  <h5 className="commentUsername" >{user[i].username}</h5>
                  <p className="WhichComment" >{element.comments}</p>
                </div>
              </div>
            </div>
          }
        }
      })}
    </>
  )
}
