import React, { useState } from 'react';
import Button from '../common/Button';
import styles from './Login.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import axiosInstance from '../../axiosInstance'

const defaultFn = () => {}
const Login = ({
    title = '',
    accountTitle = '',
    loginText = '',
    onShowModalLogin = defaultFn,
    onCloseModal = defaultFn,
    onHandleLogin = defaultFn,
}) => {
    const [user, setUser] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})

    const handleSubmitForm = (e) => {
        e.preventDefault()
        axiosInstance
            .post('/api/auth/me', user)
            .then(res => {
                window.localStorage.setItem('token', res.meta.token)
                window.location.reload()
            })
            .catch(err => {
                let status_code = err.response.data.status_code
                switch (status_code) {
                    case 422:
                        const resErrors = {}
                        Object.keys(err.response.data.errors).forEach(field => {
                            resErrors[field] = err.response.data.errors[field][0]
                        })
                        setErrors(resErrors)
                        break;
                    default:
                        setErrors({
                            ...errors,
                            password: 'Account has used'
                        })
                }
            })
    }
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>{title}</h3>
            <button className={styles.btnClose} onClick={onCloseModal}>
                <AiFillCloseCircle className={styles.icon} />
            </button>
            <form onSubmit={handleSubmitForm}>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={e => {
                            setUser({ ...user, email: e.target.value })
                            setErrors({
                                ...errors,
                                email: null
                            })
                        }}
                    />
                    <span>{errors.email}</span>
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={e => {
                            setUser({ ...user, password: e.target.value })
                            setErrors({
                                ...errors,
                                password: null
                            })
                        }}
                    />
                    <span>{errors.password}</span>
                </div>
                <Button
                    children="Submit"
                    type="primary"
                    size="m"
                    color="white"
                    floatRight
                    marginTop
                    onClick={onHandleLogin}
                />
            </form>
            <h5>
                {accountTitle}
                <span onClick={onShowModalLogin}>{loginText}</span>
            </h5>
        </div>
    );
};

export default Login;