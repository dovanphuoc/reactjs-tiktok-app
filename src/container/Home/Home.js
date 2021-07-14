import React, { useEffect, useState, useRef, useCallback } from 'react';
import PostItem from '../../components/PostItem'
import axios from 'axios'
import storage from '../../../src/utils/storage'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [currentPost, setCurrentPost] = useState(null)
    const [postInViewport, setPostInViewport] = useState(null)
    const [isMuted, setIsMuted] = useState(storage.get('isMuted', true))

    const videoRefs = useRef({})
    const currentVideoRef = useRef(null)
    const stopWhenPaused = useRef(true)

    useEffect(() => {
        axios.get('/api/posts?type=for-you&page=1')
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const getVideoRefByPostId = postId => {
        return videoRefs.current[postId]
    }

    const setVideoRefByPostId = (postId, ref) => {
        return videoRefs.current[postId] = ref
    }

    const getPostURL = post => {
        return `/@${post.author.nickname}/video/${post.uuid}`
    } 

    const scrollPostIntoView = useCallback(post => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.scrollIntoView({ block: 'center' })
        }
    }, [])

    useEffect(() => {
        if (!currentPost) return
        scrollPostIntoView(currentPost)
        window.history.replaceState(null, document.title, getPostURL(currentPost))
    }, [currentPost, scrollPostIntoView])

    const handleShowDetailPost = post => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.pause()
            currentVideoRef.current = videoRef.currentTime
        }

        setCurrentPost(post)
        window.history.pushState(null, document.title, getPostURL(post))
    }

    const handleVideoRef = (ref, post) => {
        setVideoRefByPostId(post.id, ref)
    }

    const checkPlaying = post => {
        return postInViewport && postInViewport.id === post.id
    }

    const handleToggleplay = post => {
        stopWhenPaused.current = false
        if (checkPlaying(post)) {
            setPostInViewport(null)
        } else {
            setPostInViewport(post)
        }
    }

    const handleToggleMute = post => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.muted = !videoRef.muted
            setIsMuted(videoRef.muted)
            storage.set('isMuted', videoRef.muted)
        }
    }

    return (
        <>
            {posts.map(post => (
                <PostItem
                    key={post.id}
                    data={post}
                    onShowDetail={handleShowDetailPost}
                    onTogglePlay={handleToggleplay}
                    onVolume={handleToggleMute}
                    onToggleMute={handleToggleMute}
                    isMuted={isMuted}
                    getVideoRef={handleVideoRef}
                />
            ))}  
        </>
    );
};

export default Home;