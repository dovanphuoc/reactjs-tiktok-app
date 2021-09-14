import React, { useRef, useState } from 'react';
import styles from './HeaderComponent.module.scss'
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg'
import { GoSearch } from 'react-icons/go'
import { BsThreeDotsVertical, BsCloudUpload } from 'react-icons/bs'
import { GiMedicalPackAlt } from 'react-icons/gi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoIosCloseCircle } from 'react-icons/io'
import { FiSend } from 'react-icons/fi'
import { BiCommentMinus } from 'react-icons/bi'
import Button from '../common/Button'
import Popper, { MenuItem } from '../Popper'
import SearchPreview, { ResultItem } from '../SearchPreview'
import Modal from 'react-modal'
import Login from '../Login'
import Tooltip from '../Tooltip';
import config from '../../config';

const LOGIN_MODAL = 'LOGIN_MODAL'
const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    },
};
const defaultFn = () => {}
const HeaderComponent = ({
    handleChangeValue =defaultFn,
    onViewAllSearchResult =defaultFn,
    onSearchClear = defaultFn,
    onShowModal = defaultFn,
    onClickOutside = defaultFn,
    searchValue = '',
    isSearching = false,
    searchResult = []
}) => {
    const token = window.localStorage.getItem('token')
    const [MODAL, SET_MODAL] = useState(null)
    const menus = useRef([
        {
            title: 'Tiếng việt',
        },
    ])

    const handleLogOut = () => {
        window.localStorage.removeItem('token')
        window.location.reload()
    }
    
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
                            data={account}
                        />
                ))}
            </SearchPreview>
        )
    }

    return (
        <div className={`${styles.headerContainer} ${styles.middle}`}>
            <div className={styles.headerContent}>
                <Link to={config.routes.home}>
                    <img src={logo} alt="logo" />
                </Link>
                <Popper
                    interactive
                    wrapperClassname={styles.previewWrapper}
                    render={renderSearchPreview}
                    visible={searchResult.length > 0}
                    onClickOutside={onClickOutside}
                    minHeight={250}
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
                    {token ? (
                        <>
                            <Tooltip                                
                                appendTo="parent"
                                placement="bottom"
                                content="Tải video lên"
                            >
                                <div className={`${styles.uploadWrapper} ${styles.iconUser}`}>
                                    <BsCloudUpload className={styles.icon} />
                                </div>
                            </Tooltip>

                            <Tooltip                                
                                appendTo="parent"
                                placement="bottom"
                                content="Tin nhắn"
                            >
                                <div className={`${styles.sendMessage} ${styles.iconUser}`}>
                                    <FiSend className={styles.icon} />
                                </div>
                            </Tooltip>

                            <Tooltip                                
                                appendTo="parent"
                                placement="bottom"
                                content="Hộp thư"
                            >
                                <div className={`${styles.chatMessage} ${styles.iconUser}`}>
                                    <BiCommentMinus className={styles.icon} />
                                </div>
                            </Tooltip>
                            
                            <Button
                                children="Đăng xuất"
                                type="primary"
                                size="m"
                                color="white"
                                hover
                                onClick={handleLogOut}
                            />
                            
                        </>
                    ) : (
                        <>
                            <Button
                                children="Tải lên"
                                type="default"
                                underline
                                color="black"
                                onClick={() => SET_MODAL(LOGIN_MODAL)}
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
                                minHeight={40}
                            >
                                <div className={styles.iconWrap}>
                                    <BsThreeDotsVertical className={styles.icon} />
                                </div>
                            </Popper>
                        </>
                    )}
                </div>
                <Modal
                    isOpen={MODAL === LOGIN_MODAL}
                    style={customStyles}
                >
                    <Login
                        onCloseModal={() => SET_MODAL(null)}
                        onShowModalLogin={() => SET_MODAL(LOGIN_MODAL)}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default HeaderComponent;