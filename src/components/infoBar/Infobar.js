import React from 'react';
import infobar from './Infobar.module.css';

const Infobar = () => {
    return (
        <div className={`${infobar.infobar} print:hidden`}>
            <div className={infobar.infobarContainer}>
                <div className={infobar.infobarInfoOne}>
                    <p className='mr-5'><i className="uil uil-phone"></i> +880 13002291</p>
                    <p><i className="uil uil-envelope"></i> optometrists@gmail.com</p>

                </div>
                <div className={infobar.infobarInfoTwo}>
                    <span><span>Contact Us</span></span>
                </div>
            </div>
        </div>
    );
};

export default Infobar;