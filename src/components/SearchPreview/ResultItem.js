import React from 'react';
import styles from './SearchPreview.module.scss'
import { HiCheckCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import config from '../../config'

const ResultItem = ({
    data,
}) => {
    return (
        <Link className={styles.item}
            to={`${config.routes.home}@${data.nickname}`}
        >
            <h4 className={styles.title}>
                <span>{data.nickname}</span>
                {data.tick && (
                    <HiCheckCircle className={styles.tickIcon} />
                )}
            </h4>
            <p className={styles.description}>{data.description}</p>
        </Link>
    );
};

export default ResultItem;