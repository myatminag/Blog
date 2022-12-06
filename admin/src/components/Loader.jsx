import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="w-[100%] h-[50vh] flex items-center justify-center">
            <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#000000" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default Loader