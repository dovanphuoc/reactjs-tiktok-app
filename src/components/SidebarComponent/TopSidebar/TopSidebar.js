import React from 'react';
import styles from './TopSidebar.module.scss'
import { NavLink } from 'react-router-dom';
import config from '../../../config'
import { AiFillHome, AiOutlineUsergroupDelete } from 'react-icons/ai'
import Button from '../../common/Button'

const TopSidebar = ({
    desc = ''
}) => {
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
                    <span>Đang Follow</span>
                </div>
            </NavLink>
            <div className={styles.loginWrapper}>
                <span className={styles.desc}>{desc}</span>
                <Button
                    children="Đăng nhập"
                    border
                    type="default"
                    size="l"
                    color="colorPrimary"
                    marginTop
                    hoverPrimaryColor
                />
            </div>
        </div>
    );
};

export default TopSidebar;