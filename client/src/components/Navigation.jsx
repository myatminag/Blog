import React, { useContext } from 'react';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../context/theme-context';
import Search from './Search';

const Navigation = () => {

    const [{ theme, isLight }, toggleTheme] = useContext(ThemeContext)

    return (
        <div className="w-[100%] sticky top-0" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
            {/* Mobile Nav */}
            <nav className="px-3 py-3 border-b block lg:hidden">
                <Link to='/'>
                    <p className="mb-2 font-semibold text-center text-lg">
                        The Journey
                    </p>
                </Link>
                <div className="mb-3 flex items-center justify-between">
                    <div className="w-[100%] flex items-center justify-between">
                        <ul className="flex items-center gap-x-3">
                            <Link to="/">
                                <li>
                                    Home
                                </li>
                            </Link>
                            <Link to='/articles'>
                                <li>
                                    Articles
                                </li>
                            </Link>
                        </ul>
                        <div className="flex items-center gap-x-3">
                            <Link to='/join'>
                                <p className="text-sm font-[500] rounded-md px-4 py-1" style={{ backgroundColor: theme.joinBg, color: theme.joinText }}>
                                    Join Us
                                </p>
                            </Link>
                            <button
                                type='button'
                                onClick={toggleTheme}
                            >
                                { 
                                    isLight ? (
                                        <MdOutlineDarkMode size={23} />
                                    ) : (
                                        <MdOutlineLightMode size={23} />
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <Search />
            </nav>
            {/* DeskTop Nav */}
            <nav className="hidden border-b lg:flex px-[15%] py-3 items-center justify-between">
                <div>
                    <Link to='/'>
                        <p className="font-semibold text-xl">
                            The Journey
                        </p>
                    </Link>
                </div>
                <div className="flex items-center gap-x-5">
                    <ul className="flex items-center gap-x-5">
                        <Link to='/'>
                            <li className="uppercase">
                                Home
                            </li>
                        </Link>
                        <Link to='/articles'>
                            <li className="uppercase">
                                Article
                            </li>
                        </Link>
                        <li>
                            <Search />
                        </li>
                    </ul>
                    <div className="flex items-center gap-x-5">
                        <Link to='/join'>
                            <p className="text-sm font-[500] uppercase rounded-md px-4 py-2" style={{ backgroundColor: theme.joinBg, color: theme.joinText }}>
                                Join Us
                            </p>
                        </Link>
                        <button
                            type='button'
                            onClick={toggleTheme}
                        >
                            { 
                                isLight ? (
                                    <MdOutlineDarkMode size={23} />
                                ) : (
                                    <MdOutlineLightMode size={23} />
                                )
                            }
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default Navigation;