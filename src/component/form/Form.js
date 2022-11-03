import React, { useState } from 'react'
import './form.css';

import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/Posts'
import { useNavigate } from 'react-router-dom';
export default function Form(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const classes = Styles()
  const [postData, setPostData] = useState({
    title: '', description: '', selectedFiles: ''
  })
  const [state, setState] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (postData.selectedFiles === "" || postData.title === "" || postData.description === "") {
      setState("Please Fill All Fields!")
      setTimeout(()=>{
        setState("")
      },1500)
    } else {
      let formdata = new FormData()
      formdata.append('selectedFiles', postData.selectedFiles, postData.selectedFiles.name)
      formdata.append('title', postData.title)
      formdata.append('title', postData.description)
      postData.selectedFiles = formdata
      dispatch(createPost(formdata,navigate,props.progress))
      
    }

  }
  const handleChange = (e) => {

    setPostData({ ...postData, [e.target.name]: e.target.value })
  }

  return (
    <div className="form" >
      <h1>ADD YOUR POST</h1>
      <form>
        <div  >
          <input type="file" className="file" name="selectedFiles" onChange={(e) => { setPostData({ ...postData, selectedFiles: e.target.files[0] }) }} encType="multipart/form-data" /><br />
        </div>
        <div >
          <input type="text" className="text" placeholder="Title" value={postData.title} onChange={handleChange} name="title" /><br />
        </div>
        <div>
          <input type="text" rows="5" color='10' className="textarea" value={postData.description} placeholder="Description" name="description" onChange={handleChange} /><br />
        </div>
        <p className='alerthandle' >{state}</p>
        <button className="AddPost" type="submit" onClick={handleSubmit} >Add Post</button><br />
      </form>
    </div>

  )
}
