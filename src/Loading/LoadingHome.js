import React from 'react';
import loading from './Loding.module.css';

const LoadingHome = () => {
    return (
        <div style={{ height: '100vh', position: 'relative' }} className={`${loading.home} w-full  flex justify-center items-center`}>
            <div>
                <div style={{ margin: 'auto' }}>
                    <span className="loading loading-ball loading-lg text-green-600 font-bold"></span>
                    <span className="loading loading-ball loading-lg text-yellow-400 font-bold"></span>
                    <span className="loading loading-ball loading-lg text-red-500 font-bold"></span>
                </div>
                <div style={{ textAlign: 'center', margin: 'auto', position: 'absolute', bottom: '20px', marginLeft: '10px' }}>
                    <p className='text-blue-300'>powered by</p>
                    <p className='text-blue-300 text-xl font-bold'>WEBGENIX</p>
                </div>
            </div>

        </div>
    );
};

export default LoadingHome;