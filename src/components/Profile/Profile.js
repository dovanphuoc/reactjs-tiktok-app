import React from 'react';

const FollowUser = ({
    children = null,
}) => {
    return (
        <div style={{ padding: '90px 20px 36px 128px' }}>
            <div style={{ paddingRight: '48px' }}>
                {children}
            </div>
        </div>
    );
};

export default FollowUser;