import React, { useEffect, useState, useRef, useCallback } from 'react';
import PostItem from '../../components/PostItem'
import axios from 'axios'
import storage from '../../../src/utils/storage'
import {
    PostDetailModal,
} from '../../components/PostDetailModal';

const Home = () => {
    const [pagination, setPagination] = useState({
        total: 0,
        perPage: 0,
        currentPage: 1,
        totalPages: 0
    })

    const [posts, setPosts] = useState([])
    const [postInViewport, setPostInViewport] = useState(null)
    const [isMuted, setIsMuted] = useState(storage.get('isMuted', true))
    const [currentPost, setCurrentPost] = useState(null)

    const videoRefs = useRef({})
    const currentVideoRef = useRef(null)
    const stopWhenPaused = useRef(true)

    useEffect(() => {
        axios.get(`/api/posts?type=for-you&page=${pagination.currentPage}`)
            .then(res => {
                setPosts(prevState => [
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
    }, [pagination.currentPage])
    
    const getVideoRefByPostId = postId => {
        return videoRefs.current[postId]
    }

    const setVideoRefByPostId = (postId, ref) => {
        return videoRefs.current[postId] = ref
    }
    
    const handleVideoRef = (ref, post) => {
        setVideoRefByPostId(post.id, ref)
    }

    const checkPlaying = post => {
        return postInViewport && postInViewport.id === post.id
    }

    const handleToggleMute = post => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.muted = !videoRef.muted
            setIsMuted(videoRef.muted)
            storage.set('isMuted', videoRef.muted)
        }
    }

    const handleTogglePlay = (post) => {
        stopWhenPaused.current = false
        if (checkPlaying(post)) {
            setPostInViewport(null)
        } else {
            setPostInViewport(post)
        }
    }

    const handleFollowUser = (post) => {
        let apiPath = `/api/users/${post.user.id}/${post.user.is_followed ? 'unfollow' : 'follow'}`
        axios.post(apiPath)
            .then(res => {
                const index = posts.findIndex(item => item.id === post.id)
                const newPost = posts[index]
                newPost.user = res.data
                const newPosts = [...posts]
                newPosts.splice(index, 1, newPost)
                setPosts(newPosts)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleWaypointEnter = (post) => {
        if (currentPost) return
        stopWhenPaused.current = true
        setPostInViewport(post)
    }

    const handleLikeCount = post => {
        axios.post(`/api/posts/${post.id}/${post.is_liked ? 'unlike' : 'like'}`)
            .then(res => {
                const postIndex = posts.findIndex(item => item.id === post.id)
                const newPost = {...res.data}
                posts.splice(postIndex, 1, newPost)
                setPosts(posts.slice(0))
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleCommentCount = post => {
        setCurrentPost(post)
    }

    const handleShowDetailPost = post => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.pause()
            currentVideoRef.current = videoRef.currentTime
        }
        setCurrentPost(post)
        window.history.pushState(null, document.title, getPostURL(post))
    }

    const handleCloseBtn = () => {
        const videoRef = getVideoRefByPostId(currentPost.id)
        if (videoRef) {
            videoRef.currentTime = currentVideoRef.current
            videoRef.play()
        }
        setCurrentPost(null)
        window.history.back()
    }

    const getPostURL = post => {
        return `/@${post.user.nickname}/video/${post.uuid}`
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

    const handleNextVideo = () => {
        currentVideoRef.current = 0
        const currentIndex = posts.findIndex(post => post.id === currentPost.id)
        if (currentIndex <= posts.length - 1) {
            let newPost = posts[currentIndex + 1]
            setCurrentPost(newPost)
        }
    }

    const handlePrevVideo = () => {
        currentVideoRef.current = 0
        const currentIndex = posts.findIndex(post => post.id === currentPost.id)
        if (currentIndex >= 0) {
            let newPost = posts[currentIndex - 1]
            setCurrentPost(newPost)
        }
    }

    

    return (
        <div style={{padding: '100px 0 20px'}}>
            {posts.map(post => (
                <>
                    <PostItem
                        key={post.id}
                        data={post}
                        onTogglePlay={handleTogglePlay}
                        onToggleMute={handleToggleMute}
                        isMuted={isMuted}
                        getVideoRef={handleVideoRef}
                        onFollowUser={handleFollowUser}
                        isPlaying={checkPlaying(post)}
                        stopWhenPaused={stopWhenPaused.current}
                        isWaypoint
                        onEnterWaypoint={handleWaypointEnter}
                        onLikeCount={handleLikeCount}
                        onCommentCount={handleCommentCount}
                        onShowDetail={handleShowDetailPost}
                    />
                </>
            ))}
            
            {currentPost && (
                <PostDetailModal
                    data={currentPost}
                    onCloseBtn={handleCloseBtn}
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                    onNextVideo={handleNextVideo}
                    onPrevVideo={handlePrevVideo}
                    currentTime={currentVideoRef.current}
                />
            )}
        </div>
    );
};

export default Home;