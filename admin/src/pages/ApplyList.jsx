import React, { useContext, useReducer, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import { applyListReducer } from '../reducer/applyList-reducer';
import Loader from '../components/Loader';

const ApplyList = () => {

    const navigate = useNavigate();

    /** Apply List Per Page */
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const page = searchParams.get('page') || 1;

    /** Author Info */
    const { state } = useContext(AuthContext);
    const { authorInfo } = state;

    /** Apply List Reducer */
    const [{ loading, error, applyList, pages, loadingDelete, successDelete }, dispatch] = useReducer(applyListReducer, {
        loading: true,
        error: ''
    });

    /** Fetch Apply List From Api */
    useEffect(() => {
        const fetchApplyList = async () => {
            try {
                dispatch({ type: "REQUEST_APPLY_LIST" });

                const { data } = await axios.get(
                    `https://thejourney-api.onrender.com/server/apply/?page=${page}`, {
                        headers: { authorization: `Bearer ${authorInfo.token}` }
                    }
                );

                dispatch({
                    type: "SUCCESS_APPLY_LIST",
                    payload: data
                })
            } catch (error) {
                dispatch({ 
                    type: "FAIL_APPLY_LIST",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                })
            }
        }
        /** If successDelete refresh author list */
        if (successDelete) {
            dispatch({ type: "RESET_DELETE" });
        } else {
            fetchApplyList();
        }
    }, [page, authorInfo, successDelete]);

    /** Delete Apply */
    const deleteApplyHandler = async (apply) => {
        try {
            dispatch({ type: "REQUEST_DELETE_APPLY" });

            await axios.delete(
                `https://thejourney-api.onrender.com/server/apply/${apply._id}`, {
                    headers: { authorization: `Bearer ${authorInfo.token}` }
                }
            );

            dispatch({ type: "SUCCESS_DELETE_APPLY" });
            toast.success('Success Deleted');
        } catch (error) {
            dispatch({ type: "FAIL_DELETE_APPLY" });
            toast.error(error.message);
        }
    };

    return (
        <section className="h-[100vh] bg-[#f8f9fa] px-6 py-6">
            <ToastContainer position="bottom-center" limit={1} /> 
            <header className="text-2xl font-semibold tracking-wider">
                Applicants Forms
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
                            applyList.length === 0 ? (
                                <p className="text-center text-lg font-[500%]">
                                    No Applicants Yet!
                                </p>
                            ) : (
                                <>
                                    <p className="font-[500] mb-3">
                                        Applicants
                                    </p>
                                    <table className="mb-5 w-[100%] bg-white border border-collapse border-spacing-2.5 table-auto">
                                        <thead className="text-left">
                                            <tr>
                                                <th className="px-4 py-2">
                                                    ID
                                                </th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Applied At</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                applyList.map((apply) => (
                                                    <tr key={apply.id} className="border hover:bg-[#eaf4f4] transition-all duration-150">
                                                        <td className="px-4 py-3">
                                                            {apply._id}
                                                        </td>
                                                        <td>
                                                            {apply.name}
                                                        </td>
                                                        <td>
                                                            {apply.email}
                                                        </td>
                                                        <td>
                                                            {apply.createdAt.substring(0, 10)}
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                onClick={() => navigate(`/applyList/${apply._id}`)}
                                                            >
                                                                <MdOutlineMarkEmailRead size={20} color="#4361ee" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mx-2"
                                                                onClick={() => deleteApplyHandler(apply)}
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
                                                to={`/applyList?page=${ x + 1 }`}
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

export default ApplyList;