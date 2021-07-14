import React, { useState } from 'react';
import HeaderComponent from '../../components/HeaderComponent'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from '../../config'
import { useDebounce } from '../../hooks'
import Modal from 'react-modal'
import Login from '../../components/Login'
import Register from '../../components/Register'
const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    },
};
const LOGIN_MODAL = 'LOGIN_MODAL'
const REGISTER_MODAL = 'REGISTER_MODAL'
const Header = () => {
    const [valueInput, setValueInput] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [MODAL, SET_MODAL] = useState(null)
    const history = useHistory()
    const changeValueInput = (e) => {
        setValueInput(e.target.value)
    }
    const handleClearResult = () => {
        setValueInput('')
    }
    const handleViewAllSearchResult = () => {
        history.push(`${config.routes.search}?q=${searchResult}`)
        setSearchResult([])
    }
    const openModal = () => {
        SET_MODAL(LOGIN_MODAL)
    }
    const closeModal = () => {
        SET_MODAL(null)
    }
    const handleClickOutside = () => {
        setSearchResult([])
    }
    useDebounce(() => {
        if (!valueInput)
            return setSearchResult([])
        axios.get(`/api/users/search?q=${valueInput}&type=less&page=1`)
            .then(res => {
                setSearchResult(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, 800, [valueInput])

    return (
        <>
            <HeaderComponent    
                searchValue={valueInput}
                handleChangeValue={changeValueInput}
                onViewAllSearchResult={handleViewAllSearchResult}
                searchResult={searchResult}
                onSearchClear={handleClearResult}
                onShowModal={openModal}
                onClickOutside={handleClickOutside}
            />
            <Modal
                isOpen={MODAL === LOGIN_MODAL}
                style={customStyles}
            >
                <Login
                    title="Logout to Tiktok"
                    accountTitle="Bạn đã có tài khoản"
                    loginText="Đăng nhập"
                    onShowModalLogin={() => SET_MODAL(REGISTER_MODAL)}
                    onCloseModal={closeModal}
                />
            </Modal>
            <Modal
                isOpen={MODAL === REGISTER_MODAL}
                style={customStyles}
            >
                <Register
                    title="Login to Tiktok"
                    accountTitle="Bạn không có tài khoản"
                    loginText="Đăng ký"
                    onShowModalRegister={() => SET_MODAL(LOGIN_MODAL)}
                    onCloseModal={closeModal}
                />
            </Modal>
        </>
    );
};

export default Header;