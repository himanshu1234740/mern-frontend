import React, { useState } from 'react'
import './register.css';
import insta from '../../images/instagram.png'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { register } from '../../actions/Posts'

export default function Register(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '', name: '', username: '', password: '', cpassword: ''
    })
    const HandleSubmit = (e) => {
        e.preventDefault()
        let usernameValidation = /^[a-zA-Z0-9\-\_]+$/
        let emailValidation = /^\w([\_\.0-9a-zA-Z]+)@([\_\.0-9a-zA-Z]+)\.([a-zA-z]){2,7}$/;
        let passwordValidation = /([!@#$%^&*0-9a-zA-Z]+){6,15}/
        if(!emailValidation.test(user.email)){
            handleAlert('Please Put Valid Email')
        }else if(!usernameValidation.test(user.username)){
            handleAlert('Username not contain &,#,@,!,%,*,^')
        }else if(!passwordValidation.test(user.password)){
            handleAlert('Password Contain Must 6 Characters')
        }
        else{
            dispatch(register(user,handleAlert,navigate,props.progress))
            
        }
        

    }
    const [alert,setAlert] = useState({msg: ''})
    function handleAlert(msg) {
        setAlert({msg: msg})
        setTimeout(() =>{ 
            setAlert({msg: ''})
        },1600)
    }

    const handlechange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    


    return (
        <>
            <div className="register" >
                <img className="insta" src={insta} alt="" />
                <h3 className="para" >Sign up to see photos from your friends.</h3>
                <h3 className="alert" >{alert.msg}</h3>
                <form>
                    <input type="text" className="form-control" name="email" onChange={handlechange} id="email" placeholder="Email" /><br />
                    <input type="text" className="form-control" name="name" onChange={handlechange} id="name" placeholder="Name" /><br />
                    <input type="text" className="form-control" name="username" onChange={handlechange} id="username" placeholder="Username" /><br />
                    <input type="password" className="form-control" name="password" onChange={handlechange} id="password" placeholder="Password" /><br />
                    <input type="password" className="form-control" name="cpassword" onChange={handlechange} id="cpassword" placeholder="Confirm password" /><br />
                    <button className="signup" type="submit" onClick={HandleSubmit} >Sign Up</button>
                </form>
            </div>
            <div className="footer" >
                <p id="account" >Have an account?</p><Link className="log" to="/login">Log in</Link>
            </div>
        </>

    )
}
