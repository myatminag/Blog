import React from 'react';
import { ProgressBar } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="px-3 xl:px-[15%] h-[60vh] flex items-center justify-center">
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#03a87c'
                barColor = '#51E5FF'
            />
        </div>
    )
};

export default Loader;