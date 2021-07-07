import React from 'react';
import styles from './DiscoverList.module.scss'

const DiscoverItem = ({
    icon : Icon,
    tag = '',
    onClick = () => {}
}) => {
    return (
        <div className={styles.discoverItem} onClick={onClick}>
            <Icon className={styles.icon} />
            <span className={styles.itemText}>{tag}</span>
        </div>
    );
};

export default DiscoverItem;