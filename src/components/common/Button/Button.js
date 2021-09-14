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
    onFollowUser = defaultFn,
    size = 'm',
    underline,
    marginLeft,
    marginTop,
    hover,
    border,
    hoverPrimaryColor,
    floatRight,
    textCenter,
    actived,
    ...restProps
}) => {
    let Component = 'button'
    const rests = {}
    let classNames = [
        styles.wrapper,
        styles[type],
        styles[color],
        styles[size],
        underline ? styles.underline : '',
        marginLeft ? styles.marginLeft : '',
        hover ? styles.hover : '',
        border ? styles.border : '',
        marginTop ? styles.marginTop : '',
        hoverPrimaryColor ? styles.hoverPrimaryColor : '',
        textCenter ? styles.textCenter : '',
        floatRight ? styles.floatRight : '',
        actived ? styles.actived : ''
    ]
    if (href) {
        Component = 'a'
        rests.href = href
        if (openNewTab) {
            rests.target = '_blank'
        }
    }
    if (to) {
        Component = Link
        rests.to = to
    }
    return (
        <Component
            {...rests}
            {...restProps}
            onClick={onClick}
            className={classNames.join(' ')}
        >
            <span>{children}</span>
        </Component>
    );
};

export default Button;