export default (posts = [], action) => {
    switch (action.type) {
        case 'Fetch_All':
            return action.payload
        case 'Create':
            return [...posts, action.payload];
        case 'like':

            return posts.map(e => e._id === action.payload.id ? { ...e, likeCount: action.payload.userid } : e)
        case 'comment':
            return posts.map((e) => e._id === action.payload._id ? { ...e, comments: action.payload.comments } : e)
        case 'delete': 
            let array = posts.filter((posts)=>{
                return posts._id!== action.payload._id
            })
            return array
        default:
            return posts
    }
}
export const User = (user = [], action) => {
    switch (action.type) {
        case 'user':
            return [...user, action.payload]
        case 'login':
            return [...user, action.payload]
        case 'userinfo':
            return action.payload
        case 'existEmail':
            return action.payload
        case 'notMatch':
            return action.payload
        default:
            return user;
    }
}

export const login = (loginUser = [], action) => {
    if (action.type === 'loginUser') {
        return action.payload
    } else if (action.type === 'profileUpdate') {
        return { ...loginUser, profile: action.payload.profile }
    }
    else {
        return loginUser
    }
}

export const comment = (comment = [], action) => {
    if (action.type === 'fetchComment') {
        return action.payload
    } if (action.type === 'comment') {
        return { ...comment, comments: action.payload.comments }
    }
    else {
        return comment
    }
}
