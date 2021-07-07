import React from 'react';
import styles from './SidebarComponent.module.scss'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import 'overlayscrollbars/css/OverlayScrollbars.css';

const SidebarComponent = ({children = null}) => {
    return (
        <OverlayScrollbarsComponent
            className={styles.wrapper}
            options={{
                scrollbars: {
                    autoHide: 'leave',
                    autoHideDelay: 0,
                }
            }}
            style={{
                position: 'fixed',
                top: '0px',
                width: '360px',
            }}

        >
            {children}
        </OverlayScrollbarsComponent>
    );
};

export default SidebarComponent;