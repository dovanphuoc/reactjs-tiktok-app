import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostItem from '../../components/PostItem'
import axiosInstance from '../../axiosInstance'
import storage from '../../../src/utils/storage'
import {
    PostDetailModal,
} from '../../components/PostDetailModal';
import { Waypoint } from 'react-waypoint';
import Comment from '../../components/PostDetailModal/Comment'

const Home = () => {
    let { videoId } = useParams()
    const [pagination, setPagination] = useState({
        total: 0,
        perPage: 0,
        currentPage: 1,
        totalPages: 0
    })
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [postInViewport, setPostInViewport] = useState(null)
    const [isMuted, setIsMuted] = useState(storage.get('isMuted', true))
    const [currentPost, setCurrentPost] = useState(null)
    const videoRefs = useRef({})
    const currentVideoRef = useRef(null)
    const stopWhenPaused = useRef(true)

    useLayoutEffect(() => {
        axiosInstance
            .get(`/api/posts?type=for-you&page=${pagination.currentPage}`)
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
    }, [pagination.currentPage])

    useLayoutEffect(() => {
        if (!videoId) return
        axiosInstance.get(`/api/posts/${videoId}/comments`)
            .then(res => {
                setComments(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[videoId])
    
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
        axiosInstance
            .post(apiPath)
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
        axiosInstance.post(`/api/posts/${post.id}/${post.is_liked ? 'unlike' : 'like'}`)
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
        window.history.pushState(null, document.title, getPostURL(post))
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

    const handleSubmit = () => {
        console.log(posts)
        // if (valueInput == '') return;
        // axios.post(`/api/posts/${post.uuid}/comments`, {
        //     comment: valueInput
        // })
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }

    useLayoutEffect(() => {
        // Disabled restore scrolled by user
        window.history.scrollRestoration = 'manual'

        return () => {
            // Enabled restore scrolled by user
            window.history.scrollRestoration = 'auto'
        }
    }, [])


    const getPostURL = post => {
        return `/@${post.user.nickname}/video/${post.id}`
    }

    const scrollPostIntoView = useCallback(post => {
        const videoRef = getVideoRefByPostId(post.id)
        if (videoRef) {
            videoRef.scrollIntoView({ block: 'center' })
        }
    }, [])

    const handleCloseBtn = () => {
        const videoRef = getVideoRefByPostId(currentPost.id)
        if (videoRef) {
            videoRef.currentTime = currentVideoRef.current
            videoRef.play()
        }
        setCurrentPost(null)
        window.history.back()
    }

    useLayoutEffect(() => {
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

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.totalPages) {
            setPagination(prevState => ({
                ...prevState,
                currentPage: prevState.currentPage + 1
            }))
        }
    }

    return (
        <div style={{ padding: '100px 0 20px' }}>
            {posts.map(post => (
                <PostItem
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
            ))}

            <Waypoint
                onEnter={handleNextPage}
            >
            </Waypoint>
            
            {currentPost && (
                <PostDetailModal
                    data={currentPost}
                    onCloseBtn={handleCloseBtn}
                    isMuted={isMuted}
                    onToggleMute={handleToggleMute}
                    onNextVideo={handleNextVideo}
                    onPrevVideo={handlePrevVideo}
                    currentTime={currentVideoRef.current}
                    onSubmit={handleSubmit}
                    dataComment={comments}
                />
            )}
                {/* <Comment
                    comment={comments}
                /> */}
        </div>
    );
};

export default Home;