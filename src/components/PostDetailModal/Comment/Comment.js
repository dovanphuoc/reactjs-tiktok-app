import React, { useState } from 'react';
import styles from './Comment.module.scss'
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai'

const defaultFn = () => {}
const Comment = ({
    comment,
    onSubmit = defaultFn
}) => {
    const [valueInput, setValueInput] = useState('')

    const handleChangeValueInput = e => {
        setValueInput(e.target.value)
    }
    return (
        <>
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
                    onChange={handleChangeValueInput}
                />
                <button type="submit" onClick={onSubmit}>Đăng</button>
            </div>
        </>
    );
};

export default Comment;