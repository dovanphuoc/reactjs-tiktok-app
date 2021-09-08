import actionTypes from './constant'

export const getAvatar = (avatar) => {
    return {
        type: actionTypes.GET_AVATAR,
        payload: avatar
    }
}