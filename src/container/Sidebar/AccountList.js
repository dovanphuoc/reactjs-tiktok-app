import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import Popper from '../../components/Popper'
import {
    AccountList as AccountListComponent,
    AccountItem
} from '../../components/SidebarComponent'
import AccountPreview from '../../components/AccountPreview/AccountPreview';

const AccountList = ({
    apiPath = '',
    heading = ''
}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [accounts, setAccounts] = useState([])
    const [pagination, setPagination] = useState({
        currentPage: 1,
        total: 0,
        perPage: 0,
        totalPages: 0
    })
    useEffect(() => {
        axiosInstance.get(`${apiPath}?page=${pagination.currentPage}&per_page=12`)
            .then(res => {
                setAccounts(prevState => [
                    ...prevState,
                    ...res.data
                ])
                setPagination({
                    currentPage: res.meta.pagination.current_page,
                    total: res.meta.pagination.total,
                    perPage: res.meta.pagination.per_page,
                    totalPages: res.meta.pagination.total_pages,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [pagination.currentPage, apiPath])
    
    const handleSeeToggle = () => {
        setIsExpanded(!isExpanded)
        if (pagination.currentPage < pagination.totalPages) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1
            }))
        }
    }

    const collapsedHeight = isExpanded ? 'initial' : pagination.perPage * 22
 
    return (
        <AccountListComponent
            heading={heading}
            isExpanded={isExpanded}
            collapsedHeight={collapsedHeight}
            onSeeToggle={handleSeeToggle}
        >
            {accounts.map((account, index) => (
                <Popper
                    key={account.id}
                    placement="bottom"
                    interactive
                    minWidth={320}
                    minHeight={100}
                    delay={[1000, 0]}
                    offset={[28, -4]}
                    render={() => (
                        <AccountPreview
                            avatar={account.avatar}
                            nickname={account.nickname}
                            tick={account.tick}
                            fullName={`${account.first_name} ${account.last_name}`}
                            voteFollow={account.followers_count}
                            voteLike={account.likes_count}
                        />
                    )}
                >
                    <AccountItem
                        key={index}
                        avatar={account.avatar}
                        nickname={account.nickname}
                        fullName={`${account.first_name} ${account.last_name}`}
                        tick={account.tick}
                    />
                </Popper> 
            ))}
        </AccountListComponent>
    );
};

export default AccountList;