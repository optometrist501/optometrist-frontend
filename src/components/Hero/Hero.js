import React from 'react';
import hero from './Hero.module.css';
import heroIMg from '../../images/hero.jpg';
import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (
        <div style={{ backgroundImage: `url(${heroIMg})`, backgroundPosition: 'center', backgroundSize: 'cover' }} className={hero.main}>

            <div className={hero.layout}>
                <div>
                    <p className='text-5xl text-white font-bold'>OPTOMETRIST</p>
                    <p className='text-white text-center text-xl'> <Typewriter

                        options={{
                            strings: ["Protecting your Eyesight", " Protecting your Vision"],
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