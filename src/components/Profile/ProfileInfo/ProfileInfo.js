import React from 'react';
import styles from './ProfileInfo.module.scss'
import { AiFillCheckCircle } from 'react-icons/ai'
import Button from '../../../components/common/Button'

const FollowUserInfo = ({
    data,
    tick = false
}) => {
    return (
        <div className={styles.shareHeader}>
            <div className={styles.shareInfo}>
                <div className={styles.image}>
                    <img src={data.avatar} className={styles.thumb} alt="profile" />
                </div>
                <div className={styles.title}>
                    <div className={styles.shareTitle}>
                        {data.nickname}
                        {tick && (
                            <AiFillCheckCircle className={styles.icon} />
                        )}
                    </div>
                    <div className={styles.subTitle}>{`${data.first_name} ${data.last_name}`}</div>
                    <div className={styles.shareFollow}>
                        <Button
                            children="Follow"
                            size="ssl"
                            color="white"
                            type="primary"
                            marginTop
                            hover
                        />                        
                    </div>
                </div>
            </div>
            <div className={styles.countInfo}>
                <div className={styles.countItem}>
                    <strong>{data.followings_count}</strong>
                    <span>Đang follow</span>
                </div>
                <div className={styles.countItem}>
                    <strong>{data.followers_count}</strong>
                    <span>Follower</span>
                </div>
                <div className={styles.countItem}>
                    <strong>{data.likes_count}</strong>
                    <span>Thích</span>
                </div>
            </div>
            <p className={styles.desc}>{data.bio}</p>
        </div>
    );
};

export default FollowUserInfo;