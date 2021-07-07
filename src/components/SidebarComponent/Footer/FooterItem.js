import React from 'react';
import styles from './Footer.module.scss'
import { Link } from 'react-router-dom';
import config from '../../../config'

const FooterItem = ({
    tag = '',
}) => {
    return (
        <div className={styles.footerItem}>
            <Link to={config.routes.home} className={styles.pageLink} >
                {tag}
            </Link>
        </div>
    );
};

export default FooterItem;