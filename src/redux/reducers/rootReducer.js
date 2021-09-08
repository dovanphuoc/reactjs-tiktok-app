import { combineReducers } from 'redux'
import avatar from './avatarReducer'

const rootReducer = combineReducers({
    avatar: avatar
})
export default rootReducer;