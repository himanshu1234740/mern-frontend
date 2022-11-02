import React, { useRef, useEffect, useState } from 'react'
import './profile.css'
import profile from '../../images/profile.png'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Userprofile from './Userprofile'
import { profileimage, userLogin } from '../../actions/Posts'


export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userlogin = JSON.parse(localStorage.getItem('userinfo'))
    const id = localStorage.getItem('id')

    const login = useSelector((login) => login.login)
    useEffect(() => {
        dispatch(userLogin(id))
    }, [])

    const posts = useSelector((state) => state.posts)
    let postCount = 0
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].user === login._id) {
            postCount++
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        navigate('/login')
    }
    const handleFileInput = () => {
        ref.current.click()
    }
    const ref = useRef(null)
    //update user image
    const [image, setImage] = useState({
        profile: ''
    })

    const handleProfileChange = (e) => {
        setImage({ ...image, profile: e.target.files[0] })

    }
    useEffect(() => {
        if (image.profile !== "") {
            console.log(image)
            let formdata = new FormData()
            formdata.append('profile', image.profile, image.profile.name)
            dispatch(profileimage(formdata, userlogin._id))
        }
    }, [image])

    return (
        <>
            <div className="userdetail" >
                <div className="flex">
                    <div className='userprofile'>
                        {login._id === userlogin._id ? <input type="file" ref={ref} style={{ display: 'none' }} onChange={handleProfileChange} className="userImage" encType="multipart/form-data" /> : null}
                        {!login.profile ? <img height="180" width="180px" name="profile" onClick={handleFileInput} src={profile} className='profileImg' alt="" /> : <img height="180" width="180px" className='profileImg' name="profile" src={`http://localhost:5000/profile/${login.profile}`} alt="" />}<br />

                        {userlogin._id === login._id ? <Link to="/edit"><button className="edit" >Edit Profile</button></Link> : <Link to="/edit"><button style={{ display: 'none' }} >Edit Profile</button></Link>}
                    </div>
                    <div  >
                        <p className="user" >{login.username}</p>
                        <div className="postcount">
                            <p style={{ fontSize: "19px", marginTop: "2px" }} >{postCount}</p><p style={{ marginLeft: '10px', marginTop: '5px' }} >Posts</p>
                        </div>
                        <h3 className="UserNameId" >{login.name}</h3>
                    </div>
                    {login._id === userlogin._id ? <button className="logout" onClick={handleLogout} >Logout</button> : <button style={{ display: 'none' }} className="logout" onClick={handleLogout} >Logout</button>}
                </div>
            </div>
            <hr className="lin" />
            <div className="userPosts" >
                {posts.map((element) => {
                    if (element.user === login._id) {
                        return <Userprofile key={element._id} img={element.
                            selectedFiles} like={element.likeCount.length} id={element._id} comment={element.comments.length}/>;
                    }
                })}
            </div>
        </>
    )
}
