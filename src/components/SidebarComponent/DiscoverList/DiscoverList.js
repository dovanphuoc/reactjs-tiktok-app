import React from 'react';
import styles from './DiscoverList.module.scss'

const DiscoverList = ({
    title = '',
    children = null
}) => {
    return (
        <div className={styles.discover}>
            <h4 className={styles.discoverTitle}>{title}</h4>
            {children}
        </div>
    );
};

export default DiscoverList;