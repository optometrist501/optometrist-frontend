import React, { useRef, useState } from 'react';
import optometrists from '../../images/optometrists.jpg';
import about from './About.module.css';
import JoditEditor from 'jodit-react';

const About = ({ darkmode }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    // console.log(content)
    console.log(description)
    const [updateModal, setUpdateModal] = useState(100);
    return (
        <div className={`${about.aboutMain} ${darkmode ? about.aboutBackgroundTwo : about.aboutBackground}`}>
            <div style={{ transition: '1s ease-in-out' }} className={` hero min-h-screen ${darkmode ? 'text-white' : 'text-black'}`}>
                <div data-aos='fade-left' duration='300' className="hero-content flex-col lg:flex-row-reverse">
                    < img src={optometrists} className="lg:w-2/6 sm:6/6 rounded-lg shadow-2xl" alt='' />
                    <div data-aos='zoom-in'>
                        <h1 className={`text-5xl font-bold ${about.gradient_text} `}>OPTEMETRISTS</h1>
                        <p className="py-6">Optometry is a healthcare profession that is autonomous, educated, and regulated (licensed/registered) and optometrists are the primary healthcare practitioners of the eye and visual system who provide comprehensive eye and vision care, which includes refraction and dispensing, detection/diagnosis and management of disease in the eye, and the rehabilitation of conditions of the visual system. (World Council of Optometry, WCO)
                            Optometry is a healthcare profession that is autonomous, educated, and regulated (licensed/registered) and optometrists are the primary healthcare practitioners of the eye and visual system who provide comprehensive eye and vision care, which includes refraction and dispensing, detection/diagnosis and management of disease in the eye, and the rehabilitation of conditions of the visual system. (World Council of Optometry, WCO)
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>

                </div>
                <div className={about.aboutUsUpdatePart}>
                    <span onClick={() => setUpdateModal(0)}><i className="uil uil-edit mr-2 cursor-pointer"></i></span>

                </div>
                <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${about.updateModal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <div style={{ transition: '1s ease-in-out' }} className={`${about.updateModalContainer} ${darkmode ? 'bg-black' : 'bg-white'}`}>
                        <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                        <br />
                        <br />
                        <hr />
                        <br />

                        <div className={about.aboutTextEditorContainer}>
                            <div>
                                <p className='italic text-gray-500'>update description here...</p>
                            </div>
                            <br />
                            <div className={about.aboutTextEditor}>
                                <div className={about.aboutTextEditorSection}>
                                    <JoditEditor
                                        ref={editor}
                                        value={description}
                                        onBlur={newContent => setContent(newContent)}
                                        onChange={newContent => { setDescription(newContent) }}
                                    />
                                </div>
                                <br />
                                <div className={about.aboutImgSectionMain}>

                                    <div type="file" className={about.aboutImgSection}>
                                        <div className={about.chooseFileDesign}>
                                            <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                            <input className={about.chooseFile} type="file" name="" id="" />
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className={about.updateButton}>
                                <button className='btn btn-primary'>update</button>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;