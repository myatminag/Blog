import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Navigation from './components/Navigation';
import { ThemeContext } from './context/theme-context';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import PostDetail from './pages/PostDetail';
import Join from './pages/Join';

const App = () => {

    /** Theme */
    const [{ theme }] = useContext(ThemeContext);

    return (
        <Router>
            <div style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
                <Navigation />
                <Routes> 
                    <Route path='/' element={<Home />} />
                    <Route path='post/:id' element={<PostDetail />} />
                    <Route path='/articles' element={<Articles />} />
                    <Route path='/join' element={<Join />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
};

export default App; 