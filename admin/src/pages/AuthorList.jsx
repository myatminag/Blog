import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import { authorListReducer } from '../reducer/authorList-reducer';
import Loader from '../components/Loader';

const AuthorList = () => {

    /** Author List Per Page */
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const page = searchParams.get('page') || 1;

    /** Author Info */
    const { state } = useContext(AuthContext);
    const { authorInfo } = state;

    /** Author List Reducer */
    const [{ loading, error, authorsList, pages, loadingDelete, successDelete }, dispatch] = useReducer(authorListReducer, {
        loading: true,
        error: ''
    });

    /** Fetch Author List From Api */
    useEffect(() => {
        const fetchAuthorList = async () => {
            try {
                dispatch({ type: "REQUEST_AUTHOR_LIST" });

                const { data } = await axios.get(
                    `https://thejourney-api.onrender.com/server/authors/?page=${page}`, {
                        headers: { authorization: `Bearer ${authorInfo.token}` }
                    }
                );

                dispatch({ 
                    type: "SUCCESS_AUTHOR_LIST",
                    payload: data
                });
            } catch (error) {
                dispatch({ 
                    type: "FAIL_AUTHOR_LIST",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                })
            }
        };
        /** If successDelete refresh author list */
        if (successDelete) {
            dispatch({ type: "RESET_DELETE" });
        } else {
            fetchAuthorList();
        }
    }, [authorInfo, page, successDelete]);

    /** Delete Author */
    const deleteAuthorHandler = async (author) => {
        try {
            dispatch({ type: "REQUEST_DELETE_AUTHOR" });

            await axios.delete(
                `https://thejourney-api.onrender.com/server/authors/${author._id}`, {
                    headers: { authorization: `Bearer ${authorInfo.token}` }
                }
            );

            dispatch({ type: "SUCCESS_DELETE_AUTHOR" });
            toast.success('Success Deleted');
        } catch (error) {
            dispatch({ type: "FAIL_DELETE_AUTHOR" });
            toast.error(error.message);
        }
    };

    return (
        <section className="h-[100vh] bg-[#f8f9fa] px-6 py-6">
            <ToastContainer position="bottom-center" limit={1} />
            <header className="text-2xl font-semibold tracking-wider">
                Authors Member
            </header>
            <hr className="mt-3 mb-6" />
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
                            authorsList.length === 0 ? (
                                <p className="text-center text-lg font-[500%]">
                                    No Authors Yet!
                                </p>
                            ) : (
                                <>
                                    <p className="font-[500] mb-3">
                                        Author Lists
                                    </p>
                                    <table className="mb-5 w-[100%] bg-white border border-collapse border-spacing-2.5 table-auto">
                                        <thead className="text-left">
                                            <tr>
                                                <th className="px-4 py-2">
                                                    ID
                                                </th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Joined At</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                authorsList.map((author) => (
                                                    <tr key={author.id} className="border hover:bg-[#eaf4f4] transition-all duration-150">
                                                        <td className="px-4 py-3">
                                                            {author._id}
                                                        </td>
                                                        <td>
                                                            {author.name}
                                                        </td>
                                                        <td>
                                                            {author.email}
                                                        </td>
                                                        <td>
                                                            {author.createdAt.substring(0, 10)}
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="mx-2"
                                                                onClick={() => deleteAuthorHandler(author)}
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
                                                to={`/authorList?page=${ x + 1 }`}
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

export default AuthorList;