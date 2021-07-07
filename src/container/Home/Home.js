import React, { useEffect, useState } from 'react';
import PostItem from '../../components/PostItem'
import axios from 'axios'


const Home = () => {
    const [posts, setPosts] = useState([])
    const [isMuted, setIsMuted] = useState(true)
    useEffect(() => {
        axios.get('/api/posts?type=for-you&page=1')
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const handleShowDetailPost = () => {
        console.log('click')
    }
    const handleToggleplay = () => {
        console.log('click')
    }
    const handleVolume = () => {
        console.log('click')
    }
    const handleToggleMute = () => {
        console.log('click')
    }
    return (
        <>
            {posts.map(post => (
                <PostItem
                    key={post.id}
                    data={post}
                    onShowDetail={handleShowDetailPost}
                    onTogglePlay={handleToggleplay}
                    onVolume={handleVolume}
                    onToggleMute={handleToggleMute}
                    isMuted={isMuted}
                />
            ))}  
        </>
    );
};

export default Home;