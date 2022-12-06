import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import Loader from '../components/Loader';

import { AuthContext } from '../context/auth-context';
import { SummaryReducer } from '../reducer/summary-reducer';

const Home = () => {

    /** Author Info */
    const { state } = useContext(AuthContext);
    const { authorInfo } = state;

    /** Summary Reducer */
    const [{ loading, summary, error }, dispatch] = useReducer(SummaryReducer, {
        loading: true,
        error: ''
    });

    /** Fetch Summary Data From Api */
    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                dispatch({ type: "REQUEST_SUMMARY_DATA" });

                const { data } = await axios.get(
                    'https://thejourney-api.onrender.com/server/posts/summary', {
                        headers: { authorization: `Bearer ${authorInfo.token}` }
                    }
                );

                dispatch({
                    type: "SUCCESS_SUMMARY_DATA",
                    payload: data
                });
            } catch (error) {
                dispatch({ 
                    type: "FAIL_SUMMARY_DATA",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                });
            }
        };
        fetchSummaryData();
    }, [authorInfo])

    return (
        <section className="h-[100vh] bg-[#f8f9fa] px-6 py-6">
            <header className="text-2xl font-semibold tracking-wider">
                Welcome: { authorInfo.name }
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
                    <>
                        <div className="mb-5 grid grid-cols-2 gap-x-5">
                            <div className="px-4 py-2 border rounded-md shadow-CustomShadow bg-white">
                                <p className="font-[500] mb-2">
                                    Total Authors
                                </p>
                                <p>
                                    Authors: {summary.authors && summary.authors[0] ? summary.authors[0].totalAuthors : 0}
                                </p>
                            </div>
                            <div className="px-4 py-2 border rounded-md shadow-CustomShadow bg-white">
                                <p className="font-[500] mb-2">
                                    Total Posts
                                </p>
                                <p>
                                    Posts: {summary.posts && summary.posts[0] ? summary.posts[0].totalPosts : 0}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-x-5">
                            <div className="col-span-2 px-4 py-2 border rounded-md shadow-CustomShadow bg-white">
                                <p className="font-[500] mb-2">
                                    Daily New Posts
                                </p>
                                {
                                    summary.dailyPosts.length === 0 ? (
                                        <p>
                                            NO Posts
                                        </p>
                                    ) : (
                                        <Chart 
                                            width="100%"
                                            height="400px"
                                            chartType="AreaChart"
                                            loader={ 
                                                <div className="font-semibold text-sm text-center">
                                                    Loading Chart...
                                                </div> 
                                            }
                                            data={[
                                                ['Date', 'Posts'],
                                                ...summary.dailyPosts.map((post) => [post._id, post.posts])
                                            ]}   
                                        />
                                    )
                                }
                            </div>
                            <div className="col-span-1 px-4 py-2 border rounded-md shadow-CustomShadow bg-white">
                                <p className="font-[500]">
                                    Categories
                                </p>
                                {
                                    summary.postCategories.length === 0 ? (
                                        <p>
                                            NO Posts
                                        </p>
                                    ) : (
                                        <Chart 
                                            width="100%"
                                            height="400px"
                                            chartType="PieChart"
                                            loader={ 
                                                <div className="font-semibold text-sm text-center">
                                                    Loading Chart...
                                                </div> 
                                            }
                                            data={[
                                                ['Date', 'Posts'],
                                                ...summary.postCategories.map((cat) => [cat._id, cat.count])
                                            ]}   
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </section>
    )
}

export default Home