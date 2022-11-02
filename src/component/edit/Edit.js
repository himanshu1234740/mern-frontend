import React, { useRef, useState, useEffect } from 'react'
import './edit.css'
import profile from '../../images/profile.png'
import { UpdateUser } from '../../actions/Posts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogin, profileimage } from '../../actions/Posts'

export default function Edit() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginUser = JSON.parse(localStorage.getItem('userinfo'))

  useEffect(() => {
    dispatch(userLogin(loginUser._id))
  }, [])
  const login = useSelector((login) => login.login)
  
  const [updateuser, setUpdateUser] = useState({
    name: '', username: '', email: '', id: '', profile: ''
  })

  useEffect(() => {
    setUpdateUser({
      name: loginUser.name,
      username: loginUser.username,
      email: loginUser.email,
      id: loginUser._id,
      profile: loginUser.profile
    })
    // react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (loginUser.profile !== updateuser.profile && updateuser.profile !== "") {
      let formdata = new FormData()
      formdata.append('profile', updateuser.profile, updateuser.profile.name)
      dispatch(profileimage(formdata, loginUser._id))
      dispatch(userLogin(loginUser._id))

    }
  }, [updateuser.profile, dispatch])

  const Handlefile = (e) => {
    setUpdateUser({ ...updateuser, [e.target.name]: e.target.files[0] })
    document.getElementById('profileImage').src = window.URL.createObjectURL(e.target.files[0])
  }

  const handleUpdateUser = () => {
    let usernameValidation = /^[a-zA-Z0-9\-\_]+$/
    let emailValidation = /^\w([\_\.0-9a-zA-Z]+)@([\_\.0-9a-zA-Z]+)\.([a-zA-z]){2,7}$/;
    if(!usernameValidation.test(updateuser.username)){
      alertHandle('Username not contain &,#,@,!,%,*,^')
    }else if(!emailValidation.test(updateuser.email)){
      alertHandle('Please Put Valid Email')
    }
    else{
      dispatch(UpdateUser(updateuser, navigate, alertHandle))
    }
    
  }
  const changeUpdate = (e) => {
    setUpdateUser({ ...updateuser, [e.target.name]: e.target.value })
  }
  const handleFileUpdate = (e) => {
    ref.current.click()
    
  }
  const ref = useRef(null)

  const [alert, setAlert] = useState({ msg: '' })
  function alertHandle(msg) {
    setAlert({ msg: msg })
    setTimeout(() => {
      setAlert({ msg: '' })
    }, 1500)
  }

  return (
    <div className="Mainedit" >
      <div className="Updateprofile">
        <input type="file" name="profile" ref={ref} onChange={Handlefile} style={{ display: 'none' }} />
        {updateuser.profile ? <img id="profileImage" className="imgupdate" onClick={handleFileUpdate} src={`http://localhost:5000/profile/${login.profile}`} height="70px" width="70px" alt="" /> : <img className="imgupdate" onClick={handleFileUpdate} src={profile} height="70px" width="70px" alt="" />}
        <div className="UpdateUser" >
          <h3  >{login.username}</h3>
          <p className="change" onClick={handleFileUpdate} >Change Profile Photo</p>
        </div>
      </div>
      <h3 className="alertUpdate">{alert.msg}</h3>
      <div className="updatename">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={updateuser.name} onChange={changeUpdate} className="updateInput" />
      </div>
      <div className="usernameEdit">
        <label htmlFor="name">Username</label>
        <input type="text" name="username" value={updateuser.username} onChange={changeUpdate} className="updateusername" />
      </div>
      <div className="usernameEdit">
        <label htmlFor="name">Email</label>
        <input type="text" name="email" value={updateuser.email} onChange={changeUpdate} className="updateInput" />
      </div>
      <button className="UpdateBtn" onClick={handleUpdateUser} >Update Profile</button>
    </div>
  )
}
