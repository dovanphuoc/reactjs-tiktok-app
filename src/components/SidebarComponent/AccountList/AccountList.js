import React from 'react';
import styles from './AccountList.module.scss'
import { BiChevronDown } from 'react-icons/bi'

const defaultFn = () => {}
const AccountList = ({
    heading = '',
    expandedTitle = 'See all',
    collapseTitle = 'See less',
    collapsedHeight = 'initial',
    children = null,
    isExpanded = false,
    hideSeeBtn = false,
    onSeeToggle = defaultFn
}) => {
    return (
        <div className={styles.accountList}>
            <h4 className={styles.heading}>{heading}</h4>
            <div
                className={styles.inner}
                style={{ maxHeight: collapsedHeight }}
            >
                {children}
            </div>
            {!hideSeeBtn && (
                <div className={styles.seeBtn} onClick={onSeeToggle}>
                    <span>{isExpanded ? collapseTitle : expandedTitle}</span>
                    <BiChevronDown className={styles.icon} />
                </div>
            )}
        </div>
    );
};

export default AccountList;