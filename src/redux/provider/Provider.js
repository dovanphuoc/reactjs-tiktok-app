import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../axiosInstance'
import actions from '../actions'

const Provider = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        axiosInstance
            .get('api/auth/me')
            .then(res => {
                // dispatch(actions.)
            })
    },[dispatch])
    return (
        <div>
            
        </div>
    );
};

export default Provider;