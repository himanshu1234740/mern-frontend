import axios from 'axios';

const url = 'http://localhost:5000/posts'

export const fetchPost = () =>

    axios.get(url)

export const createPost = (newPost) => axios.post('http://localhost:5000/posts/api/user', newPost, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
});

export const register = (userData) => axios.post('http://localhost:5000/posts/api/register', userData);

export const login = (userLogin) => axios.post('http://localhost:5000/posts/api/login', userLogin);

export const data = () => axios.get('http://localhost:5000/posts/api/getUser')

export const like = (likeData) => axios.patch(`http://localhost:5000/posts/api/like/${likeData.id}`, likeData, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})

export const updateUser = (userdata) => axios.put(`http://localhost:5000/posts/api/updateUser/${userdata.id}`, userdata, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})

export const userLoginData = (id) => axios.get(`http://localhost:5000/posts/api/userdata/${id}`, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})

export const profileImage = (profile, id) => axios.patch(`http://localhost:5000/posts/api/profileUpdate/${id}`, profile, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
        'Content-Type': `multipart/form-data`,
    }
})

export const postcomment = (comment, id, userid) => axios.patch(`http://localhost:5000/posts/api/comment/${id}`, comment, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})

export const fetchComment = (id) => axios.get(`http://localhost:5000/posts/api/fetchComment/${id}`, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})
export const deletePost = (id) => axios.delete(`http://localhost:5000/posts/api/delete/${id}`, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})




