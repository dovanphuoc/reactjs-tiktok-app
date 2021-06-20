import React from 'react';
import SidebarComponent from '../../components/SidebarComponent'
import TopSidebar from '../../components/SidebarComponent/TopSidebar'
import AccountList from './AccountList'
import DiscoverList from './DiscoverList'
import Footer from './Footer'

const Sidebar = () => {
    return (
        <SidebarComponent>
            <TopSidebar />
            <AccountList />
            <DiscoverList />
            <Footer />
        </SidebarComponent>
    );
};

export default Sidebar;