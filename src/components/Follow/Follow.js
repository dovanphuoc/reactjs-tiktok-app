import React from 'react';
import styles from './Follow.module.scss'

const Follow = ({
    children = null
}) => {
    return (
        <div className={styles.follow}>
            {children}
        </div>
    );
};

export default Follow;