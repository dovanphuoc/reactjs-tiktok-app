import React, { useRef, useEffect } from 'react';
import styles from './ProfileVideo.module.scss'
import { BsPlay } from 'react-icons/bs'

const defaultFn = () => {}
const ProfileVideo = ({
    data,
    isMuted = false,
    onMouseEnter = defaultFn,
    onShowDetail = defaultFn,
    showDetail = false,
    isPlaying = false
}) => {
    const videoRef = useRef(null)

    useEffect(() => {
        if (!videoRef.current) return
        if (isPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    },[isPlaying])

    const cardStyles = {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(22, 24, 35, 0.06)',
        cursor: 'pointer',
        overflow: 'hidden',
        background: `url(${data.thumb_url})`
    }
    return (
        <div className={styles.videoItem}
            onMouseEnter={() => onMouseEnter(data)}
            onClick={() => onShowDetail(data)}
        >
            <div className={styles.ratio}>
                <div style={{ paddingTop: '132.653%' }}>
                    <div className={styles.ratioWrapper}>
                        <div style={cardStyles}>
                            <div className={styles.videoCardDefault}>
                                <video
                                    className={styles.video}
                                    src={data.file_url}
                                    loop
                                    muted={isMuted}
                                    poster={data.thumb_url}
                                    ref={videoRef}
                                />
                                <div className={styles.videoCardMask}>
                                    <div className={`${styles.cardFooter} ${styles.noAvatar}`}>
                                        <BsPlay className={styles.icon} />
                                        <span>{data.likes_count}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileVideo;