import React, { useState } from 'react';
import Button from '../common/Button';
import styles from './Register.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from 'axios'

const defaultFn = () => {}
const Register = ({
    title = '',
    accountTitle = '',
    loginText = '',
    onShowModalRegister = defaultFn,
    onCloseModal = defaultFn
}) => {
    const [user, setUser] = useState({ type: 'email', email: '', password: '', passwordConfirm: '' })
    const [errors, setErrors] = useState({})
    const handleSubmitForm = (e) => {
        e.preventDefault()
        axios.post('/api/auth/register', user)
            .then(res => {
                window.localStorage.setItem('token', res.meta.token)
                window.location.reload()
            })
            .catch((err) => {
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
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        required
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value})}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password confirmation"
                        required
                        value={user.passwordConfirm}
                        onChange={(e) => setUser({...user, passwordConfirm: e.target.value})}
                    />
                </div>
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
                <span onClick={onShowModalRegister}>{loginText}</span>
            </h5>
        </div>
    );
};

export default Register;