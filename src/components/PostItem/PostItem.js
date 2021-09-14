import React, { useRef, useState, useEffect } from 'react';
import styles from './PostItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import config from '../../config';
import Button from '../common/Button';
import { AiFillHeart } from 'react-icons/ai'
import { FaCommentDots, FaShare } from 'react-icons/fa'
import Modal from 'react-modal'
import Login from '../Login'
import { Waypoint } from 'react-waypoint'
import userImage from '../../assets/img/user.jpg'

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
const token = window.localStorage.getItem('token')
const LOGIN_MODAL = 'LOGIN_MODAL'
const defaultFn = () => {}
const PostItem = ({
    data = '',
    hastag = '',
    isMuted = false,
    isPlaying = false,
    stopWhenPaused = false,
    isWaypoint = false,
    onShowDetail = defaultFn,
    onFollowUser = defaultFn,
    onToggleMute = defaultFn,
    getVideoRef = defaultFn,
    onTogglePlay = defaultFn,
    onEnterWaypoint = defaultFn,
    onLikeCount = defaultFn,
    onCommentCount = defaultFn,
}) => {
    const [MODAL, SET_MODAL] = useState(null)
    const videoRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        if (!videoRef.current) return
        if (isPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
            if (stopWhenPaused) {
                videoRef.current.currentTime = 0
            }
        }
    }, [isPlaying, stopWhenPaused])

    const handleShowModalLogin = () => {
        SET_MODAL(LOGIN_MODAL)
    }
    const closeModal = () => {
        SET_MODAL(null)
    }
    const getVideoWidth = () => {
        const videoWidth = data.meta.video.resolution_x
        const videoHeight = data.meta.video.resolution_y
        const videoRatio = videoWidth / videoHeight
        if (videoWidth > videoHeight) {
            return `calc(400px + ((100vw - 768px) / 1152) * 100)`
        } return `calc(${videoRatio} * (400px + ((100vw - 768px) / 1152) * 100))`
    }

    const topOffsetVideo = () => {
        return (window.innerHeight - 60) / 3
    }

    const bottomOffsetVideo = () => {
        return (window.innerHeight - 60) / 3
    }

    const handleErrorImage = () => {
        imageRef.current.src = userImage
    }

    return (
        <div className={styles.postItem}>
            <Link to={`${config.routes.home}@${data.user.first_name} ${data.user.last_name}`} className={styles.userAvatar}>
                <img
                    src={data.user.avatar}
                    alt={data.user.nickname}
                    className={styles.avatarImg}
                    onError={handleErrorImage}
                    ref={imageRef}
                />
            </Link>
            <div className={styles.postContent}>
                <div className={styles.infoContent}>
                    <Link to={`${config.routes.home}@${data.user.first_name} ${data.user.last_name}`} rel="noopener">
                        <h3 className={styles.authorUnique}>{data.user.nickname}</h3>
                    </Link>
                    <Link to={`${config.routes.home}${data.user.first_name} ${data.user.last_name}`} rel="noopener">
                        <h4 className={styles.fullName}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                    </Link>
                </div>
                <div className={styles.caption}>
                    <Link to={`${config.routes.home}${data.user.first_name} ${data.user.last_name}`} rel="noopener">
                        <strong>{hastag}</strong>
                    </Link>
                    <strong>{data.description}</strong>
                </div>
                {token ? (
                    <div className={styles.btnFollow}>
                        <Button
                            border
                            color="colorPrimary"
                            size="sm"
                            type="default"
                            hoverPrimaryColor
                            textCenter
                            onClick={() => onFollowUser(data)}
                            actived={data.user.is_followed}
                        >
                            <span>{data.user.is_followed ? 'Đang follow' : 'Follow'}</span>
                        </Button>
                    </div>
                ) : (
                    <div className={styles.btnFollow}>
                        <Button
                            border
                            color="colorPrimary"
                            size="sm"
                            type="default"
                            hoverPrimaryColor
                            textCenter
                            onClick={() => SET_MODAL(LOGIN_MODAL)}
                        >
                            <span>Follow</span>
                        </Button>
                    </div>
                )}
                
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
                            {isWaypoint && (
                                <Waypoint
                                    onEnter={() => onEnterWaypoint(data)}
                                    topOffset={topOffsetVideo()}
                                    bottomOffset={bottomOffsetVideo()}
                                >
                                    <video
                                        style={{ width: getVideoWidth() }}
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
                                </Waypoint>
                            )}
                            <span className={styles.overlay} />
                            <button className={[styles.btn, styles.playBtn].join(' ')}
                                onClick={() => onTogglePlay(data)}
                            >
                                <FontAwesomeIcon className={styles.playIcon} icon={isPlaying ? faPause : faPlay} />
                            </button>
                            <button className={[styles.btn, styles.vlBtn].join(' ')}
                                onClick={() => onToggleMute(data)}
                            >
                                <FontAwesomeIcon className={styles.vlIcon} icon={isMuted ? faVolumeMute : faVolumeUp} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.iconAction}>
                <div className={styles.itemWrapper}>
                    <div className={styles.barItem} onClick={() => onLikeCount(data)}>
                        <AiFillHeart className={`${styles.icon} ${data.is_liked ? styles.likeIcon : ''}`} />
                    </div>
                    <strong>{data.likes_count}</strong>
                </div>

                <div className={styles.itemWrapper}>
                    <div className={styles.barItem} onClick={() => onCommentCount(data)}>
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
            
        </div>
    );
};

export default PostItem;