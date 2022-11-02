import {combineReducers} from 'redux'
import posts from './posts'
import {User,login,comment} from './posts'


export default combineReducers({
    posts,
    User, 
    login,
    comment 
    
})
