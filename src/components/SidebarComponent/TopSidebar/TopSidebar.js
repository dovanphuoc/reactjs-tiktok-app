import React, { useState } from 'react';
import styles from './TopSidebar.module.scss'
import { NavLink, Link } from 'react-router-dom';
import config from '../../../config'
import { AiFillHome, AiOutlineUsergroupDelete } from 'react-icons/ai'
import { BsCameraVideo } from 'react-icons/bs'
import Button from '../../common/Button'
import Modal from 'react-modal'
import Login from '../../Login'

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
const token = window.localStorage.getItem('token')
const TopSidebar = ({
    desc = '',
}) => {
    const [MODAL, SET_MODAL] = useState(null)
    const closeModal = () => {
        SET_MODAL(null)
    }
    return (
        <div className={styles.wrapper}>
            <NavLink
                className={styles.navItem}
                to={config.routes.home}
                activeStyle={{
                    fontWeight: "700",
                    color: "#FE2C55"
                }}
            >
                <div className={styles.iconWrap}>
                    <AiFillHome className={styles.icon} />
                    <span>Dành cho bạn</span>
                </div>
            </NavLink>
            <NavLink
                className={styles.navItem}
                to={config.routes.home}
                activeStyle={{
                    fontWeight: "700",
                    color: "#161823"
                }}
            >
                <div className={styles.iconWrap}>
                    <AiOutlineUsergroupDelete className={styles.icon} />
                    <Link className={styles.followLink} to={config.routes.follow}>Đang Follow</Link>
                </div>
            </NavLink>
            {token ? (
                <NavLink
                    className={styles.navItem}
                    to={config.routes.home}
                    activeStyle={{
                        fontWeight: "700",
                        color: "#161823"
                    }}
                >
                    <div className={styles.iconWrap}>
                        <BsCameraVideo className={styles.icon} />
                        <Link className={styles.followLink} to={config.routes.follow}>Live</Link>
                    </div>
                </NavLink>
            ): (
                <></>
            )}
            <div className={styles.loginWrapper}>
                <span className={styles.desc}>{desc}</span>
                {token ? (
                    <></>
                ) : (
                    <Button
                        children="Đăng nhập"
                        border
                        type="default"
                        size="l"
                        color="colorPrimary"
                        marginTop
                        hoverPrimaryColor
                        onClick={() => SET_MODAL(LOGIN_MODAL)}
                    />
                )}
            </div>
            <Modal
                isOpen={MODAL === LOGIN_MODAL}
                style={customStyles}
            >
                <Login
                    onCloseModal={closeModal}
                    onShowModalLogin={() => SET_MODAL(LOGIN_MODAL)}
                />
            </Modal>
        </div>
    );
};

export default TopSidebar;