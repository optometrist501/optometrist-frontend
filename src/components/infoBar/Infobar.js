import React from 'react';
import infobar from './Infobar.module.css';
import { Link } from 'react-router-dom';
import useHeroData from '../../customHooks/useHeroSectionHook';

const Infobar = () => {
    const [heroData] = useHeroData();
    const allHeroData = heroData?.data?.data?.data;
    return (
        <div className={`${infobar.infobar} print:hidden`}>
            <div className={infobar.infobarContainer}>
                <div className={infobar.infobarInfoOne}>
                    <p className='mr-5'><i className="uil uil-phone"></i> {allHeroData?.[0].infoNumber}</p>
                    <p><i className="uil uil-envelope"></i> {allHeroData?.[0].infoEmail}</p>

                </div>
                <div className={infobar.infobarInfoTwo}>
                    <span><span><Link to='/contact'>Contact Us</Link></span></span>
                </div>
            </div>
        </div>
    );
};

export default Infobar;