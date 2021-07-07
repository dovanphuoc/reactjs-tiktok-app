import React from 'react';
import styles from './AccountPreview.module.scss'
import Button from '../common/Button'
import { HiCheckCircle } from 'react-icons/hi';

const AccountPreview = ({
    avatar = '',
    nickname = '',
    fullName = '',
    tick = false,
    voteFollow = null,
    voteLike = null,
}) => {
    return (
        <div className={styles.accountItem}>
            <div className={styles.accountInfo}>
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
                <div className={styles.voteWrap}>
                    <div className={styles.voteItem}>
                        <span className={styles.voteUser}>{voteFollow}</span>
                        <span>Follower</span>
                    </div>
                    <div className={styles.voteItem}>
                        <span className={styles.voteUser}>{voteLike}</span>
                        <span>Thích</span>
                    </div>
                </div>
            </div>
            <div className={styles.accountBtn}>
                <Button
                    children="Follow"
                    type="primary"
                    size="m"
                    color="white"
                />
            </div>
        </div>
    );
};

export default AccountPreview;