import React from 'react';
import styles from './AccountList.module.scss'
import { HiCheckCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import config from '../../../config';
import { Waypoint } from 'react-waypoint';

const AccountItem = ({
    avatar = '',
    nickname = '',
    fullName = '',
    tick = false,
    itLast = false,
    onLastEnter = () => {}
}) => {
    let Component = 'div'
    const props = {}
    if (itLast) {
        Component = Waypoint
        props.onEnter = onLastEnter
    }
    return (
        <Component
            {...props}
            className={styles.userItem}
        >
            <Link to={`${config.routes.home}@${nickname}`}>
                <div className={styles.userInner}>
                    <div className={styles.userAvatar}>
                        <img src={avatar} alt="avatar" />
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.userTitle}>
                            <span>{nickname}</span>
                            {tick && (
                                <HiCheckCircle className={styles.icon} />
                            )}
                        </p>
                        <span className={styles.fullName}>{fullName}</span>
                    </div>
                </div>
            </Link>
        </Component>
    );
};

export default AccountItem;