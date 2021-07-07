import React from 'react';
import SidebarComponent from '../../components/SidebarComponent'
import TopSidebar from '../../components/SidebarComponent/TopSidebar'
import AccountList from './AccountList'
import DiscoverList from './DiscoverList'
import Footer from './Footer'

const Sidebar = () => {
    return (
        <SidebarComponent>
            <TopSidebar
                desc="Đăng nhập để follow các tác giả, thích video và xem bình luận."
            />
            <AccountList
                heading="Tài khoản được đề xuất"
                apiPath="/api/users/suggested"
            />
            <DiscoverList />
            <Footer />
        </SidebarComponent>
    );
};

export default Sidebar;