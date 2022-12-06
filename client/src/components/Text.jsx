import React from 'react';

const Text = ({ children, post }) => {
    return (
        <div 
            dangerouslySetInnerHTML={{__html: post.description}}
            className="text-justify text-lg"
        >
            { children }
        </div>
    )
};

export default Text;