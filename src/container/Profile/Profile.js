import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axiosInstance'

import {
    Profile as ProfileComponent,
    ProfileInfo as ProfileInfoComponent,
    ProfileTab as ProfileTabComponent,
    ProfileVideo as ProfileVideoComponent
}
    from '../../components/Profile';
const Profile = () => {
    const [user, setUser] = useState({})
    const [likePosts, setLikePosts] = useState([])
    const [currentVideo, setCurrentVideo] = useState(null)
    const [showDetail, setShowDetail] = useState(false)
    let { nickname } = useParams()
    useLayoutEffect(() => {
        axiosInstance
            .get(`/api/users/@${nickname}`)
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[nickname])

    useLayoutEffect(() => {
        axiosInstance
            .get(`/api/users/1/liked-posts`)
            .then(res => {
                const newLikePosts = [...likePosts, ...res.data]
                setLikePosts(newLikePosts)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const checkPlaying = video => {
        return !!currentVideo && currentVideo.id === video.id
    }
    
    const handleMouseEnter = video => {
        setCurrentVideo(video)
    }
    
    const handleShowDetail = video => {
        window.history.pushState(null, document.title, `@${nickname}/video/${video.id}`)
        setShowDetail(true)
    }

    return (
        <ProfileComponent>
            <ProfileInfoComponent
                data={user}
            />
            <ProfileTabComponent />
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '2px'
            }}>
                {likePosts.map(likePost => (
                    <ProfileVideoComponent
                        key={likePost.uuid}
                        data={likePost}
                        onMouseEnter={handleMouseEnter}
                        isPlaying={checkPlaying(likePost)}
                        onShowDetail={handleShowDetail}
                        showDetail={showDetail}
                    />
                ))}


            </div>
        </ProfileComponent>
    );
};

export default Profile;