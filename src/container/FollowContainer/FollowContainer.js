import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useHistory } from 'react-router-dom';
import {
    Follow,
    FollowItem
} from '../../components/Follow';
import axios from 'axios'
import { FollowUser } from '../../components/FollowUser';
const styles = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
}

const FollowContainer = () => {
    const history = useHistory()
    const [follows, setFollows] = useState([])
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
    const nextPage = () => {
        if (pagination.currentPage < pagination.totalPages) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1
            }))
        }
    }
    const checkPlaying = account => {
        return !!currentAccount && currentAccount.id === account.id
    }
    const handleMouseEnter = account => {
        setCurrentAccount(account)
    }
    const handleClick = (account) => {
        history.push(`/@${account.nickname}`)
    }
    return (
        <>
            <Follow>
                <InfiniteScroll
                    key={pagination.currentPage}
                    style={styles}
                    dataLength={follows.length}
                    next={nextPage}
                    hasMore={nextPage}
                >
                    {follows.map(account => (
                        <FollowItem
                            key={account.id}
                            data={account}
                            isPlaying={checkPlaying(account)}
                            onMouseEnter={handleMouseEnter}
                            onClick={handleClick}
                        >
                            <FollowUser
                                nickname={account.nickname}
                            />
                        </FollowItem>
                    ))}
                </InfiniteScroll>
            </Follow>
        </>
    );
};

export default FollowContainer;