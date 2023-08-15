import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import banner from './Banner.module.css';
import Lottie from 'react-lottie';
import loadingData from '../lottieFiles/97930-loading.json';
import useBannerData from '../../customHooks/useBannerSectionHook';
import { fetchDeleteBannerData, fetchPostBannerData, fetchUpdateBannerData } from '../../fetchedData/fetchBannerData';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { updloadForBannerImage } from '../../fetchedData/fetchPostImageData';

const Banner = ({ darkmode }) => {
    const [memberData] = useMemberData();
    const allMembers = memberData?.data?.data?.data;
    const [updateModal, setUpdateModal] = useState(100);
    const [sectionController, setSectionController] = useState(1);
    const [bannerDataContainer, setBannerDataContainer] = useState({});
    const [updateBannerDataContainer, setUpdateBannerDataContainer] = useState({});
    const [idContainer, setIdContainer] = useState('');
    const [bannerData, refetch] = useBannerData();
    const data = bannerData?.data?.data?.data;
    const [user] = useAuthState(auth);




    const findAdmin = allMembers?.find(f => {
        return f?.email === user?.email;
    })



    const postBannerData = async () => {
        await fetchPostBannerData(bannerDataContainer, refetch);
        toast.dark('Banner Image added successfully')
    }

    const updateBannerData = async () => {
        await fetchUpdateBannerData(idContainer, updateBannerDataContainer, refetch);
        toast.dark('Banner updated successfully');
    };

    const deleteBannerData = async (idForDelete) => {
        if (idForDelete) {
            const result = window.confirm('are you sure to delete this item?');
            if (result) {
                await fetchDeleteBannerData(idForDelete, refetch);
                toast.dark('successfully deleted');
            }
        }

    }



    const handleModalSection = (value) => {
        if (value === 1) {
            setSectionController(1)
        }
        if (value === 2) {
            setSectionController(2)
        }
    }
    // lottie animation
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
    };

    const [copiedData, setCopiedData] = useState([]);


    const [count, setCount] = useState(0);
    const [pause, setPause] = useState(false);


    const findImageIdMapped = data?.map(m => {
        return m._id
    })

    const findImageId = findImageIdMapped?.slice(0, 1);



    const findFirstImage = data?.find(f => {
        return f._id === findImageId[0]
    });


    useEffect(() => {
        const handleTransition = () => {
            if (pause) {
                const increase = count + 0;
                setCount(increase)
            } else {
                const increase = count + 1;
                setCount(increase)
            }

            if ((data?.length) <= (count)) {
                setCount(0)
            }
            if (copiedData) {
                if (data) {
                    setCopiedData([...data, findFirstImage])
                }
            }
        };
        const interval = setInterval(handleTransition, 4000)
        return () => {
            clearInterval(interval);
        };
    }, [count, data, copiedData, findFirstImage, pause]);

    const handlePageButton = (value) => {
        if (value === 'decrease') {
            if (count === 1) {
                setCount(data?.result?.length)
            } else {
                setCount(count - 1)
            }
        }

        if (value === 'increase') {
            if (count === data?.result?.length) {
                setCount(0);
            } else {
                setCount(count + 1);
            }
        }
    }

    const handleUpdateBanner = (value) => {
        setUpdateModal(0);
        setIdContainer(value);
    }

    return (
        <div className={banner.banner}>
            <div className={banner.bannerMain}>

                {
                    data ? copiedData?.map(d =>
                        <div key={d.id}

                            style={{
                                transition: `transform ${count > 0 ? 1 : 0}s`,
                                transform: `translateX(${count * -100}%)`,
                            }}

                        >
                            <div

                                style={{ width: '92vw', marginTop: '92px' }}
                                onMouseEnter={() => setPause(true)}
                                onMouseLeave={() => setPause(false)}
                            >
                                <img className={banner.bannerImage} src={d?.img} alt="" />
                                {
                                    findAdmin?.isAdmin &&
                                    <div className={banner.editAndDelete}>
                                        <span onClick={() => handleUpdateBanner(d?._id)} ><i className="uil uil-edit cursor-pointer"></i></span>
                                        {
                                            data?.length > 1 &&
                                            <span onClick={() => deleteBannerData(d?._id)}><i className="uil uil-trash-alt ml-3 cursor-pointer"></i></span>
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                    )
                        :
                        <div className={banner.lottieAnimation}>
                            <Lottie options={defaultOptions} />
                        </div>
                }
            </div>
            <div className={banner.bannerSlideController}>
                <div className={banner.bannerSlideControllerMain}>
                    <span onClick={() => handlePageButton('decrease')}><i class="uil uil-angle-left-b"></i></span>
                    <span onClick={() => handlePageButton('increase')}><i class="uil uil-angle-right-b"></i></span>
                </div>
            </div>
            <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${banner.updateModal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>

                <div style={{ transition: '1s ease-in-out' }} className={`${banner.updateModalContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <br />
                    <br />
                    <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                    <br />
                    <br />
                    <hr />
                    <div className={banner.bannerImgPreview}>
                        {
                            data && data?.map(banners => {
                                return (
                                    <div className={banner.bannerImgPreviewContainer}>
                                        <img src={banners?.img} alt="" />
                                        <div className={banners?._id === idContainer ? `${banner.block}` : `${banner.none}`}>
                                            <div className={banner.selectedIconContainer}>
                                                <i className="uil uil-check-circle text-8xl text-white"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={banner.eventModalSectionButtons}>
                        <p onClick={() => handleModalSection(1)} className={banner.eventUpdatebutton}><i class="uil uil-edit mr-2"></i> UPDATE</p>
                        <p onClick={() => handleModalSection(2)} className={banner.addEventsNewButton}><i class="uil uil-plus-circle mr-2"></i> ADD NEW</p>
                    </div>
                    <div className={banner.eventModalSectionButtons}>
                        <p className={`${banner.eventUpdateLine} ${sectionController === 1 && banner.brownColor} `}></p>
                        <p className={`${banner.addEventsNewLine} ${sectionController === 2 && banner.brownColor} `}></p>
                    </div>
                    <div className={banner.ModalSectionContainer}>
                        <div className={`${sectionController === 1 ? 'block' : 'none'} ${banner.eventUpdateModalSection}`}>

                            <div className={banner.eventsImgSectionMain}>

                                <div type="file" className={banner.eventsImgSection}>
                                    <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                        {
                                            updateBannerDataContainer?.img
                                                ?
                                                <img style={{ height: '100px', width: '150px' }} src={updateBannerDataContainer?.img} alt="" />
                                                :
                                                <span><i class="uil uil-image-v text-8xl"></i></span>
                                        }
                                    </div>
                                    <div className={banner.chooseFileDesign}>
                                        <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                        <input className={banner.chooseFile} type="file" name="" id=""
                                            onChange={(e) => {
                                                const imgFile = e.target.files[0];
                                                updloadForBannerImage(imgFile, setBannerDataContainer, setUpdateBannerDataContainer)
                                            }}
                                        />
                                    </div>


                                </div>
                            </div>
                            <div className={banner.updateEventButton}>
                                <button onClick={updateBannerData} className='btn btn-primary mr-10'><i class="uil uil-edit mr-1"></i>update Banner</button>
                            </div>
                        </div>

                        <div className={`${sectionController === 2 ? 'block' : 'none'} ${banner.eventAddNewModalSection}`}>


                            <div className={banner.eventsImgSectionMain}>

                                <div type="file" className={banner.eventsImgSection}>
                                    <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                        {
                                            bannerDataContainer?.img
                                                ?
                                                <img style={{ height: '100px', width: '150px' }} src={bannerDataContainer?.img} alt="" />
                                                :
                                                <span><i class="uil uil-image-v text-8xl"></i></span>
                                        }
                                    </div>
                                    <div className={banner.chooseFileDesign}>
                                        <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                        <input className={banner.chooseFile} type="file" name="" id=""
                                            onChange={(e) => {
                                                const imgFile = e.target.files[0];
                                                updloadForBannerImage(imgFile, setBannerDataContainer, setUpdateBannerDataContainer)
                                            }} />
                                    </div>
                                </div>
                            </div>
                            <div className={banner.updateEventButton}>
                                <button onClick={postBannerData} className='btn btn-primary mr-10'><i class="uil uil-plus-circle mr-2"></i>Add Banner</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;