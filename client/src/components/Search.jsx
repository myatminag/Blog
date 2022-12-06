import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

const Search = () => {

    const navigate = useNavigate();

    const [query, setQuery] = useState('');

    /** Search Handler */
    const searchInputHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/articles/?query=${query}` : '/articles')
    };

    return (
        <form 
            className="flex items-center border px-2 py-1 rounded-md" 
            onSubmit={searchInputHandler}
        >
            <button type="submit"> 
                <MdSearch 
                    size={22} 
                    className="cursor-pointer" 
                />
            </button>
            <input 
                type="text"
                placeholder="Search Aritcle" 
                onChange={(e) => setQuery(e.target.value)}
                className=" w-[100%] px-3 py-1 placeholder:text-sm focus:outline-none bg-transparent"
            />
        </form>
    )
};

export default Search;