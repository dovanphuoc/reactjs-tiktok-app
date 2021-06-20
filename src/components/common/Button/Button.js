import React from 'react';
import styles from './Button.module.scss'
import { Link } from 'react-router-dom';

const defaultFn = () => {}
const Button = ({
    color = 'black',
    type = 'primary',
    to = '',
    href = '',
    openNewTab = false,
    children = null,
    onClick = defaultFn,
    size = 'm',
    underline,
    marginLeft,
    marginTop,
    hover,
    border,
    ...restProps
}) => {
    let Component = 'button'
    const props = {}
    let classNames = [
        styles.wrapper,
        styles[type],
        styles[color],
        styles[size],
        underline ? styles.underline : '',
        marginLeft ? styles.marginLeft : '',
        hover ? styles.hover : '',
        border ? styles.border : '',
        marginTop ? styles.marginTop : ''
    ]
    if (href) {
        Component = 'a'
        props.href = href
        if (openNewTab) {
            props.target = '_blank'
        }
    }
    if (to) {
        Component = Link
        props.to = to
    }
    return (
        <Component
            {...props}
            {...restProps}
            onClick={onClick}
            className={classNames.join(' ')}
        >
            <span>{children}</span>
        </Component>
    );
};

export default Button;