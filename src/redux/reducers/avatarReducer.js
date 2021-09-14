import { GET_AVATAR } from '../actions/constant'

const initialState = {
    avatar: null
}

const avatar = (state = initialState, action) => {
    switch (action.type) {
        case GET_AVATAR:
            // const currentUser = action.payload
            return {
                ...state,
                // currentUser: 
            }
        default:
            return state;
    }
}

export default avatar;