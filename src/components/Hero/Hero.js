import React from 'react';
import hero from './Hero.module.css';
import heroImg from '../../images/hero.jpg';
import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (

        <div className={`${hero.main} hero min-h-screen`} style={{ backgroundImage: `url(${heroImg})` }}>
            <div class="hero-overlay bg-opacity-60"></div>
            <div class="hero-content text-center text-neutral-content">
                <div class="max-w-md">
                    <h1 class="mb-5 text-5xl font-bold">OPTOMETRIST</h1>
                    <p> <Typewriter
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