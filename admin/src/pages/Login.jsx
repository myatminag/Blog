import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginSvg from '../assets/login.svg';
import { AuthContext } from '../context/auth-context';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /** Auth Context */
    const { dispatch: authDispatch } = useContext(AuthContext);

    /** Login */
    const loginHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const { data } = await axios.post(
                'https://thejourney-api.onrender.com/server/auth/login', {
                    email, password
                }
            )

            authDispatch({
                type: "REQUEST_LOGIN",
                payload: data
            });
            localStorage.setItem('authorInfo', JSON.stringify(data));
            navigate('/');
        } catch (error) {
            toast.error('Invalid Email or Password!');
        }
    };

    return (
        <section className="h-[100vh] relative bg-[#f8f9fa] px-6 py-6">
            <ToastContainer position="bottom-center" limit={1} />
            <div className="w-[100%] flex items-start justify-between">
                <header className="text-2xl font-semibold tracking-wider">
                    Become an author?
                </header>
                <div>
                    <p className="text-xs">
                        email: admin@admin.com
                    </p>
                    <p className="text-xs">
                        password: #admin2001
                    </p>
                </div>
            </div>
            <hr className="mt-3 mb-6" />
            <div className="absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-40%]">
                <div className="w-[400px] px-6 py-6 border rounded-md shadow-CustomShadow bg-white">
                    <p className="text-lg font-[500] mb-1">
                        Hello!
                    </p>
                    <p className="text-lg font-[500] mb-3">
                        Login to publish article..
                    </p>
                    <form onSubmit={loginHandler}>
                        <div className="mb-4">
                            <label className="block mb-2">
                                Email
                            </label>
                            <input 
                                type="email"
                                required
                                placeholder="email"
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
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-[100%] bg-transparent px-3 py-2 border border-black rounded-md focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-[100%] py-2 uppercase text-sm bg-[#000000] text-white rounded-md"
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                    </form>
                    <p className="mt-5 text-sm text-center">
                        Forget Password
                    </p>
                </div>
            </div>
        </section>
    )
};

export default Login;