import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
    return (
        <section className="px-3 py-6 border-t bg-[#1a202c] xl:px-[15%]">
            <div className="xl:mb-8 xl:flex items-start justify-between">
                <div className="mb-5">
                    <p className="mb-2 text-center text-xl text-white font-[500]">
                        The Journey
                    </p>
                    <ul className="flex flex-col items-center">
                        <li className="mb-1">
                        <p className="text-[#5e8fa7]">
                                Yangon, Myanmar
                        </p>
                        </li>
                        <li>
                            <p className="text-[#5e8fa7] hover:text-white hover:underline transition duration-100 cursor-pointer">
                                mail@thejourney.com
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="mb-5">
                    <p className="mb-2 text-center text-[#5e8fa7] uppercase">
                        Follow Us
                    </p>
                    <ul className="flex items-center justify-center gap-x-5">
                        <li>
                            <FaFacebook size={23} className="text-[#5e8fa7] hover:text-white hover:underline transition duration-100 cursor-pointer" />
                        </li>
                        <li>
                            <FaInstagram size={23} className="text-[#5e8fa7] hover:text-white hover:underline transition duration-100 cursor-pointer" />
                        </li>
                        <li>
                            <FaTwitter size={23} className="text-[#5e8fa7] hover:text-white hover:underline transition duration-100 cursor-pointer" />
                        </li>
                        <li>
                            <FaPinterest size={23} className="text-[#5e8fa7] hover:text-white hover:underline transition duration-100 cursor-pointer" />
                        </li>
                        <li>
                            <FaLinkedin size={23} className="text-[#5e8fa7] hover:text-white hover:underline transition duration-100 cursor-pointer" />
                        </li>
                    </ul>
                </div>
                <div className="mb-2">
                    <p className="mb-2 text-center text-[#5e8fa7] uppercase xl:text-left">
                        Topics
                    </p>
                    <ul className="hidden xl:flex flex-col">
                        <li className="mb-1">
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Art
                            </p>
                        </li>
                        <li className="mb-1">
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Artists
                            </p>
                        </li>
                        <li className="mb-1">
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                History
                            </p>
                        </li>
                        <li className="mb-1">
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Nature
                            </p>
                        </li>
                        <li>
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Philosophy
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="mb-2">
                    <p className="mb-2 text-center text-[#5e8fa7] uppercase xl:text-left">
                        About
                    </p>
                    <ul className="hidden xl:flex flex-col">
                        <li className="mb-1">
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                About us
                            </p>
                        </li>
                        <li className="mb-1">
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Editors
                            </p>
                        </li>
                        <li className="mb-1">
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Authors
                            </p>
                        </li>
                        <li className="mb-1">
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Staff
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="mb-5">
                    <p className="mb-2 text-center text-[#5e8fa7] uppercase xl:text-left">
                        Contact
                    </p>
                    <ul className="flex flex-col items-center xl:items-start">
                        <li>
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Join Us
                            </p>
                        </li>
                        <li>
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Contact Us
                            </p>
                        </li>
                        <li>
                            <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                                Advertise With Us
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mb-5 text-sm flex items-center gap-x-3 justify-center">
                <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                    Term & Conditions
                </p>
                <div className="w-[0.5px] h-[30px] bg-[#5e8fa7]"></div>
                <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                    Privacy
                </p>
                <div className="w-[0.5px] h-[30px] bg-[#5e8fa7]"></div>
                <p className="text-[#5e8fa7] text-sm hover:text-white hover:underline transition duration-100 cursor-pointer">
                    Copyright © 2022
                </p>
            </div>
            <p className="text-center text-xs text-[#5e8fa7]">
                This website is for educational purpose and give credits to all original owners. 
            </p>
        </section>
    )
};

export default Footer;