import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

import Featured from '../components/Featured';
import { postReducer } from '../reducer/post-reducer';
import PostList from '../components/PostList';
import Loader from '../components/Loader';

const Home = () => {

    /** Post Reducer */
    const [{ loading, error, posts }, dispatch] = useReducer(postReducer, {
        posts: [],
        loading: true,
        error: null
    });

    /** Fetch Post */
    useEffect(() => {
        const fetchingPosts = async () => {
            try {
                dispatch({ type: "REQUEST_FETCHING_POST" });

                const res = await axios.get(
                    'https://thejourney-api.onrender.com/server/posts'
                );

                dispatch({ 
                    type: "SUCCESS_FETCHING_POST",
                    payload: res.data
                });
            } catch (error) {
                dispatch({
                    type: "FAIL_FETCHING_POST",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                })
            }
        }
        fetchingPosts();
    }, []);

    return (
        <div className="">
            <Featured />
            <header className="px-3 pt-6 text-lg font-semibold xl:mt-3 xl:px-[15%]">
                Latest Articles
                <div className=' mt-1 w-[80px] h-[0.5px] bg-[#03a87c]'></div>
            </header>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <p>
                        {error}
                    </p>
                ) : (
                    <div className="pb-10">
                        <div className="mb-5 md:grid md:grid-cols-2 xl:px-[15%] xl:py-6 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-5">
                            {
                                posts.slice(posts.length - 12).reverse().map((data) => (
                                    <PostList posts={data} />
                                ))
                            }
                        </div>
                        <div className="w-[100%] flex items-center justify-center">
                            <Link to='/articles'>
                                <motion.p 
                                    whileTap={{ scale: 0.9 }}
                                    className="w-[130px] py-2 mx-auto text-center rounded-md text-white bg-[#03a87c]"
                                >
                                    See More
                                </motion.p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default Home;