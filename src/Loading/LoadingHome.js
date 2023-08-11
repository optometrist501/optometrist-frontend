import React from 'react';
import loading from './Loding.module.css';

const LoadingHome = () => {
    return (
        <div style={{ height: '100vh' }} className={`${loading.home} w-full  flex justify-center items-center`}>
            <span className="loading loading-ball loading-lg text-green-600 font-bold"></span>
            <span className="loading loading-ball loading-lg text-yellow-400 font-bold"></span>
            <span className="loading loading-ball loading-lg text-red-500 font-bold"></span>
        </div>
    );
};

export default LoadingHome;