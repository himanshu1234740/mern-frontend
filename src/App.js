
import React, { useEffect } from 'react'
import Posts from './component/posts/Posts'
import { Routes, Route, useLocation } from "react-router-dom"
import './style.css'
import { getPost } from './actions/Posts'
import { useDispatch } from 'react-redux'
import Navbar from './component/navbar/Navbar'
import From from './component/form/Form'
import Login from './component/login/Login'
import Register from './component/register/Register'
import { useNavigate } from 'react-router-dom'
import Profile from './component/profile/Profile'
import Edit from './component/edit/Edit'
import Detail from './component/detail/Detail'



const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem('auth-token')===null||localStorage.getItem('userinfo')===null) {
      navigate('/login')
    }
    dispatch(getPost());
  }, [dispatch])

  const location = useLocation()
 
  
  return (
    <>
      {location.pathname==='/login'||location.pathname==='/sign'?'':<Navbar className="item-1" />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Register/>} />
        <Route path="/" element={<Posts className="item-2" />} />
        <Route path="/addpost" element={<From />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/edit" element={<Edit/>}/>
        <Route path="/detail" element={<Detail/>}/>
      </Routes>


    </>

  )
}
export default App