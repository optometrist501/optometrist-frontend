import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import advertisement from './Advertise.module.css';
import useAdvertiseData from '../../customHooks/useAdvertiseSectionHook';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import useMemberData from '../../customHooks/useMemberSectionHook';

const Advertise = ({ darkmode }) => {
    const [updateModal, setUpdateModal] = useState(100);
    const [idContainer, setIdContainer] = useState('');
    const [imgHolder, setImgHolder] = useState('');
    const [updateContent, setupdateContent] = useState({});
    const [switchUpdate, setSwitchUpdate] = useState(false);
    const [user] = useAuthState(auth);
    const [memberData] = useMemberData();
    const allMembers = memberData?.data?.data?.data;

    const [advertiseData, refetch] = useAdvertiseData();
    const advertise = advertiseData?.data?.data?.data;

    const handleUpdateModal = (value) => {
        setUpdateModal(0);
        setIdContainer(value)
    }

    const findAdvertiseData = advertise?.find(f => {
        return f._id === idContainer
    });

    const findAdmin = allMembers?.find(f => {
        return f?.email === user?.email;
    })


    useEffect(() => {
        setImgHolder(findAdvertiseData?.img);

    }, [findAdvertiseData]);

    useEffect(() => {
        if (imgHolder !== findAdvertiseData?.img) {
            const imgStorageKey = `${process.env.REACT_APP_IMG_STORAGE_KEY}`;
            const formData = new FormData();
            formData.append('image', imgHolder);
            const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(result => {

                    setImgHolder(result?.data?.url);
                })
        }
    }, [imgHolder, findAdvertiseData]);




    const updateAdvertiseData = () => {
        setupdateContent({
            img: imgHolder
        })
        setSwitchUpdate(true)
    };

    useEffect(() => {
        if (switchUpdate === true) {
            setTimeout(() => {
                const finalUpdate = async () => {
                    try {
                        await axios.patch(`https://optometrist-server-46oo.onrender.com/api/v1/advertise/${idContainer}`, updateContent).then(res => console.log(res))
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
    }, [idContainer, switchUpdate, refetch, updateContent])

    return (
        <div className={advertisement.advertiseMain}>
            <div className={advertisement.avertivseContainer}>
                {
                    advertise?.map(add => {
                        return (
                            <div className={advertisement.advertiseImg}>
                                <div className={advertisement.module_border_wrap}>
                                    <div className={advertisement.module}>
                                        <img className='h-80 w-full' data-aos='zoom-in' duration='500' src={add.img} alt="" />
                                    </div>
                                </div>

                                {
                                    findAdmin?.isAdmin &&
                                    <span onClick={() => handleUpdateModal(add?._id)} className={advertisement.editButton}><i className="uil uil-edit text-white cursor-pointer"></i></span>
                                }
                            </div>
                        )
                    })
                }
            </div>

            <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${advertisement.updateModal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                <div style={{ transition: '1s ease-in-out' }} className={`${advertisement.updateModalContainer} ${darkmode ? 'bg-black' : 'bg-white'}`}>
                    <br />
                    <br />
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
                                    <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                        {
                                            imgHolder
                                                ?
                                                <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                :
                                                <span><i class="uil uil-image-v text-8xl"></i></span>
                                        }
                                    </div>
                                    <div className={advertisement.chooseFileDesign}>
                                        <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                        <input className={advertisement.chooseFile} type="file" name="" id=""
                                            onChange={(e) => {
                                                const imgFile = e.target.files[0];
                                                setImgHolder(imgFile)
                                            }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div style={{ position: 'relative' }} className={advertisement.updateButton}>
                            <button onClick={updateAdvertiseData} className='btn btn-primary'>update</button>
                            < ToastContainer style={{ position: 'absolute', top: '0' }} />
                        </div>
                        <br />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Advertise;