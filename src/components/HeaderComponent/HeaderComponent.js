import React, { useRef } from 'react';
import styles from './HeaderComponent.module.scss'
import { Link } from 'react-router-dom';
import config from '../../config'
import logo from '../../assets/img/logo.svg'
import { GoSearch } from 'react-icons/go'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GiMedicalPackAlt } from 'react-icons/gi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoIosCloseCircle } from 'react-icons/io'
import Button from '../common/Button'
import MenuItem from '../Popper/MenuItem'
import Popper from '../Popper'
import SearchPreview, { ResultItem } from '../SearchPreview'
const defaultFn = () => {}
const HeaderComponent = ({
    handleChangeValue =defaultFn,
    onViewAllSearchResult =defaultFn,
    onClickResultItem = defaultFn,
    onSearchClear = defaultFn,
    onShowModal = defaultFn,
    onClickOutside = defaultFn,
    searchValue = '',
    isSearching = false,
    searchResult = []
}) => {
    const menus = useRef([
        {
            title: 'Tiếng việt',
        },
    ])
    
    const renderMoreMenu = () => {
        return menus.current.map((menu, index) => (
            <MenuItem
                key={index}
                to={menu.to}
                seperate={index === 0}
                onClick={menu.onClick}
            >
                <div className={styles.textVi}>
                    <GiMedicalPackAlt className={styles.icon} /> 
                    <span>{menu.title}</span>
                </div>
                
            </MenuItem>
        ))
    }

    const renderSearchPreview = () => {
        return (
            <SearchPreview
                searchValue={searchValue}
                onViewAll={onViewAllSearchResult}
            >
                {
                    searchResult.map(account => (
                        <ResultItem
                            key={account.id}
                            title={account.nickname}
                            description={account.description}
                            tick={account.tick}
                            onSearchItem={onClickResultItem}
                        />
                ))}
            </SearchPreview>
        )
    }

    return (
        <div className={`${styles.headerContainer} ${styles.middle}`}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <Link to={config.routes.home}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <Popper
                    interactive
                    wrapperClassname={styles.previewWrapper}
                    render={renderSearchPreview}
                    visible={searchResult.length > 0}
                    onClickOutside={onClickOutside}
                >
                    <div className={styles.searchContainer}>
                        <div className={styles.searchInput}>
                            <input
                                value={searchValue}
                                onChange={handleChangeValue}
                                type="text"
                                className={styles.inputText}
                                placeholder="Tìm kiếm tài khoản"
                            />
                            {!!searchValue && (
                                <button
                                    className={`${styles.resetInput} ${styles.clearBtn}`}
                                    onClick={isSearching ? defaultFn : onSearchClear}
                                    onMouseDown={e => e.preventDefault()}
                                >
                                    {isSearching ? (
                                        <AiOutlineLoading3Quarters className={[styles.icon, styles.spinner].join(' ')} />
                                    ) : (
                                        <IoIosCloseCircle className={styles.icon} />
                                    )}
                                </button>
                            )}
                            <span className={styles.split}></span>
                            <button className={styles.searchBtn}>
                                <GoSearch className={styles.icon} />
                            </button>
                            <div className={styles.border}></div>
                        </div>
                    </div>
                </Popper>
                <div className={styles.menuRight}>
                    <Button
                        children="Tải lên"
                        type="default"
                        underline
                        color="black"
                    />
                    <div>
                        <Button
                            children="Đăng nhập"
                            type="primary"
                            color="white"
                            size="m"
                            marginLeft
                            hover
                            onClick={onShowModal}
                        />
                    </div>
                    <Popper
                        interactive
                        wrapperClassname={styles.menuWrapper}
                        render={renderMoreMenu}
                        appendTo="parent"
                        placement="bottom"
                        offset={[-60, 10]}
                        minWidth={200}
                    >
                        <div className={styles.iconWrap}>
                            <BsThreeDotsVertical className={styles.icon} />
                        </div>
                    </Popper>
                </div>
            </div>
        </div>
    );
};

export default HeaderComponent;