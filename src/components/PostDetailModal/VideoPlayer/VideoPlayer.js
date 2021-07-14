import React from 'react';
import styles from './PostDetail.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import logo from '../../../assets/img/logo.svg'

const defaultFn = () => {}
const VideoPlayer = ({
    data,
    isMuted = false,
    getVideoRef = defaultFn
}) => {
    return (
        <div className={styles.videoContainer}>
            <div className={styles.thumbnail}>
                <img src={data.thumb_url} alt="anh video" />
            </div>
            <div className={styles.videoCardImage}>
                <video
                    ref={getVideoRef}
                    className={styles.video}
                    src={data.file_url}
                    muted={isMuted}
                    loop
                />
                <AiFillCloseCircle className={styles.icon} />
                <img src={logo} alt="logo" />
            </div>
        </div>
    );
};

export default VideoPlayer;