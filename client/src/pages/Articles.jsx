import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import { searchPostReducer } from '../reducer/searchPost-reducer';
import PostList from '../components/PostList';
import Loader from '../components/Loader';

const Articles = () => {

    /** search?category=history */
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const category = searchParams.get('category') || 'all';
    const query = searchParams.get('query') || 'all';
    const page = searchParams.get('page') || 1;

    /** Search Post Reducer */
    const [{ loading, error, posts, pages, countPosts}, dispatch] = useReducer(searchPostReducer, {
        loading: true,
        error: ''
    })

    /** Fetch Post */
    useEffect(() => {
        const fetchPost = async () => {
            try {
                dispatch({ type: "FETCH_POST" });

                const { data } = await axios.get(
                    `https://thejourney-api.onrender.com/server/posts/articles?page=${page}&query=${query}&category=${category}`
                );

                dispatch({ 
                    type: "SUCCESS_POST",
                    payload: data
                });
            } catch (error) {
                dispatch({ 
                    type: "FAIL_POST",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                })
            }
        };
        fetchPost();
    }, [page, query, category]);

    /** Filter URL */
    const filterURL = (filter) => {
        const filterPage = filter.page || page;
        const filerCategory = filter.category || category;
        const filterQuery = filter.query || query;

        return `/articles?page=${filterPage}&query=${filterQuery}&category=${filerCategory}`;
    };

    /** Fetch Categories */
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(
                    'https://thejourney-api.onrender.com/server/posts/category'
                );
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="xl:px-[15%]">
            <header className="px-3 py-3 text-lg font-semibold xl:px-0">
                All Stories
            </header>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <p>
                        {error}
                    </p>
                ) : (
                    <div>
                        <ul className="px-3 flex items-center gap-x-5 overflow-x-scroll scrollbar-none xl:px-0">
                            {
                                categories.map((c) => (
                                    <li key={c} className="font-[500]">
                                        <Link 
                                            to={filterURL({ category: c})}
                                            className={c === category ? "underline decoration-[#03a87c]" : ""}
                                        >
                                            {c}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            {
                                posts.length === 0 && (
                                    <div className="h-[30vh] mt-[8rem]">
                                        <p className="text-center text-3xl">
                                            Oops!. No Articles Found!
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="md:grid md:grid-cols-2 xl:py-6 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-4">
                            {
                                posts.map((data) => (
                                    <PostList posts={data} key={data._id} />
                                ))
                            }
                        </div>
                        {/* Pagination */}
                        <div className="px-3 pb-8 flex items-center gap-x-3 xl:px-0">
                            {[...Array(pages).keys()].map((x) => (
                                <Link 
                                    key={x + 1}
                                    to={filterURL({ page: x + 1 })}
                                >
                                    <button 
                                        className={Number(page) === x + 1 ? "w-[30px] px-2 py-1 font-semibold rounded-md border border-[#03a87c] bg-[#03a87c] text-white shadow-CustomShadow" : "w-[30px] px-2 py-1 border border-[#03a87c]  shadow-CustomShadow rounded-md"}
                                    >
                                        {x + 1}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default Articles;