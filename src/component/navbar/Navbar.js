import React,{useEffect} from 'react'
import './navbar.css'
import instagram from '../../images/instagram.png'
import addPost from '../../images/add.png'
import profile from '../../images/profile.png'
import home from '../../images/home.png'
import camra from '../../images/camra.png'
import { Link } from "react-router-dom"
import {useSelector,useDispatch } from 'react-redux'
import { userLogin } from '../../actions/Posts'



export default function Navbar() {
  const id = JSON.parse(localStorage.getItem('userinfo'))
  const dispatch = useDispatch()
  
  const handleprofile = () => {
    if(id!==null){
      const userid = JSON.parse(localStorage.getItem('userinfo'))._id
      localStorage.setItem('id', userid)
    }
  }
  let userProfile = ""
  const login = useSelector((login) => login.login)
  useEffect(() => {
      if(id!==undefined){
        dispatch(userLogin(id._id))
      }
      
  }, [id])
  if(login.profile===undefined) {
    userProfile = ""
  }else{
    userProfile = login.profile
  }
  return (

    <div className="navbar" style={{ backgroundColor: '#fffbfb' }} >
      <ul className="flex" >
        <li className="sideItem" ><img src={camra} height="40px" className="camera"  alt="..." /></li>
        <li className="sideItem"><Link to="/"><img className="instaLogo" style={{ cursor: 'pointer' }} src={instagram}   alt="..." /></Link></li>
      {/* </ul>
        <ul className="flexSide" > */}
          <li className="rightItem home" ><Link to="/"><img src={home} height="35px" width="55px" alt="..." /></Link></li>
          <li className="rightItem" ><Link to="/addpost"><img src={addPost} height="35px" width="35px" alt="..." /></Link></li>
          <li className="rightItem"><Link to="/profile" onClick={handleprofile} >{userProfile===""?<img src={profile} height="35px" width="35px" alt="..." />:<img src={`http://localhost:5000/profile/${userProfile}`} style={{borderRadius: "10rem"}} height="35px" width="35px" alt="..." />}</Link></li>
          
          
          <li className="rightItem" style={{ display: 'none' }} ><Link to="/login"  >login</Link></li>
        
      </ul>
      

    </div>

  )
}
