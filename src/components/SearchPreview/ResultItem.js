import React from 'react';
import styles from './SearchPreview.module.scss'
import { HiCheckCircle } from 'react-icons/hi'

const ResultItem = ({
    title = '',
    description = '',
    tick = false,
    onSearchItem = () => {}
}) => {
    return (
        <div className={styles.item} onClick={() => onSearchItem()}>
            <h4 className={styles.title}>
                <span>{title}</span>
                {tick && (
                    <HiCheckCircle className={styles.tickIcon} />
                )}
            </h4>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default ResultItem;