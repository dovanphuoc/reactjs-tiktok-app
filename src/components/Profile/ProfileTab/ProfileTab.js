import React from 'react';
import styles from './ProfileTab.module.scss'
import { BsFillLockFill } from 'react-icons/bs'

const FollowUserVideo = () => {
    return (
        <div className={styles.main}>
            <div className={styles.videoFeedTab}>
                <div className={`${styles.tabVideo}`}>Video</div>
                <div className={`${styles.tabLike}`}>
                    <BsFillLockFill className={styles.icon} />
                    <span>Đã thích</span>
                </div>
                <div className={`${styles.bottomLine} ${styles.active}`}></div>
            </div>
        </div>
    );
};

export default FollowUserVideo;