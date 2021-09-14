import React, { useState } from 'react';
import Button from '../common/Button';
import styles from './Register.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import axiosInstance from '../../axiosInstance'

const defaultFn = () => {}
const Register = ({
    title = '',
    accountTitle = '',
    loginText = '',
    onShowModalRegister = defaultFn,
    onCloseModal = defaultFn,
    onSubmirForm = defaultFn
}) => {
    const [user, setUser] = useState({ type: 'email', email: '', password: '', passwordConfirm: '' })
    const [errors, setErrors] = useState({})

    const handleSubmitForm = (e) => {
        e.preventDefault()
        axiosInstance
            .post('/api/auth/register', user)
            .then(res => {
                window.localStorage.setItem('token', res.meta.token)
                window.location.reload()
            })
            .catch((err) => {
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
                            password: 'Account has used please register another account'
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
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password confirmation"
                        value={user.passwordConfirm}
                        onChange={e => {
                            setUser({ ...user, passwordConfirm: e.target.value })
                            setErrors({
                                ...errors,
                                passwordConfirm: null
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
                    onClick={onSubmirForm}
                />  
            </form>
            <h5>
                {accountTitle}
                <span onClick={onShowModalRegister}>{loginText}</span>
            </h5>
        </div>
    );
};

export default Register;