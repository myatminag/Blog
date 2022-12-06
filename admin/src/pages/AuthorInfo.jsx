import React, { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import { infoUpdateReducer } from '../reducer/infoUpdate-reducer';

const AuthorInfo = () => {

    /** Author Info */
    const { state, dispatch: updateDispatch } = useContext(AuthContext);
    const { authorInfo } = state;

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /** Update Info Reducer */
    const [{ loading }, dispatch ] = useReducer(infoUpdateReducer, {
        loading: false
    }) 

    /** Update Info */
    const updateInfoHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch({ type: "REQUEST_UPDATE_PROFILE" });
            
            const { data } = await axios.put( 
                'https://thejourney-api.onrender.com/server/authors/update', {
                    name, email, password
                }, {
                    headers: { authorization: `Bearer ${authorInfo.token}` }
                }
            );

            updateDispatch({ 
                type: "REQUEST_LOGIN",
                payload: data
            });
            localStorage.setItem('authorInfo', JSON.stringify(data));
            toast.success('Profile Updated');
            navigate('/');
        } catch (error) {
            dispatch({ type: "FAIL_UPDATE_PROFILE" });
            toast.error(error.message);
        }
    };

    return (
        <section className="h-[100vh] relative bg-[#f8f9fa] px-6 py-6">
            <ToastContainer position="bottom-center" limit={1} />
            <header className="text-2xl font-semibold tracking-wider">
                Account Info
            </header>
            <hr className="mt-3 mb-6" />
            <div className="absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-40%]">
                <div className="w-[400px] px-6 py-6 border rounded-md shadow-CustomShadow bg-white">
                    <p className="text-lg font-[500] mb-3">
                        Update Info
                    </p>
                    <form onSubmit={updateInfoHandler}>
                        <div className="mb-4">
                            <label className="block mb-2">
                                Name
                            </label>
                            <input 
                                type="text"
                                required
                                placeholder={authorInfo.name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-[100%] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">
                                Email
                            </label>
                            <input 
                                type="email"
                                required
                                placeholder={authorInfo.email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-[100%] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2">
                                Password
                            </label>
                            <input 
                                type="password"
                                required
                                placeholder="Enter update password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-[100%] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-[100%] py-2 uppercase text-sm bg-[#000000] text-white rounded-md"
                        >
                            Save Changes
                        </button>
                        {
                            loading && (
                                <p>
                                    Loading...
                                </p>
                            )
                        }
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AuthorInfo