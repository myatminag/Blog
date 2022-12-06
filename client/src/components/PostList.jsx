import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../context/theme-context';

const PostList = ({ posts }) => {

    /** Theme */
    const [{ theme }] = useContext(ThemeContext);

    return (
        <div key={posts._id} className="px-3 py-3 xl:p-0">
            <Link to={`/post/${posts._id}`}>
                <div className="w-[100%] rounded-xl" style={{ backgroundColor: theme.cardBg, color: theme.color }}>
                    <img 
                        src={posts.image} 
                        alt="post-image" 
                        loading="lazy"
                        className="w-[100%] h-[210px] object-cover rounded-t-xl"
                    />
                    <div className="px-4 py-3">
                        <p className="h-[50px] mb-1">
                            {posts.article}
                        </p>
                        <div className="flex items-center gap-x-1">
                            <p className="text-sm">
                                {new Date(posts.createdAt).toLocaleDateString('en-us', { month:"long", day:"numeric" })} {" "}•
                            </p>
                            <p className="text-sm">
                                By {posts.author}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default PostList;