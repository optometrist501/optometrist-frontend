import React, { useEffect, useState } from 'react';
import advertisement from './Advertise.module.css';

const Advertise = ({ darkmode }) => {
    const [updateModal, setUpdateModal] = useState(100);
    const [advertise, setAdvertise] = useState([]);
    console.log(advertise);
    useEffect(() => {
        const url = 'advertise.json';
        fetch(url).then(res => res.json()).then(res => setAdvertise(res));
    }, [])
    return (
        <div className={advertisement.advertiseMain}>
            <div key={advertise?._id} className={advertisement.avertivseContainer}>
                {
                    advertise?.map(add => {
                        return (
                            <div className={advertisement.advertiseImg}>
                                <div className={advertisement.module_border_wrap}>
                                    <div className={advertisement.module}>
                                        <img data-aos='zoom-in' duration='500' src={add.advertiseImg} alt="" />
                                    </div>
                                </div>

                                <span onClick={() => setUpdateModal(0)} className={advertisement.editButton}><i className="uil uil-edit text-white cursor-pointer"></i></span>
                            </div>
                        )
                    })
                }
            </div>

            <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${advertisement.updateModal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                <div style={{ transition: '1s ease-in-out' }} className={`${advertisement.updateModalContainer} ${darkmode ? 'bg-black' : 'bg-white'}`}>
                    <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                    <br />
                    <br />
                    <hr />
                    <br />

                    <div className={advertisement.aboutTextEditorContainer}>
                        <div>
                            <p className='italic text-center text-gray-500'>update Image here...</p>
                        </div>
                        <br />
                        <div className={advertisement.aboutTextEditor}>

                            <br />
                            <div className={advertisement.aboutImgSectionMain}>

                                <div type="file" className={advertisement.aboutImgSection}>
                                    <div className={advertisement.chooseFileDesign}>
                                        <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                        <input className={advertisement.chooseFile} type="file" name="" id="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className={advertisement.updateButton}>
                            <button className='btn btn-primary'>update</button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Advertise;