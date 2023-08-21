import React from 'react';
import hero from './Hero.module.css';
import heroImg from '../../images/helo-opto.png';
import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (

        <div className={`${hero.main} hero min-h-screen`} style={{ backgroundImage: `url(${heroImg})` }}>
            <div className="hero-overlay bg-opacity-40"></div>
            <div sty className={`hero-content  text-neutral-content ${hero.heroContainer}`}>
                <div className={`max-w-md `}>
                    {/* <h1 className="mb-5 text-5xl font-bold">OPTOMETRIST</h1> */}
                    <p className='text-5xl font-bold'> <Typewriter
                        options={{
                            strings: ["Batter vision", " For A Better Life"],
                            autoStart: true,
                            delay: 75,
                            loop: true
                        }}
                    />  </p>
                </div>
            </div>
        </div>
    );
};

export default Hero;