import React, { useRef, useEffect, useState } from 'react';
import styles from './ProfileVideo.module.scss'
import { BsPlay } from 'react-icons/bs'

const defaultFn = () => {}
const ProfileVideo = ({
    data,
    isMuted = false,
    onMouseEnter = defaultFn,
}) => {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        const video = videoRef.current;
        video.oncanplay = () => {
          setIsPlaying(!isPlaying);
          video.play();
        };
    
        video.onplay = () => {
          setIsPlaying(!isPlaying);
        };
    
        video.onpause = () => {
          setIsPlaying(false);
        };

        return () => {
          video.oncanplaythrough = null;
          video.onplay = null;
          video.onpause = null;
        };
      }, []);

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

    const handleMouseEnter = () => {
        videoRef.current.src = data.file_url
    }

    const handleMouseLeave = () => {
        videoRef.current.src = ''
    }
    return (
        <div className={styles.videoItem}
            onMouseEnter={() => onMouseEnter(data)}
        >
            <div className={styles.ratio}>
                <div style={{ paddingTop: '132.653%' }}>
                    <div className={styles.ratioWrapper}>
                        <div style={cardStyles}>
                            <div
                                className={styles.videoCardDefault}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <video
                                    className={styles.video}
                                    loop
                                    muted={isMuted}
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