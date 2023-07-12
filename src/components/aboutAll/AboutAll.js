import React from 'react';
import aboutAll from './AboutAll.module.css';
import { Link } from 'react-router-dom';

const AboutAll = () => {
    return (
        <div className={aboutAll.aboutAllMain}>
            <div className={aboutAll.aboutAllContainer}>
                <div data-aos='fade-up' duration='300' className={aboutAll.aboutAllSection1}>
                    <div>
                        <Link to='/members'>
                            <p className='text-2xl font-bold'>Our Members</p>
                            <p><i class="uil uil-globe text-9xl font-light text-blue-700"></i></p>
                        </Link>
                    </div>
                </div>
                <div data-aos='fade-up' duration='500' className={aboutAll.aboutAllSection2}>
                    <div>
                        <Link to='works'>
                            <p className='text-2xl font-bold w-ful'>Our Work</p>
                            <p><i class="uil uil-channel text-9xl font-light text-blue-700"></i></p>
                        </Link>
                    </div>
                </div>
                <div data-aos='fade-up' duration='700' className={aboutAll.aboutAllSection3}>
                    <div>
                        <Link to='/partners'>
                            <p className='text-2xl font-bold'>Our Partners</p>
                            <p><i class="uil uil-users-alt text-9xl font-light text-blue-700"></i></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutAll;