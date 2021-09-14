import React, { useRef } from 'react';
import styles from './AccountList.module.scss'
import { HiCheckCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import config from '../../../config';
import { Waypoint } from 'react-waypoint';
import userImage from '../../../assets/img/user.jpg'

const AccountItem = ({
    avatar = '',
    nickname = '',
    fullName = '',
    tick = false,
    itLast = false,
    onLastEnter = () => {}
}) => {
    const imageRef = useRef(null)
    let Component = 'div'
    const props = {}
    if (itLast) {
        Component = Waypoint
        props.onEnter = onLastEnter
    }

    const handleErrorImage = () => {
        imageRef.current.src = userImage
    }

    return (
        <Component
            {...props}
            className={styles.userItem}
        >
            <Link to={`${config.routes.home}@${nickname}`}>
                <div className={styles.userInner}>
                    <div className={styles.userAvatar}>
                        <img
                            src={avatar}
                            alt="avatar"
                            onError={handleErrorImage}
                            ref={imageRef}
                        />
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