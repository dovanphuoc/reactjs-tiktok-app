import React, { useRef } from 'react';
import styles from './HeaderComponent.module.scss'
import { Link } from 'react-router-dom';
import config from '../../config'
import logo from '../../assets/img/logo.svg'
import { GoSearch } from 'react-icons/go'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GiMedicalPackAlt } from 'react-icons/gi'
import Button from '../common/Button'
import MenuItem from '../Popper/MenuItem'
import Popper from '../Popper'

const HeaderComponent = () => {
    const menus = useRef([
        {
            title: 'Tiếng việt',
            icon: <GiMedicalPackAlt />,
            to: '/messages/?u='
        },
    ])
    const renderMoreMenu = () => {
        return menus.current.map((menu, index) => (
            <MenuItem
                key={index}
                to={menu.to}
                icon={menu.icon}
                seperate={index === 0}
                onClick={menu.onClick}
            >
                {menu.title}
            </MenuItem>
        ))
    }

    return (
        <div className={`${styles.headerContainer} ${styles.middle}`}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <Link to={config.routes.home}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className={styles.searchContainer}>
                    <div className={styles.searchInput}>
                        <input type="text" className={styles.inputText} placeholder="Tìm kiếm tài khoản" />
                        <span className={styles.split}></span>
                        <button className={styles.searchBtn}>
                            <GoSearch className={styles.icon} />
                        </button>
                        <div className={styles.border}></div>
                    </div>
                </div>
                <div className={styles.menuRight}>
                    <Button
                        children="Tải lên"
                        type="default"
                        underline
                        color="black"
                    />
                    <Button
                        children="Đăng nhập"
                        type="primary"
                        color="white"
                        size="m"
                        marginLeft
                        hover
                    />
                    <Popper
                        interactive
                        wrapperClassname={styles.menuWrapper}
                        render={renderMoreMenu}
                        appendTo="parent"
                        placement="bottom"
                        offset={[-60, 10]}
                        minWidth={200}
                    >
                        <div className={styles.iconWrap}>
                            <BsThreeDotsVertical className={styles.icon} />
                        </div>
                    </Popper>

                </div>
            </div>
        </div>
    );
};

export default HeaderComponent;