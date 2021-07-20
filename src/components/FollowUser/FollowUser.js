import React from 'react';

const FollowUser = ({
    children = null,
    nickname = ''
}) => {
    return (
        <div style={{paddingTop: '200px'}}>
            {children}
            {nickname}
        </div>
    );
};

export default FollowUser;