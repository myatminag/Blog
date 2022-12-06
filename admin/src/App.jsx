import React, { useContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { AuthContext } from './context/auth-context';
import Navigation from './components/Navigation';

const Home = lazy(() => import('./pages/Home'));
const EditPost = lazy(() => import('./pages/EditPost'));
const Login = lazy(() => import('./pages/Login'));
const PostList = lazy(() => import('./pages/PostList'));
const AuthorList = lazy(() => import('./pages/AuthorList'));
const Membership = lazy(() => import('./pages/Membership'));
const AuthorInfo = lazy(() => import('./pages/AuthorInfo'));
const ApplyList = lazy(() => import('./pages/ApplyList'));
const ApplyDetail = lazy(() => import('./pages/ApplyDetail'));

const App = () => {

    /** Author Context */
    const { state } = useContext(AuthContext);
    const { authorInfo } = state;

    return (
        <Router>
            <Suspense>
                <div className="w-[100%] h-[100vh] flex">
                    <div className="w-[18%] bg-[#000000]">
                        <Navigation />
                    </div>
                    <hr />
                    <div className="w-[100%]">
                        <Routes>
                            <Route path='/login' element={!authorInfo ? <Login /> : <Navigate to='/login' />} />
                            <Route path='/' element={authorInfo ? <Home /> : <Navigate to='/login' />} />
                            <Route path='/postList' element={authorInfo ? <PostList /> : <Navigate to='/' />} />
                            <Route path='/postList/:id' element={authorInfo ? <EditPost /> : <Navigate to='/' />} />
                            <Route path='/authorList' element={authorInfo ? <AuthorList /> : <Navigate to='/' />} />
                            <Route path='/membership' element={authorInfo ? <Membership /> : <Navigate to='/' />} />
                            <Route path='/authorInfo' element={authorInfo ? <AuthorInfo /> : <Navigate to='/' />} />
                            <Route path='/applyList' element={authorInfo ? <ApplyList /> : <Navigate to='/' />} />
                            <Route path='/applyList/:id' element={authorInfo ? <ApplyDetail /> : <Navigate to='/' />} />
                        </Routes>
                    </div>
                </div>
            </Suspense>
        </Router>
    )
};

export default App;