import React, { useRef, useState } from 'react';
import styles from './HeaderComponent.module.scss'
import { Link } from 'react-router-dom';
import config from '../../config'
import logo from '../../assets/img/logo.svg'
import { GoSearch } from 'react-icons/go'
import { BsThreeDotsVertical, BsCloudUpload } from 'react-icons/bs'
import { GiMedicalPackAlt } from 'react-icons/gi'
import { AiOutlineLoading3Quarters, AiOutlineQuestionCircle } from 'react-icons/ai'
import { IoIosCloseCircle } from 'react-icons/io'
import { FiSend, FiLogIn, FiSettings } from 'react-icons/fi'
import { BiCommentMinus, BiUser } from 'react-icons/bi'
import Button from '../common/Button'
import MenuItem from '../Popper/MenuItem'
import Popper from '../Popper'
import SearchPreview, { ResultItem } from '../SearchPreview'
import Modal from 'react-modal'
import Login from '../Login'
import imageGirl from '../../assets/img/girl1.jpg'
import Tooltip from '../Tooltip';

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
    onClickResultItem = defaultFn,
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

    const menuListUser = useRef([
        {
            icon: <BiUser className={styles.icon} />,
            title: 'Xem hồ sơ'
        },
        {
            icon: <FiSettings className={styles.icon} />,
            title: 'Cài đặt'
        },
        {
            icon: <GiMedicalPackAlt className={styles.icon} />,
            title: 'Tiếng việt'
        },
        {
            icon: <AiOutlineQuestionCircle className={styles.icon} />,
            title: 'Phản hồi và trợ giúp'
        },
        {
            icon: <FiLogIn className={styles.icon} />,
            title: 'Đăng xuất'
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

    const userMenuList = () => {
        return menuListUser.current.map((menu, index) => (
            <MenuItem
                key={index}
                to={menu.to}
                seperate={index === 0}
                onClick={menu.onClick}
            >
                <div className={styles.textVi}>
                    <span className={styles.icon}>{menu.icon}</span>
                    <span className={styles.title}>{menu.title}</span>
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
                            
                            <Popper
                                interactive
                                wrapperClassname={styles.menuList}
                                render={userMenuList}
                                appendTo="parent"
                                placement="bottom"
                                offset={[-30, 10]}
                                minWidth={200}
                                minHeight={160}
                            >
                                <div className={`${styles.avatar} ${styles.iconUser}`}>
                                    <img src={imageGirl} alt="avatar" />
                                </div>
                            </Popper>
                            
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