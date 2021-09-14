import React, { useLayoutEffect, useState } from 'react'
import {
    Follow,
    FollowItem
} from '../../components/Follow';
import axiosInstance from '../../axiosInstance'
import { Waypoint } from 'react-waypoint';

const FollowContainer = () => {
    const [follows, setFollows] = useState([])
    const [currentAccount, setCurrentAccount] = useState(null)
    const [pagination, setPagination] = useState({
        perPage: 0,
        currentPage: 1,
        totalPages: 0,
        total: 0
    })
    useLayoutEffect(() => {
        axiosInstance
            .get(`/api/users/suggested?page=${pagination.currentPage}&per_page=12`)
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

    const handleMouseEnter = account => {
        setCurrentAccount(account)
    }

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.totalPages) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1
            }))
        }
    }

    return (
        <>
            <Follow>
                {follows.map(account => (
                    <FollowItem
                        key={account.id}
                        data={account}
                        onMouseEnter={handleMouseEnter}
                    />                        
                ))}
            </Follow>
            <Waypoint
                onEnter={handleNextPage}
            >
            </Waypoint>
        </>
    );
};

export default FollowContainer;