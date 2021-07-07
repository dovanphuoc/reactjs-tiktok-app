import React from 'react';
import styles from './Footer.module.scss'

const Footer = ({
    children = null
}) => {
    return (
        <div className={styles.footer}>
            {children}
        </div>
    );
};

export default Footer;