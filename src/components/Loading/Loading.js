import React from 'react';
import { FaSpinner } from 'react-icons/fa'

const Loading = () => {
    return (
        <>
            <h5>
                Loading data...
                <FaSpinner />
            </h5>
        </>
    );
};

export default Loading;