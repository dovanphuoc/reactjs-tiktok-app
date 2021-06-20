import React from 'react';
import styles from './Popper.module.scss'
import { Link } from 'react-router-dom';

const MenuItem = ({
    to = '',
    icon = null,
    children,
    onClick = () => {},
}) => {
    let Component = 'div'
    const props = {}
    if (to) {
        Component = Link
        props.to = to
    }
    return (
        <Component
            {...props}
            onClick={onClick}
            className={[styles.menuItem].join(' ')}
        >
            {icon && (
                <span className={styles.icon}>{icon}</span>
            )}
            <span>{children}</span>
        </Component>
    );
};

export default MenuItem;