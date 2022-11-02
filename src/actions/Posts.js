import * as api from '../api'

export const getPost = () => (dispatch) => {
    api.fetchPost().then((response) => {
        dispatch({ type: 'Fetch_All', payload: response.data })

    }).catch((error) => {
        console.log(error)

    })



}
export const createPost = (post) => (dispatch) => {

    api.createPost(post).then((response) => {
        dispatch({
            type: 'Create', payload: response.data
        })

    }).catch((error) => {
        console.log(error)
    })


}

export const register = (userdata, handleAlert, navigate) => (dispatch) => {
    api.register(userdata).then((response) => {

        if (response.data === 'Username already Exist') {
            dispatch({
                type: 'existEmail', payload: response.data
            })
            handleAlert(response.data)
        } else if (response.data === 'password does not match') {
            dispatch({
                type: 'notMatch', payload: response.data
            })
            handleAlert(response.data)
        } else if (response.data === 'Internal server error') {
            handleAlert("Please Fill All Fields")
        }
        else {
            dispatch({
                type: 'user', payload: response.data
            })
            localStorage.setItem('auth-token', JSON.stringify(response.data.token))
            localStorage.setItem('userinfo', JSON.stringify(response.data.data))
            navigate('/')
        }

    }).catch((error) => {
        console.error(error)
    })
}

export const loginUser = (userLogin, alertHandler, navigate) => (dispatch) => {
    api.login(userLogin).then((response) => {

        if (response.data === 'invalid informations') {
            alertHandler(response.data)
        } else if (response.data === 'Field is empty') {

            alertHandler(response.data)
        } else {
            dispatch({
                type: 'login', payload: response.data
            })
            localStorage.setItem('auth-token', JSON.stringify(response.data.token))
            localStorage.setItem('userinfo', JSON.stringify(response.data.data))
            navigate('/')
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
export const userLogin = (id) => (dispatch) => {

    api.userLoginData(id).then((response) => {
        dispatch({
            type: 'loginUser', payload: response.data
        })
    }).catch((error) => {
        console.error(error)
    })
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