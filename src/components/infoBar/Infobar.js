import React from 'react';
import infobar from './Infobar.module.css';

const Infobar = () => {
    return (
        <div className={infobar.infobar}>
            <div className={infobar.infobarContainer}>
                <div className={infobar.infobarInfoOne}>
                    <span><i className="uil uil-phone"></i><span>+880 13002291</span> </span>

                    <span><i class="uil uil-envelope"></i></span>
                    <span>optometrists@gmail.com</span>
                </div>
                <div className={infobar.infobarInfoTwo}>
                    <span><span>Help Desk | Contact Us</span></span>
                </div>
            </div>
        </div>
    );
};

export default Infobar;