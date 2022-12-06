import React, { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { postDetailReducer } from '../reducer/postDetail-reducer';
import Text from '../components/Text';
import Loader from '../components/Loader';

const PostDetail = () => {

    /** Post Detail Location */
    const location = useLocation();
    const postId = location.pathname.split("/")[2];

    /** Post Reducer */
    const [{ loading, error, post }, dispatch] = useReducer(postDetailReducer, {
        post: [],
        loading: true,
        error: null
    });

    /** Fetch Post Detail */
    useEffect(() => {
        const fetchingPostDetail = async () => {
            try {
                dispatch({ type: "REQUEST_FETCHING_POST" });

                const res = await axios.get(
                    'https://thejourney-api.onrender.com/server/posts/post/' + postId
                );

                dispatch({
                    type: "SUCCESS_FETCHING_POST",
                    payload: res.data
                })
            } catch (error) {
                dispatch({
                    type: "FAIL_FETCHING_POST",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                })
            }
        };
        fetchingPostDetail();
    }, [postId]);

    /** Text */
    // const getText = (html) => {
    //     const doc = new DOMParser().parseFromString(html, "text/html");
    //     return doc.body.textContent;
    // };

    return (
        <div>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <p>
                        {error}
                    </p>
                ) : (
                    <div className="px-3 py-6 xl:px-[15%] xl:grid xl:grid-cols-3">
                        <div className="col-span-2">
                            <p className="text-2xl mb-3 xl:mb-5 xl:text-3xl">
                                {post.article}
                            </p>
                            <p className="mb-3 text-lg xl:mb-5">
                                {post.intro}
                            </p>
                            <div className="mb-3 flex items-center gap-x-1 xl:mb-6">
                                <p className="text-sm">
                                    {new Date(post.createdAt).toLocaleDateString('en-us', { month:"short", day:"numeric", year:"numeric" })} {" "}•
                                </p>
                                <p className="text-sm">
                                    By {post.author}
                                </p>
                            </div>
                            <img 
                                src={post.image} 
                                alt="post-image" 
                                className="mb-3 w-[100%] h-[210px] xl:mb-6 xl:h-[450px]"
                            />
                            <Text post={post} />
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default PostDetail;