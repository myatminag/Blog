import React, { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ThemeContext } from '../context/theme-context';
import { applyReducer } from '../reducer/apply-reducer';
import Require from '../components/Require';

const Join = () => {

    const navigate = useNavigate();

    /** Theme */
    const [{ theme }] = useContext(ThemeContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [educational, setEducational] = useState('');
    const [topics, setTopics] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');

    /** Apply Reducer */
    const [{ loading, error}, dispatch] = useReducer(applyReducer, {
        loading: true,
        error: ''
    });

    /** Apply Form Handler */
    const applyFormHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: "REQUEST_APPLY" });

            await axios.post(
                'https://thejourney-api.onrender.com/server/apply/submit', {
                    name, email, educational,
                    topics, title, summary
                }
            );
            dispatch({ type: "SUCCESS_APPLY" });
            navigate('/')
        } catch (error) {
            dispatch({ type: "FAIL_APPLY" });
        }
    };

    return (
        <div className="px-3 pt-6 pb-12 xl:px-[15%]">
            <Require />
            <div>
                <header className="mb-3 text-lg font-[600]">
                    Interested in joining? Apply today
                </header>
                <form 
                    onSubmit={applyFormHandler}
                    className="px-6 py-3 rounded-md xl:px-[8rem]" 
                    style={{ backgroundColor: theme.form, color: theme.color }}
                >
                    <div className="mb-4">
                        <label className="block mb-2 uppercase">
                            Full Name
                        </label>
                        <input 
                            type="text"
                            required
                            placeholder="full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-[100%] px-3 py-2  rounded-md focus:outline-none"
                            style={{ backgroundColor: theme.input, color: theme.color }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 uppercase">
                            Email
                        </label>
                        <input 
                            type="email"
                            required
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[100%] px-3 py-2 rounded-md focus:outline-none"
                            style={{ backgroundColor: theme.input, color: theme.color }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">
                            Educational History: {" "}
                            <span className="font-normal">
                                Tell us about your academic and professional qualifications.
                            </span>
                        </label>
                        <textarea 
                            required
                            value={educational}
                            onChange={(e) => setEducational(e.target.value)}
                            className="w-[100%] h-[150px] px-3 py-2 rounded-md focus:outline-none"
                            style={{ backgroundColor: theme.input, color: theme.color }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">
                            Topics of Interest: {" "}
                            <span className="font-normal">
                                Fill the topics you would like to apply for.
                            </span>
                        </label>
                        <input 
                            type="text"
                            required
                            placeholder="topics"
                            value={topics}
                            onChange={(e) => setTopics(e.target.value)}
                            className="w-[100%] px-3 py-2 rounded-md focus:outline-none"
                            style={{ backgroundColor: theme.input, color: theme.color }}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">
                            Article Suggestions: {" "}
                            <span className="font-normal">
                                Propose at least 1 engaging article titles and summaries you would like to write about.
                            </span>
                        </label>
                        <input 
                            type="text"
                            required
                            placeholder="title 1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-[100%] mb-3 px-3 py-2  rounded-md focus:outline-none"
                            style={{ backgroundColor: theme.input, color: theme.color }}
                        />
                        <textarea 
                            required
                            placeholder="summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-[100%] h-[150px] px-3 py-2 rounded-md focus:outline-none"
                            style={{ backgroundColor: theme.input, color: theme.color }}
                        />
                    </div>
                    <div className="w-[100%] my-3 flex items-center justify-center">
                        <button 
                            type='submit'
                            className="w-[100px] py-1 rounded-md bg-[#03a87c] text-white"
                            >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Join;