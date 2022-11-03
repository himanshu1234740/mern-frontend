import axios from 'axios';

const url = `https://mern-social-instagram.herokuapp.com/posts`

export const fetchPost = () =>

    axios.get(url)

export const createPost = (newPost) => axios.post('https://mern-social-instagram.herokuapp.com/posts/api/user', newPost, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
});

export const register = (userData) => axios.post('https://mern-social-instagram.herokuapp.com/posts/api/register', userData);

export const login = (userLogin) => axios.post('https://mern-social-instagram.herokuapp.com/posts/api/login', userLogin);

export const data = () => axios.get('https://mern-social-instagram.herokuapp.com/posts/api/getUser')

export const like = (likeData) => axios.patch(`https://mern-social-instagram.herokuapp.com/posts/api/like/${likeData.id}`, likeData, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})

export const updateUser = (userdata) => axios.put(`https://mern-social-instagram.herokuapp.com/posts/api/updateUser/${userdata.id}`, userdata, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})

export const userLoginData = (id) => axios.get(`https://mern-social-instagram.herokuapp.com/posts/api/userdata/${id}`, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})

export const profileImage = (profile, id) => axios.patch(`https://mern-social-instagram.herokuapp.com/posts/api/profileUpdate/${id}`, profile, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
        'Content-Type': `multipart/form-data`,
    }
})

export const postcomment = (comment, id, userid) => axios.patch(`https://mern-social-instagram.herokuapp.com/posts/api/comment/${id}`, comment, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})

export const fetchComment = (id) => axios.get(`https://mern-social-instagram.herokuapp.com/posts/api/fetchComment/${id}`, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})
export const deletePost = (id) => axios.delete(`https://mern-social-instagram.herokuapp.com/posts/api/delete/${id}`, {
    headers: {
        'auth-token': JSON.parse(localStorage.getItem('auth-token')),
    }
})




