import React from 'react';
import Loader from "react-loader-spinner";

const SpinnerLoader = () => {
    return (
        <div>
            <Loader type='Oval' color='black'/>
            <h3>...loading</h3>
        </div>
    );
};

export default SpinnerLoader;