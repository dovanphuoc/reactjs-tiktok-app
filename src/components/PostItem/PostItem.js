import React, { useRef, useState } from 'react';
import styles from './PostItem.module.scss'
import { Link } from 'react-router-dom';
import config from '../../config';
import Button from '../common/Button';
import { RiVolumeMuteFill } from 'react-icons/ri'
import { GiPauseButton } from 'react-icons/gi'
import { AiFillHeart } from 'react-icons/ai'
import { FaCommentDots, FaShare } from 'react-icons/fa'
import Modal from 'react-modal'
import Login from '../Login'
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
const defaultFn = () => {}
const PostItem = ({
    data = '',
    hastag = '',
    isMuted = false,
    onShowDetail = defaultFn,
    onTogglePlay = defaultFn,
    onToggleMute = defaultFn,
    onVolume = defaultFn,
    getVideoRef = defaultFn,
}) => {
    const [MODAL, SET_MODAL] = useState(null)
    const videoRef = useRef(null)
    const handleShowModalLogin = () => {
        SET_MODAL(LOGIN_MODAL)
    }
    const closeModal = () => {
        SET_MODAL(null)
    }
    return (
        <div className={styles.postItem}>
            <Link to={`${config.routes.home}@${data.user.first_name} ${data.user.last_name}`} className={styles.userAvatar}>
                <img src={data.user.avatar} alt={data.user.nickname} className={styles.avatarImg} />
            </Link>
            <div className={styles.postContent}>
                <div className={styles.infoContent}>
                    <Link to={`${config.routes.home}@${data.user.first_name} ${data.user.last_name}`} rel="noopener">
                        <h3 className={styles.authorUnique}>{data.user.nickname}</h3>
                    </Link>
                    <Link to={`${config.routes.home}/${data.user.first_name} ${data.user.last_name}`} rel="noopener">
                        <h4 className={styles.fullName}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                    </Link>
                </div>
                <div className={styles.caption}>
                    <Link to={`${config.routes.home}/${data.user.first_name} ${data.user.last_name}`} rel="noopener">
                        <strong>{hastag}</strong>
                    </Link>
                    <strong>{data.description}</strong>
                </div>
                <div className={styles.btnFollow}>
                    <Button
                        children="Follow"
                        border
                        color="colorPrimary"
                        size="sm"
                        type="default"
                        hoverPrimaryColor
                        textCenter
                        onClick={() => SET_MODAL(LOGIN_MODAL)}
                    />
                </div>
                <Modal
                    isOpen={MODAL === LOGIN_MODAL}
                    style={customStyles}
                >
                    <Login
                        onCloseModal={closeModal}
                        onShowModalLogin={handleShowModalLogin}
                    />
                </Modal>
                <div className={styles.videoItem}>
                    <div className={styles.cardWrapper}>
                        <div className={styles.cardImage}>
                            <div className={styles.videoCard}>
                                <video
                                    className={styles.video}
                                    loop
                                    muted={isMuted}
                                    autoPlay
                                    ref={ref => {
                                        videoRef.current = ref
                                        getVideoRef(ref, data)
                                    }}
                                    poster={data.thumb_url}
                                    src={data.file_url}
                                    onClick={() => onShowDetail(data)}
                                    
                                />
                                <span className={styles.overlay} />
                                <div className={styles.muteIcon} onClick={() => onVolume(data)}>
                                    <RiVolumeMuteFill className={styles.icon} />
                                </div>
                                <div className={styles.toggleIcon} onClick={() => onToggleMute(data)}>
                                    <GiPauseButton className={styles.icon} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.iconAction}>
                <div className={styles.itemWrapper}>
                    <div className={styles.barItem}>
                        <AiFillHeart className={styles.icon} />
                    </div>
                    <strong>{data.likes_count}</strong>
                </div>

                <div className={styles.itemWrapper}>
                    <div className={styles.barItem}>
                        <FaCommentDots className={styles.icon} />
                    </div>
                    <strong>{data.comments_count}</strong>
                </div>

                <div className={styles.itemWrapper}>
                    <div className={styles.barItem}>
                        <FaShare className={styles.icon} />
                    </div>
                    <strong>{data.shares_count}</strong>
                </div>
            </div>
        </div>
    );
};

export default PostItem;