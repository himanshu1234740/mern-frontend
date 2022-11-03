import * as api from '../api'

export const getPost = (setLoading,setProgress) => async (dispatch) => {
    try {
        setLoading(true);
        setProgress(30)
        const {data} = await api.fetchPost()
        setLoading(false);
        setProgress(70)
        dispatch({ type: 'Fetch_All', payload: data })
        setProgress(100)
    } catch (error) {
        console.log(error)
    }
    
}
export const createPost = (post,navigate,progress) => (dispatch) => {
    progress(30)
    api.createPost(post).then((response) => {
        navigate('/')
        progress(70)
        dispatch({
            type: 'Create', payload: response.data
        })
        progress(100)
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    })


}

export const register = (userdata, handleAlert, navigate, progress) => (dispatch) => {
    progress(30)
    api.register(userdata).then((response) => {
        progress(70)
        if (response.data === 'Username already Exist') {
            dispatch({
                type: 'existEmail', payload: response.data
            })
            handleAlert(response.data)
            progress(100)
        } else if (response.data === 'password does not match') {
            dispatch({
                type: 'notMatch', payload: response.data
            })
            handleAlert(response.data)
            progress(100)
        } else if (response.data === 'Internal server error') {
            handleAlert("Please Fill All Fields")
            progress(100)
        }
        else {
            dispatch({
                type: 'user', payload: response.data
            })
            localStorage.setItem('auth-token', JSON.stringify(response.data.token))
            localStorage.setItem('userinfo', JSON.stringify(response.data.data))
            navigate('/')
            progress(100)
        }

    }).catch((error) => {
        console.error(error)
    })
}

export const loginUser = (userLogin, alertHandler, navigate,progress) => (dispatch) => {
    progress(30)
    api.login(userLogin).then((response) => {
        progress(70)
        if (response.data === 'invalid informations') {
            progress(100)
            alertHandler(response.data)
        } else if (response.data === 'Field is empty') {
            progress(100)
            alertHandler(response.data)
        } else {
            dispatch({
                type: 'login', payload: response.data
            })
            localStorage.setItem('auth-token', JSON.stringify(response.data.token))
            localStorage.setItem('userinfo', JSON.stringify(response.data.data))
            navigate('/')
            progress(100)
        }
    }).catch((error) => {
        console.error(error)
    })
}
export const data = (userinfo) => (dispatch) => {
    api.data(userinfo).then((response) => {
        dispatch({
            type: 'userinfo', payload: response.data
        })
        
    }).catch((error) => {
        console.log(error)
    })
}

export const like = (likeData) => (dispatch) => {

    api.like(likeData).then((response) => {
        let array = response.data.likeCount
        let count = 0
        for (let i = 0; i < array.length; i++) {
            if (array[i] === likeData.userid) {
                count++
                array.splice(i, 1)
            }
        }
        if (count === 0) {
            array.push(likeData.userid)
        }
        likeData.userid = array
        dispatch({
            type: 'like', payload: likeData
        })

    }).catch((error) => {
        console.log(error)
    })
}

export const UpdateUser = (userdata,navigate,alertHandle) => (dispatch) => {

    api.updateUser(userdata).then((response) => {

        if (response.data === 'username must be unique') {
            alertHandle(response.data)
        } else {
            dispatch({
                type: 'update', payload: response.data
            })
            let userData = JSON.parse(localStorage.getItem('userinfo'))
            userData.name = response.data.name
            userData.username = response.data.username
            userData.email = response.data.email
            userData.profile = response.data.profile
            localStorage.setItem('userinfo', JSON.stringify(userData))
            navigate('/profile')
        }

    }).catch((error) => {
        console.log(error)
    })
}
export const userLogin = (id,progress) => async (dispatch) => {
    try {
        progress(30)
        const {data} = await api.userLoginData(id)
        progress(70)
        dispatch({
            type: 'loginUser', payload: data
        })
        progress(100)
    } catch (error) {
        console.log(error)
    }
    
      
}

export const profileimage = (profile, id) => (dispatch) => {

    api.profileImage(profile, id).then((response) => {
        let data = JSON.parse(localStorage.getItem('userinfo'))
        data.profile = response.data.profile
        localStorage.setItem('userinfo', JSON.stringify(data))
        
        dispatch({
            type: 'profileUpdate', payload: data
        })

    }).catch((error) => {
        console.error(error)
    })
}

export const comment = (data, id) => (dispatch) => {

    api.postcomment(data, id).then((response) => {
        let arr = response.data.comments
        arr.push(data)
        dispatch({
            type: 'comment', payload: response.data
        })

    }).catch((error) => {
        console.log(error)
    })
}

export const fetchComment = (id) => (dispatch) => {
    api.fetchComment(id).then((response) => {
        dispatch({
            type: 'fetchComment', payload: response.data
        })

    }).catch((error) => {
        console.log(error);
    })
}
export const deletePost = (id) => (dispatch) => {
    api.deletePost(id).then((response) => {
        dispatch({
            type: 'delete', payload: response.data
        })
        
    }).catch((error) => {
        console.log(error)
    })
}