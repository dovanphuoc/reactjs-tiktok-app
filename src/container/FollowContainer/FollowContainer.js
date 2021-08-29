import React, { useEffect, useState } from 'react'
import {
    Follow,
    FollowItem
} from '../../components/Follow';
import axios from 'axios'
import {
    FollowUser as FollowUserComponent,
    FollowUserInfo as FollowUserInfoComponent,
    FollowUserVideo as FollowUserVideoComponent
}
    from '../../components/FollowUser';

const FollowContainer = () => {
    const [follows, setFollows] = useState([])
    const [accountItem, setAccountItem] = useState(null)
    const [currentAccount, setCurrentAccount] = useState(null)
    const [pagination, setPagination] = useState({
        perPage: 0,
        currentPage: 1,
        totalPages: 0,
        total: 0
    })
    useEffect(() => {
        axios.get(`/api/users/suggested?page=${pagination.currentPage}&per_page=12`)
            .then(res => {
                const accounts = res.data
                setFollows(prevState => [
                    ...prevState,
                    ...accounts
                ])
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0])
                }
                setPagination({
                    perPage: res.meta.pagination.per_page,
                    currentPage: res.meta.pagination.current_page,
                    totalPages: res.meta.pagination.total_pages,
                    total: res.meta.pagination.total,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [pagination.currentPage])



    const checkPlaying = account => {
        return !!currentAccount && currentAccount.id === account.id
    }
    const handleMouseEnter = account => {
        setCurrentAccount(account)
    }
    const handleClick = (account) => {
        axios.post(`/api/users/${account.id}/follow`)
            .then(res => {
                setAccountItem(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        // window.open(`/@${account.nickname}`)
        window.location.href(`/@${account.nickname}`)
    }
    return (
        <>
            <Follow>
                {follows.map(account => (
                    <FollowItem
                        // key={account.id}
                        data={account}
                        isPlaying={checkPlaying(account)}
                        onMouseEnter={handleMouseEnter}
                        onClick={handleClick}
                    />                        
                ))}
            </Follow>
            <FollowUserComponent>
                <FollowUserInfoComponent
                    data={accountItem}
                />
                <FollowUserVideoComponent
                    // data={accountItem}
                />
            </FollowUserComponent>
        </>
    );
};

export default FollowContainer;