import React, { useState } from 'react'
import './login.css'
import insta from '../../images/instagram.png'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { loginUser } from '../../actions/Posts'
export default function Login(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '', password: '', email: ''
    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(user,alertHandler,navigate,props.progress))
    }
    const [alert,setAlert] = useState({msg: ''})
    function alertHandler(msg) {
        setAlert({msg: msg});
        setTimeout(()=>{ 
            setAlert({msg: ''});
        },1500)
    }
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="login" >
                <img className="insta" src={insta} alt="" />
                <h3 className="alert" >{alert.msg}</h3>
                <form>
                    <input type="text" name="username" className='username' onChange={handleChange} placeholder="Username" />
                    <input type="email" name="name" onChange={handleChange} className='email' placeholder="Email" /><br />
                    <input type="password" name="password" onChange={handleChange} className='email' placeholder="Password" /><br />
                    <button className="btn" type="submit" onClick={handleSubmit}>Log In</button>
                </form>
                
            </div>
            <div className="bottom" >
                <p className="account" >Dont have an account?</p><Link to="/sign" className="signin" ><p>Sign In</p></Link>
            </div>
        </>
    )
}
