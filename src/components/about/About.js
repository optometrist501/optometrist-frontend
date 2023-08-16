import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import about from './About.module.css';
import JoditEditor from 'jodit-react';

import useAboutData from '../../customHooks/useAboutSectionHook';
import axios from 'axios';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import { updloadImage } from '../../fetchedData/fetchPostImageData';
import { Link } from 'react-router-dom';

const About = ({ darkmode }) => {


    const [memberData] = useMemberData();
    const allMembers = memberData?.data?.data?.data;
    const [updateModal, setUpdateModal] = useState(100);
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [imgHolder, setImgHolder] = useState('');
    const [updateContent, setupdateContent] = useState({});
    const [switchUpdate, setSwitchUpdate] = useState(false);
    const [user] = useAuthState(auth)
    const [id, setId] = useState('')

    const [aboutData, refetch] = useAboutData()
    const allAboutData = aboutData?.data?.data?.data;


    const findAboutData = allAboutData?.find(f => {
        return f._id === allAboutData[0]._id
    });

    const findAdmin = allMembers?.find(f => {
        return f?.email === user?.email
    })

    useEffect(() => {
        setContent(findAboutData?.description);
        setImgHolder(findAboutData?.img);

    }, [findAboutData]);




    const updateAboutSection = (theId) => {
        setupdateContent({
            description: description,
            img: imgHolder
        })
        setId(theId);
        setSwitchUpdate(true);
    }

    useEffect(() => {
        if (switchUpdate === true) {
            setTimeout(() => {
                const finalUpdate = async () => {
                    try {
                        await axios.patch(`https://optometrist-server-46oo.onrender.com/api/v1/about/${id}`, updateContent).then(res => console.log(res))
                        refetch();
                        toast.dark("successfully updated");
                    } catch (error) {

                        toast.error("failed to update");
                    }
                }
                finalUpdate()
                setSwitchUpdate(false);
            }, 1000)
        }
    }, [switchUpdate, id, updateContent, refetch])

    return (
        <div className={`${about.aboutMain} ${darkmode ? about.aboutBackgroundTwo : about.aboutBackground}`}>
            <div style={{ transition: '1s ease-in-out' }} className={` hero min-h-screen ${darkmode ? 'text-white' : 'text-black'}`}>
                {
                    allAboutData?.map(data => {
                        return (
                            <div data-aos='fade-left' duration='300' className="hero-content flex-col lg:flex-row-reverse">
                                < img style={{ maxHeight: '450px' }} src={data?.img} className="lg:w-2/6 sm:6/6 rounded-lg shadow-2xl" alt='' />
                                <div data-aos='zoom-in'>
                                    <h1 className={`text-5xl font-bold ${about.gradient_text} `}>OPTOMETRIST</h1>
                                    <p className="py-6" dangerouslySetInnerHTML={{ __html: data?.description?.slice(0, 700) }}>
                                    </p>
                                    <br />
                                    {
                                        data?.description?.length > 700 &&
                                        <button className='btn btn-primary'><Link to='/aboutDetail'>Detail</Link></button>
                                    }
                                </div>

                            </div>
                        )
                    })
                }
                <div className={about.aboutUsUpdatePart}>
                    {
                        findAdmin?.isAdmin &&
                        <span onClick={() => setUpdateModal(0)}><i className="uil uil-edit mr-2 cursor-pointer"></i></span>
                    }

                </div>
                <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${about.updateModal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <div style={{ transition: '1s ease-in-out' }} className={`${about.updateModalContainer} ${darkmode ? 'bg-black' : 'bg-white'}`}>
                        <br />
                        <span style={{ zIndex: '30' }} onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
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
                                        value={content}
                                        onBlur={newContent => setContent(newContent)}
                                        onChange={newContent => { setDescription(newContent) }}
                                    />
                                </div>
                                <br />
                                <div className={about.aboutImgSectionMain}>
                                    <div type="file" className={about.aboutImgSection}>

                                        <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                            {
                                                imgHolder
                                                    ?
                                                    <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                    :
                                                    <span><i class="uil uil-image-v text-8xl"></i></span>
                                            }
                                        </div>
                                        <div className={about.chooseFileDesign}>

                                            <p className='text-white font-bold'>
                                                <i class="uil uil-upload"></i>
                                                <span>Choose File</span>
                                            </p>
                                            <input className={about.chooseFile} type="file" onChange={(e) => {
                                                const imgFile = e.target.files[0];
                                                updloadImage(imgFile, setImgHolder)
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div style={{ position: 'relative' }} className={about.updateButton}>
                                <button onClick={() => updateAboutSection(findAboutData?._id)} className='btn btn-primary'>update</button>
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