import React, { useEffect, useReducer, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import { PostListReducer } from '../reducer/postList-reducer';
import { AuthContext } from '../context/auth-context';
import Loader from '../components/Loader';

const PostList = () => {

    /** Author Info */
    const { state } = useContext(AuthContext);
    const { authorInfo } = state;

    const navigate = useNavigate();

    /** Post List Per Page */
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const page = searchParams.get('page') || 1;

    /** Post List Reducer */
    const [{ loading, error, postList, pages, loadingWrite, loadingDelete, successDelete }, dispatch] = useReducer(PostListReducer, {
        loading: true,
        error: false
    });

    /** Fetch Post List From Api */
    useEffect(() => {
        const fetchPostList = async () => {
            try {
                dispatch({ type: "REQUEST_POST_LIST" });

                const { data } = await axios.get(
                    `https://thejourney-api.onrender.com/server/posts/admin?page=${page}` , {
                        headers: { authorization: `Bearer ${authorInfo.token}` }
                    }
                );

                dispatch({ 
                    type: "SUCCESS_POST_LIST",
                    payload: data
                })
            } catch (error) {
                dispatch({
                    type: "FAIL_POST_LIST",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                })
            }
        };
        /** If SuccessDelete Refresh Post List */
        if (successDelete) {
            dispatch({ type: "RESET_DELETE_POST" })
        } else {
            fetchPostList();
        }
    }, [page, successDelete, authorInfo]);

    /** Create New Post */
    const createNewPostHandler = async () => {
        try {
            dispatch({ type: "REQUEST_CREATE_POST" })

            const { data } = await axios.post(
                'https://thejourney-api.onrender.com/server/posts/create', {}, {
                    headers: { authorization: `Bearer ${authorInfo.token}` }
                }
            )

            dispatch({ type: "SUCCESS_CREATE_POST" });
            navigate(`/postList/${data.post._id}`);
        } catch (error) {
            dispatch({ type: "FAIL_CREATE_POST" })
        }
    };

    /** Delete Post */
    const deletePostHandler = async (post) => {
        try {
            dispatch({ type: "REQUEST_DELETE_POST" });

            await axios.delete(
                `https://thejourney-api.onrender.com/server/posts/post/${post._id}`, {
                    headers: { authorization: `Bearer ${authorInfo.token}` }
                }
            );

            dispatch({ type: "SUCCESS_DELETE_POST" });
            toast.success('Success Deleted');
        } catch (error) {
            dispatch({ type: "FAIL_DELETE_POST" });
        }
    };

    return (
        <section className="h-[100vh] bg-[#f8f9fa] px-6 py-6">
            <ToastContainer position="bottom-center" limit={1} />
            <div className="mb-5 flex items-center justify-between">
                <header className="text-2xl font-semibold tracking-wider">
                    Write Something New?
                </header>
                <button 
                    type="button"
                    className="px-4 py-1 rounded-md bg-[#11998e] text-white"
                    onClick={createNewPostHandler}
                >
                    Write Story
                </button>
            </div>
            <hr className="mt-3 mb-6" />
            {
                loadingWrite && (
                    <p>
                        loading...
                    </p>
                )
            }
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <p>
                        {error}
                    </p>
                ) : (
                    <div className="px-4 py-4 border rounded-md shadow-CustomShadow bg-white">
                        {
                            postList.length === 0 ? (
                                <p className="text-center text-lg font-[500%]">
                                    No Stories Yet!
                                </p>
                            ) : (
                                <>
                                    <p className="font-[500] mb-3">
                                        Stories Lists
                                    </p>
                                    <table className="mb-5 w-[100%] bg-white border border-collapse border-spacing-2.5 table-auto">
                                        <thead className="text-left">
                                            <tr>
                                                <th className="px-4 py-2">
                                                    ID
                                                </th>
                                                <th>Author</th>
                                                <th>Category</th>
                                                <th>Article</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                postList.map((post) => (
                                                    <tr key={post.id} className="border hover:bg-[#eaf4f4] transition-all duration-150">
                                                        <td className="px-4 py-3">
                                                            {post._id}
                                                        </td>
                                                        <td>
                                                            {post.author}
                                                        </td>
                                                        <td>
                                                            {post.category}
                                                        </td>
                                                        <td>
                                                            {post.article}
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="mr-2"
                                                                onClick={() => navigate(`/postList/${post._id}`)}
                                                            >
                                                                <FaRegEdit size={17} color="#4361ee" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mx-2"
                                                                onClick={() => deletePostHandler(post)}
                                                            >
                                                                <FaTrashAlt size={17} color="#ef233c" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        loadingDelete && (
                                            <p>
                                                Loading...
                                            </p>
                                        )
                                    }
                                    <div className="flex items-center gap-x-3">
                                        {[...Array(pages).keys()].map((x) => (
                                            <Link 
                                                key={x + 1}
                                                to={`/postList?page=${ x + 1 }`}
                                            >
                                                <button 
                                                    className={Number(page) === x + 1 ? "w-[30px] px-2 py-1 font-semibold rounded-md text-white bg-[#000000] shadow-CustomShadow" : "w-[30px] px-2 py-1 shadow-CustomShadow border rounded-md"}
                                                >
                                                    {x + 1}
                                                </button>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )
                        }
                    </div>
                )
            }
        </section>
    )
};

export default PostList;