import React, { useRef, useEffect } from 'react';
import styles from './Follow.module.scss'
import { HiCheckCircle } from 'react-icons/hi'
import Button from '../common/Button'
import { Link } from 'react-router-dom';
import config from '../../config'
const defaultFn = () => {}

function FollowItem({
    data,
    isPlaying = false,
    onMouseEnter = defaultFn,
    onProfile = defaultFn
}) {
    const videoRef = useRef(null)
    useEffect(() => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    },[isPlaying])
    return (
        <Link className={styles.followItem}
            to={`${config.routes.home}@${data.nickname}`}
            onClick={() => onProfile(data)}
            onMouseEnter={() => onMouseEnter(data)}
        >
            <div className={styles.videoContainer}>
                <video
                    className={styles.video}
                    muted
                    loop
                    src={data.popular_post.file_url}
                    poster={data.popular_post.thumb_url}
                    ref={videoRef}
                />
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
        </Link>
    );
}

export default FollowItem;