import React, { useRef, useEffect, useState } from 'react';
import styles from './Follow.module.scss'
import { HiCheckCircle } from 'react-icons/hi'
import Button from '../common/Button'
import { Link } from 'react-router-dom';
import config from '../../config'
const defaultFn = () => {}

function FollowItem({
    data,
    onMouseEnter = defaultFn,
    onProfile = defaultFn
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const sectionStyle = {
        width: '100%',
        height: '304px',
        background: `url(${data.avatar})`,
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundColor:' rgba(22, 24, 35, 0.06)',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '8px',
        objectFit: 'cover',
    }
    const videoRef = useRef(null)

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
          video.ontimeupdate = null;
        };
      }, []);
    
    const handleMouseEnter = () => {
        videoRef.current.src = data.popular_post.file_url
    }

    const handleMouseLeave = () => {
        videoRef.current.src = ''
    }

    return (
        <Link className={styles.followItem}
            to={`${config.routes.home}@${data.nickname}`}
            onClick={() => onProfile(data)}
            onMouseEnter={() => onMouseEnter(data)}
        >
            <div
                className={styles.videoContainer}
                style={sectionStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <video
                    className={styles.video}
                    muted
                    loop
                    ref={videoRef}
                    itemType="video/mp4"
                >
                </video>
                <div className={styles.videoCardMask}>
                    <div className={styles.videoContent}>
                        <h5 className={styles.fullname}>{`${data.first_name} ${data.last_name}`}</h5>
                        <h6 className={styles.nickname}>
                            {data.nickname}
                            {data.tick && (
                                <HiCheckCircle className={styles.icon} />
                            )}
                        </h6>
                        <Button
                            children="Follow"
                            type="primary"
                            size="sl"
                            color="white"
                            hover
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default FollowItem;