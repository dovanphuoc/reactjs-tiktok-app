import React, { useRef, useEffect } from 'react';
import styles from './Follow.module.scss'
import { HiCheckCircle } from 'react-icons/hi'
import Button from '../common/Button'
const defaultFn = () => {}

function FollowItem({
    data,
    isPlaying = false,
    onMouseEnter = defaultFn,
    onClick = defaultFn
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
        <div className={styles.followItem}
            onMouseEnter={() => onMouseEnter(data)}
            onClick={() => onClick(data)}
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
        </div>
    );
}

export default FollowItem;