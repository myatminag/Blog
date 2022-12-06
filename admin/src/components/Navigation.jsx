import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineLogout, MdOutlineDashboardCustomize, MdOutlineAdminPanelSettings, MdOutlineFeaturedPlayList, MdOutlineVerifiedUser, MdOutlineSettings, MdOutlineManageAccounts } from 'react-icons/md';
import { FaRegListAlt } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi2';

import { AuthContext } from '../context/auth-context';

const Navigation = () => {

    const navigate = useNavigate();

    /** Author Info */
    const { state, dispatch: authDispatch } = useContext(AuthContext);
    const { authorInfo } = state;

    /** Logout */
    const logoutHandler = () => {
        authDispatch({ type: "LOGOUT" });
        localStorage.removeItem('authorInfo');
        navigate('/login');
    };

    /** Navbar Active Css */
    let activeClassCss = "px-4 py-2 rounded-md flex items-center gap-x-2 text-[#ffffff] bg-[#323435] rounded-md";

    return (
        <nav className="h-[100vh] px-6 py-6 flex flex-col justify-between">
            <div>
                <div className="mb-16">
                    <Link to='/'>
                        <p className="text-lg font-semibold text-white">
                            Author Dashboard Panel
                        </p>
                    </Link>
                </div>
                <div>
                    <ul className="flex flex-col gap-y-5">
                        <li className="rounded-md text-[#adb5bd] hover:text-white hover:bg-[#323435] transition duration-100">
                            <NavLink to='/' className={({ isActive }) => isActive ? activeClassCss : "px-4 py-2 rounded-md flex items-center gap-x-2"}>
                                <MdOutlineDashboardCustomize size={20} />
                                <p className="uppercase">
                                    Dashboard
                                </p>
                            </NavLink>
                        </li>
                        <li className="rounded-md text-[#adb5bd] hover:text-white hover:bg-[#323435] transition duration-100">
                            <NavLink to='/postList' className={({ isActive }) => isActive ? activeClassCss : "px-4 py-2 rounded-md flex items-center gap-x-2"}>
                                <MdOutlineFeaturedPlayList size={20} />
                                <p className="uppercase">
                                    Stories
                                </p>
                            </NavLink>
                        </li>
                        <li className="rounded-md text-[#adb5bd] hover:text-white hover:bg-[#323435] transition duration-100">
                            <NavLink to='/authorList' className={({ isActive }) => isActive ? activeClassCss : "px-4 py-2 rounded-md flex items-center gap-x-2"}>
                                <HiOutlineUsers size={20} />
                                <p className="uppercase">
                                    Authors
                                </p>
                            </NavLink>
                        </li>
                        <li className="rounded-md text-[#adb5bd] hover:text-white hover:bg-[#323435] transition duration-100">
                            <NavLink to='/applyList' className={({ isActive }) => isActive ? activeClassCss : "px-4 py-2 rounded-md flex items-center gap-x-2"}>
                                <FaRegListAlt size={20} />
                                <p className="uppercase">
                                    Applicants
                                </p>
                            </NavLink>
                        </li>
                        <li className="rounded-md text-[#adb5bd] hover:text-white hover:bg-[#323435] transition duration-100">
                            <NavLink to='/membership' className={({ isActive }) => isActive ? activeClassCss : "px-4 py-2 rounded-md flex items-center gap-x-2"}>
                                <MdOutlineManageAccounts size={20} />
                                <p className="uppercase">
                                    Membership
                                </p>
                            </NavLink>
                        </li>
                        <li className="px-4 py-2 rounded-md flex items-center gap-x-2 text-[#adb5bd] hover:text-white hover:bg-[#323435] transition duration-100">
                            <MdOutlineSettings size={20} />
                            <p className="uppercase"> 
                                Setting
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <header className="px-4 py-2 text-sm text-[#adb5bd]">
                    Profile
                </header>
                <hr className="mb-3" />
                <ul className="flex flex-col gap-y-5">
                    {
                        authorInfo ? (
                            <>
                            <Link to="/authorInfo">
                                <li className="px-4 py-2 flex items-center gap-x-2 rounded-md hover:bg-[#323435] transition duration-100">
                                    <MdOutlineVerifiedUser size={20} color="white" />
                                    <p className="text-white">
                                        {authorInfo.name}
                                    </p>
                                </li>
                            </Link>
                            <li
                                className="px-4 py-2 rounded-md cursor-pointer bg-[#323435] flex items-center gap-x-2"
                                onClick={logoutHandler}
                                >
                                <MdOutlineLogout size={21} color="white" />
                                <p className="text-white font-[500]">
                                    Log out
                                </p>
                            </li>
                            </>
                        ) : (
                            <li className="px-4 py-2 flex items-center gap-x-2">
                                <MdOutlineAdminPanelSettings size={20} color="white" />
                                <p className="text-white">
                                    Author
                                </p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
};

export default Navigation;