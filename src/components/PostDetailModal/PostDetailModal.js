import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './PostDetailModal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { AiFillCloseCircle, AiFillHeart } from 'react-icons/ai'
import { FaAngleDown, FaAngleUp, FaCommentDots, FaPlay } from 'react-icons/fa'
import logo from '../../assets/img/logo.png'
import Button from '../../components/common/Button'
import Modal from 'react-modal'
import Login from '../Login'
import userImage from '../../assets/img/user.jpg'
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon
} from 'react-share'

const defaultFn = () => {}
const PostDetailModal = ({
    isMuted = false,
    onCloseBtn = defaultFn,
    onToggleMute = defaultFn,
    onNextVideo = defaultFn,
    onPrevVideo = defaultFn,
    onSubmit = defaultFn,
    onChangeValue = defaultFn,
    data,
    comment,
    valueInput,
}) => {
    const { videoId } = useParams()
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
    const [MODAL, SET_MODAL] = useState(null)
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const imageRef = useRef(null)
    const getVideoRef = (ref) => {
        if (ref) {
            videoRef.current = ref
            videoRef.current.ontimeupdate = function () {
                const getTime = videoRef.current.currentTime
                setCurrentTime(getTime)
            }
        }
    }

    const handlePausePlayVideo = () => {
        if (videoRef.current.paused) {
            videoRef.current.currentTime = currentTime
            videoRef.current.play()
            setIsPlaying(!isPlaying)
        } else {
            videoRef.current.pause()
            setIsPlaying(true)
        }
    }

    const handlePlayVideo = () => {
        videoRef.current.play()
        setIsPlaying(!isPlaying)
    }

    const handleErrorImage = () => {
        imageRef.current.src = userImage
    }

    return (
        <>
            <div className={styles.videoFixed}>
                <div className={styles.videoContainer}>
                    <div className={styles.thumbnail}>
                        <img src={data.thumb_url} alt="anh video" className={styles.image} />
                    </div>
                    <video
                        ref={getVideoRef}
                        className={styles.video}
                        src={data.file_url}
                        muted={isMuted}
                        loop
                        poster={data.thumb_url}
                        autoPlay
                        onClick={handlePausePlayVideo}
                    />
                    {isPlaying ? (
                        <button className={styles.btnPlay} onClick={handlePlayVideo}>
                            <FaPlay className={styles.playIcon} />
                        </button>
                    ) : ''}
                    <img src={logo} alt="logo" className={styles.logo} />
                    
                    <button className={styles.btnIcon} onClick={onCloseBtn}>
                        <AiFillCloseCircle className={styles.icon} />
                    </button>
                    <button className={[styles.btn, styles.vlBtn].join(' ')}
                        onClick={() => onToggleMute(data)}
                    >
                        <FontAwesomeIcon className={styles.vlIcon} icon={isMuted ? faVolumeMute : faVolumeUp} />
                    </button>
                    <div className={`${styles.downBtn} ${styles.btnChervon}`} onClick={onNextVideo}>
                        <FaAngleDown className={`${styles.icon} ${styles.iconDown}`} />
                    </div>
                    <div className={`${styles.upBtn} ${styles.btnChervon}`} onClick={onPrevVideo}>
                        <FaAngleUp className={`${styles.icon} ${styles.iconUp}`} />
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.userInfoContainer}>
                        <div className={styles.userInfo}>
                            <div to={`/@${data.user.nickname}`}>
                                <img
                                    className={styles.avatar}
                                    src={data.user.avatar}
                                    alt="avatar"
                                    onError={handleErrorImage}
                                    ref={imageRef}
                                />
                            </div>
                            <div className={styles.userInfoLink}>
                                <Link className={styles.nickname} to={`/@${data.user.nickname}`}>{data.user.nickname}</Link>
                                <Link className={styles.firstName} to={`/@${data.user.nickname}`}>{data.user.first_name}</Link>
                            </div>
                            <Button
                                children="Follow"
                                size="xl"
                                color="colorPrimary"
                                border
                                type="default"
                                hoverPrimaryColor
                                onClick={() => SET_MODAL(LOGIN_MODAL)}
                            />
                            <Modal
                                isOpen={MODAL === LOGIN_MODAL}
                                style={customStyles}
                            >
                                <Login
                                    onCloseModal={() => SET_MODAL(null)}
                                    onShowModalLogin={() => SET_MODAL(LOGIN_MODAL)}
                                />
                            </Modal>
                        </div>
                    </div>
                    <div className={styles.videoInfoContainer}>
                        <div className={styles.actionContainer}>
                            <div className={styles.action} style={{display: 'flex'}}>
                                <div className={styles.actionItem}>
                                    <div className={styles.iconWrap}>
                                        <AiFillHeart className={styles.icon} />
                                    </div>
                                    <span className={styles.votes}>{data.likes_count}</span>
                                </div>
                                <div className={styles.actionItem}>
                                    <div className={styles.iconWrap}>
                                        <FaCommentDots className={styles.icon} />
                                    </div>
                                    <span className={styles.votes}>{data.comments_count}</span>
                                </div>
                            </div>
                            <div className={styles.actionRight}>
                                <div className={styles.shareContainer}>
                                    <span>Chia sẻ với</span>
                                    <div className={styles.shareGroup}>
                                        <WhatsappShareButton
                                            className={styles.shareBtn}
                                            url={`http://www.facebook.com/sharer.php?u=${window.location.href}`}
                                        >
                                            <WhatsappIcon className={styles.iconFa} size={32} round/>
                                        </WhatsappShareButton>
                                        <FacebookShareButton
                                            className={styles.shareBtn}
                                            url={`http://www.facebook.com/sharer.php?u=${window.location.href}`}
                                        >
                                            <FacebookIcon className={styles.iconFa} size={32} round/>
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            url={`http://www.facebook.com/sharer.php?u=${window.location.href}`}
                                        >
                                            <TwitterIcon className={styles.iconFa} size={32} round/>
                                        </TwitterShareButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.copyLinkContainer}>
                            <div className={styles.linkContainer}>{window.location.href}</div>
                            <div className={styles.copyContainer}>Sao chép liên kết</div>
                        </div>
                    </div>
                    {/* <>
                        <div className={styles.commentContainer}>
                            <div className={styles.comments}>
                                <div className={styles.commentItem}>
                                    <div className={styles.commentContent}>
                                        <Link to={`/@${comment.user.nickname}`}>
                                            <img src={comment.user.avatar} alt="avatar" />
                                        </Link>
                                        <div className={styles.commentWrap}>
                                            <Link className={styles.nicknameCmt} to={`/@${comment.user.nickname}`}>{comment.user.nickname}</Link>
                                            <p className={styles.commentText}>
                                                <span>{comment.comment}</span>
                                                <div className={styles.bottomContainer}>
                                                    <span className={styles.commentTime}>1 day ago</span>
                                                    <span className={styles.reply}>ewtetet</span>
                                                </div>
                                            </p>
                                            <div className={styles.likeContainer}>
                                                <AiFillHeart className={styles.icon} />
                                                <span>{comment.likes_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.commentPostOutside}>
                            <input
                                type="text"
                                placeholder="Thêm bình luận..."
                                className={styles.placeHolderInner}
                                value={valueInput}
                                onChange={onChangeValue}
                            />
                            <button type="submit" onClick={onSubmit}>Đăng</button>
                        </div>
                    </> */}
                </div>
            </div>
        </>
    );
};

export default PostDetailModal;