import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { AiFillCloseCircle, AiOutlineWhatsApp, AiFillHeart, AiFillTwitterCircle } from 'react-icons/ai'
import { FaChevronCircleDown, FaChevronCircleUp, FaCommentDots, FaFacebook } from 'react-icons/fa'
import logo from '../../assets/img/logo.png'
import { Link } from 'react-router-dom';
import Button from '../common/Button'
import styles from './PostDetailModal.module.scss'

const defaultFn = () => {}
const PostDetailModal = ({
    isMuted = false,
    onCloseBtn = defaultFn,
    onToggleMute = defaultFn,
    onNextVideo = defaultFn,
    onPrevVideo = defaultFn,
    currentTime,
    data,
}) => {
    const [posts, setPosts] = useState([])

    const videoRef = useRef(null)
    const getVideoRef = (ref) => {
        if (ref) {
            videoRef.current = ref
            videoRef.current.currentTime = currentTime
            videoRef.current.play()
        }
    }

    const handlePausePlayVideo = () => {
        if (videoRef.current.paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }

    useEffect(() => {
        axios.get(`/api/posts/${data.id}/comments`)
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
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
                <img src={logo} alt="logo" className={styles.logo} />
                
                <button className={styles.btnIcon} onClick={onCloseBtn}>
                    <AiFillCloseCircle className={styles.icon} />
                </button>
                <button className={[styles.btn, styles.vlBtn].join(' ')}
                    onClick={() => onToggleMute(data)}
                >
                    <FontAwesomeIcon className={styles.vlIcon} icon={isMuted ? faVolumeMute : faVolumeUp} />
                </button>
                <div className={`${styles.downBtn} ${styles.btnChervon}`}onClick={onNextVideo}>
                    <FaChevronCircleDown className={styles.icon} />
                </div>
                <div className={`${styles.upBtn} ${styles.btnChervon}`}onClick={onPrevVideo}>
                    <FaChevronCircleUp className={styles.icon} />
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.userInfoContainer}>
                    <div className={styles.userInfo}>
                        <Link to={`/@${data.user.nickname}`}>
                            <img className={styles.avatar} src={data.user.avatar} alt="avatar" />
                        </Link>
                        <div className={styles.userInfoLink}>
                            <Link className={styles.nickname} to={`/@${data.user.nickname}`}>{data.user.nickname}</Link>
                            <Link classsName={styles.firstName} to={`/@${data.user.nickname}`}>{data.user.first_name}</Link>
                        </div>
                        <Button
                            children="Follow"
                            size="xl"
                            color="colorPrimary"
                            border
                            type="default"
                            hoverPrimaryColor
                        />
                    </div>
                </div>
                <div className={styles.videoInfoContainer}>
                    <div className={styles.actionContainer}>
                        <div classsName={styles.action} style={{display: 'flex'}}>
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
                        <div classsName={styles.actionRight}>
                            <div className={styles.shareContainer}>
                                <span>Chia sẻ với</span>
                                <div className={styles.shareGroup}>
                                    <Link to="/a" className={styles.shareLink}>
                                        <AiOutlineWhatsApp classsName={styles.iconApp} />
                                    </Link>
                                    <Link to="/a" className={styles.shareLink}>
                                        <FaFacebook classsName={styles.iconFa} />
                                    </Link>
                                    <Link to="/a" className={styles.shareLink}>
                                        <AiFillTwitterCircle classsName={styles.iconShare} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.copyLinkContainer}>
                        <div className={styles.linkContainer}>{window.location.href}</div>
                        <div className={styles.copyContainer}>Sao chép liên kết</div>
                    </div>
                </div>
                <div className={styles.commentContainer}>
                {posts.map(post => {
                    return (
                        <div className={styles.comments}>
                            <div className={styles.commentItem}>
                                <div className={styles.commentContent}>
                                    <Link to={`/@${post.user.nickname}`}>
                                        <img src={post.user.avatar} alt="avatar" />
                                    </Link>
                                    <div className={styles.commentWrap}>
                                        <Link className={styles.nicknameCmt} to={`/@${post.user.nickname}`}>{post.user.nickname}</Link>
                                        <p className={styles.commentText}>
                                            <span>{post.comment}</span>
                                            <div className={styles.bottomContainer}>
                                                <span className={styles.commentTime}>1 day ago</span>
                                                <span className={styles.reply}></span>
                                            </div>
                                        </p>
                                        <div className={styles.likeContainer}>
                                            <AiFillHeart className={styles.icon} />
                                            <span>{post.likes_count}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div className={styles.commentPostOutside}>
                    <input type="text" placeholder="Thêm bình luận..." className={styles.placeHolderInner} />
                    <button type="submit">Đăng</button>
                </div>
            </div>
        </div>
    );
};

export default PostDetailModal;