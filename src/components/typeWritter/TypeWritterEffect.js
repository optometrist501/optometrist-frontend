import React, { useState } from 'react';
import typeWriter from './TypeWritterEffect.module.css';
import ScrollTrigger from 'react-scroll-trigger';
import Typewriter from 'typewriter-effect';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';
// ..
AOS.init();

const TypeWritterEffect = () => {
    const [counterStart, setCounterStart] = useState(false);
    return (
        <ScrollTrigger onEnter={() => setCounterStart(true)} onExit={() => setCounterStart(false)}>
            <div className={typeWriter.typeWriter}>
                <div data-aos='fade-up' className={typeWriter.typeWriterMain} >
                    <p> <Typewriter

                        options={{
                            strings: ["Protecting your Eyesight", " Protecting your Vision"],
                            autoStart: true,
                            delay: 75,
                            loop: true
                        }}

                    />  </p>
                </div>
                <div data-aos='fade-up' className={typeWriter.increasingNumber}>

                    <div className={typeWriter.increasingNumberOne}>
                        <p style={{ fontSize: '25px' }}>{counterStart && <CountUp start={0} end={200} duration={4}></CountUp>}+</p>
                        <p>EMPLOYEE</p>
                    </div>
                    <div className={typeWriter.increasingNumberTwo}>
                        <p style={{ fontSize: '25px' }}>{counterStart && <CountUp start={0} end={35} duration={4}></CountUp>}+</p>
                        <p>BRANCH</p>
                    </div>

                </div>
            </div>
        </ScrollTrigger>
    );
};

export default TypeWritterEffect;