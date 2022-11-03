
import React, { useEffect,useState } from 'react'
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
import LoadingBar from 'react-top-loading-bar'



const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem('auth-token')===null||localStorage.getItem('userinfo')===null) {
      navigate('/login')
    }
    dispatch(getPost(setLoading,setProgress));
  }, [dispatch])

  const location = useLocation()
  const [state, setState] = useState(0)
  
  const setProgress = (progress)=>{
    setState(progress)
  }
  
  return (
    <>
      {location.pathname==='/login'||location.pathname==='/sign'?'':<Navbar className="item-1" />}
      <LoadingBar
          color='rgb(200, 0, 0)'
          progress={state}
          height = {4} 
          
        />
      <Routes>
        <Route path="/login" element={<Login progress={setProgress}/>} />
        <Route path="/sign" element={<Register progress={setProgress}/>} />
        <Route path="/" element={<Posts className="item-2" loading={loading} />} />
        <Route path="/addpost" element={<From progress={setProgress}/>} />
        <Route path="/profile" element={<Profile progress={setProgress} />} />
        <Route path="/edit" element={<Edit/>}/>
        <Route path="/detail" element={<Detail/>}/>
      </Routes>


    </>

  )
}
export default App