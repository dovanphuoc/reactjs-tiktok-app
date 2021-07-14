import React, { useState } from 'react';
import Button from '../common/Button';
import styles from './Login.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from 'axios'

const defaultFn = () => {}
const Login = ({
    title = '',
    accountTitle = '',
    loginText = '',
    onShowModalLogin = defaultFn,
    onCloseModal = defaultFn,
}) => {
    const [user, setUser] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const handleSubmitForm = (e) => {
        e.preventDefault()
        axios.post('/api/auth/login', user)
            .then(res => {
                window.localStorage.setItem('token', res.data.token)
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>{title}</h3>
            <button className={styles.btnClose} onClick={onCloseModal}>
                <AiFillCloseCircle className={styles.icon} />
            </button>
            <form onSubmit={handleSubmitForm}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    value={user.email}
                    onChange={e => {
                        setUser({ ...user, email: e.target.value })
                    }}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                    value={user.password}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }}
                />
                <Button
                    children="Submit"
                    type="primary"
                    size="m"
                    color="white"
                    floatRight
                    marginTop
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