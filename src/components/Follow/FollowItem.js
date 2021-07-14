import React from 'react';
import styles from './Follow.module.scss'
import { Link } from 'react-router-dom';
import { AiFillCheckCircle } from 'react-icons/ai'
import Button from '../common/Button'

const FollowItem = ({
    nickname = '',
    avatar = '',
    fullName = '',
    tick = false
}) => {
    return (
        <div className={styles.followItem}>
            <Link to={`/${nickname}`}>
                <div className={styles.videoCard}>
                    <div className={styles.videoCardDefault}>
                        <div className={styles.videoCardMask}>
                            <div className={`${styles.cardFooter} ${styles.followFooter}`}>
                                <img className={styles.avatar} src={avatar} alt="avatar" />
                            </div>
                            <h5 className={styles.nickname}>{fullName}</h5>
                            <h6 className={styles.nickname}>
                                {nickname}
                                {tick && (
                                    <AiFillCheckCircle className={styles.icon} />
                                )}
                            </h6>
                            <Button
                                children="Follow"
                                type="primary"
                                size="m"
                                color="white"
                                hoverPrimaryColor
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default FollowItem;