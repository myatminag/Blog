import React, { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { applyDetailReducer } from '../reducer/applyDetail-reducer';

const ApplyDetail = () => {

    /** Apply Detail Location */
    const location = useLocation();
    const applyId = location.pathname.split('/')[2];

    /** Apply Detail Reducer */
    const [{ loading, error, apply }, dispatch] = useReducer(applyDetailReducer, {
        apply: [],
        loading: true,
        error: null
    });

    /** Fetch Apply Detail */
    useEffect(() => {
        const fetchApplyDetail = async () => {
            try {
                dispatch({ type: "REQUEST_APPLY_DETAIL" });

                const res = await axios.get(
                    'https://thejourney-api.onrender.com/server/apply/' + applyId
                );

                dispatch({
                    type: "SUCCESS_APPLY_DETAIL",
                    payload: res.data
                });
            } catch (error) {
                dispatch({
                    type: "FAIL_APPLY_DETAIL",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                })
            }
        };
        fetchApplyDetail();
    }, [applyId]);

    return (
        <section className="h-[100vh] bg-[#f8f9fa] px-6 py-6">
            <header className="text-2xl font-semibold tracking-wider">
                Applicant ID: {apply._id}
            </header>
            <hr className="mt-3 mb-6" />
            {
                loading ? (
                    <p>
                        Loading...
                    </p>
                ) : error ? (
                    <p>
                        {error}
                    </p>
                ) : (
                    <div className="w-[100%] px-4 py-4 border rounded-md shadow-CustomShadow bg-white">
                        <div className="mb-2 flex items-center gap-x-3">
                            <p className="w-[150px] font-[500] uppercase">
                                Full Name: {" "}
                            </p>
                            <p>
                                {apply.name}
                            </p>
                        </div>
                        <div className="mb-2 flex items-center gap-x-3">
                            <p className="w-[150px] font-[500] uppercase">
                                Email: {" "}
                            </p>
                            <p>
                                {apply.email}
                            </p>
                        </div>
                        <div className="mb-2 flex items-center gap-x-3">
                            <p className="w-[150px] font-[500]">
                                Educational History: {" "}
                            </p>
                            <p>
                                {apply.educational}
                            </p>
                        </div>
                        <div className="mb-2 flex items-center gap-x-3">
                            <p className="w-[150px] font-[500]">
                                Topics of Interest: {" "}
                            </p>
                            <p>
                                {apply.topics}
                            </p>
                        </div>
                        <p className="mb-1 underline font-[500]">
                            Article Suggestions
                        </p>
                        <div>
                            <div className="flex items-center gap-x-3">
                                <p className="w-[150px] font-[500]">
                                    Title: {" "}
                                </p>
                                <p>
                                    {apply.title}
                                </p>
                            </div>
                            <div  className="flex items-start gap-x-3">
                                <p className="w-[170px] font-[500]">
                                    Summary: {" "}
                                </p>
                                <p className="w-[100%] m-0 text-justify">
                                    {apply.summary}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    )
};

export default ApplyDetail;