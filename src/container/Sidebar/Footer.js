import React from 'react';
import {
    Footer as FooterList,
    FooterItem
} from '../../components/SidebarComponent'

const Footer = () => {
    const data = [
        'Giới thiệu',
        'Bảng tin',
        'Liên hệ',
        'Sự nghiệp',
        'BytaDance',
        'TikTok for Good',
        'Advertise',
        'Developers',
        'Transparency',
        'Trợ giúp',
        'An toàn',
        'Điều khoản',
        'Quyền riêng tư',
        'Creator Portal',
        'Hướng dẫn Cộng đồng',
        'More',
        '© 2021 TikTok'
    ]
    return (
        <FooterList>
            {data.map((tag, index) => (
                <FooterItem
                    key={index}
                    tag={tag}
                />
            ))}
        </FooterList>
    );
};

export default Footer;