import React from 'react'
import './profile.css'
import delet from '../../images/delete.png'
import { deletePost } from '../../actions/Posts'
import { useDispatch } from 'react-redux'

export default function Userprofile(props) {
    const dispatch = useDispatch()
    const id = localStorage.getItem('id')
    const userId = JSON.parse(localStorage.getItem('userinfo'))._id
    const handleDelete = () => {
        dispatch(deletePost(props.id))
    }
    return (
        <div className='card' >
            <img height='75%' width='100%' className='img' src={`http://localhost:5000/upload/${props.img}`} alt="" />
            <div className="likeComment" >
                <p className="userLike" >Like</p>&nbsp;<p>{props.like}</p>
                <p className="userComment" >Comment</p>&nbsp;<p>{props.comment}</p>
                {id === userId ? <img onClick={handleDelete} className="delete" src={delet} alt="" /> : null}
            </div>

        </div>
    )
}
