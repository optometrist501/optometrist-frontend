import React, { useEffect, useState } from 'react';
import galleryMain from './GalleryMain.module.css';

import useGalleryData from '../../customHooks/useGallerySectionHook';
import { fetchGetGalleryBySearchData } from '../../fetchedData/fetchGalleryData';
import Loading from '../../Loading/Loading';
import { useLocation } from 'react-router-dom';

const GalleryMain = ({ darkmode }) => {
    const [updateModal, setUpdateModal] = useState(100)
    const [galleryData] = useGalleryData();
    const imgData = galleryData?.data?.data?.data;
    const [count, setCount] = useState(0);
    const [flipDrawer, setFlipDrawer] = useState(-50);

    const [number, setNumber] = useState(10);
    const [buttonNumber, setButtonNumber] = useState(10);
    const [modifiedButtonNumber, setModifiedButtonNumber] = useState();
    const [idContainer, setIdContainer] = useState('');
    const [search, setSearch] = useState('');
    const [galleryBySearchData, setGalleryBySearchData] = useState([]);
    const [roundedDataLength, setRoundedDataLength] = useState();
    const [imgModalData, setImgModalData] = useState()


    const handleModalSection = (value) => {
        setUpdateModal(0);
        setIdContainer(value);

    }

    const findApprovedImgData = imgData?.slice()?.reverse()?.filter(f => {
        return f.approval === true;
    })

    const findApprovedImgDataBySearch = galleryBySearchData?.filter(f => {
        return f.approval === true
    });

    const findDetailImageInfo = findApprovedImgData?.find(f => {
        return f._id === idContainer
    })




    // const imgModalData = findApprovedImgData?.slice((number - 10), number);

    useEffect(() => {
        if (search === '') {
            setImgModalData(findApprovedImgData?.slice((number - 10), number))
        } else {
            setImgModalData(findApprovedImgDataBySearch?.slice((number - 10), number))
        }
    }, [findApprovedImgData, findApprovedImgDataBySearch, number, search])

    // pagination
    useEffect(() => {
        if (search === '') {
            setRoundedDataLength(Math.ceil(findApprovedImgData?.length / 10));

        } else {
            setRoundedDataLength(Math.ceil(findApprovedImgDataBySearch?.length / 10))

        }
    }, [findApprovedImgData?.length, findApprovedImgDataBySearch?.length, search])



    const totalDataLength = roundedDataLength * 10

    const arrayOfObjects = [];
    for (let id = 1; id <= (totalDataLength / 10); id++) {
        const newObj = { id: id };
        arrayOfObjects.push(newObj);
    }

    let mappedArray = arrayOfObjects.map((obj) => {
        return {
            ...obj,
        };
    });


    const handlePage = (value) => {
        const pageNumber = value * 10;
        setNumber(pageNumber)
    }

    const makeLastDigitZero = (number) => {
        if (number % 10 !== 0) {
            number = Math.ceil(number / 10) * 10;
        }
        setModifiedButtonNumber(number)
    }

    useEffect(() => {
        makeLastDigitZero(mappedArray?.length)
        if (modifiedButtonNumber < buttonNumber) {
            setButtonNumber(10)

        };
    }, [buttonNumber, mappedArray, modifiedButtonNumber]);

    const handlePageButton = (value) => {
        if (value === 'decrease' && buttonNumber > 10) {
            setButtonNumber(buttonNumber - 10)
        } else if (value === 'increase') {
            setButtonNumber(buttonNumber + 10)
        }
    }


    const [visible, setVisible] = useState(false)


    const handleModalImage = (value) => {

        const middleValue = (number - 10) + value;
        const lastValue = middleValue - (number - 10)
        setVisible(true);
        setCount(lastValue);
    }

    const handleDirection = (value) => {
        if (value === 'decrease') {
            if (count === 0) {
                setCount(imgModalData?.length - 1)
            } else {
                setCount(count - 1)
            }
        }

        if (value === 'increase') {
            if (count === imgModalData?.length - 1) {
                setCount(0)
            } else {
                setCount(count + 1)
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchGetGalleryBySearchData(search);
                setGalleryBySearchData(response?.data?.data?.data)
            } catch (error) {

            }
        }
        fetchData()

    }, [search])

    const getSingleBlogFromTitle = (valueFromTitle) => {
        setIdContainer(valueFromTitle)
        setUpdateModal(0)
    }

    const pageLocation = useLocation();

    useEffect(() => {
        document.title = `oabd-${pageLocation?.pathname?.slice(1)}`;
    }, [pageLocation]);

    if (galleryData?.data?.statusCode !== 200) {
        return <Loading></Loading>
    }


    return (
        <div className={`${galleryMain.galleryMain} ${darkmode ? 'bg-black' : 'bg-white'}`}>
            <div className={galleryMain.galleryMainContainer}>
                <div onMouseLeave={() => setFlipDrawer(-50)} style={{ left: `${flipDrawer}%`, transition: '1s ease-in-out' }} className={galleryMain.galleryFirstPart}>
                    <div className={galleryMain.galleryFirstPartContainer}>

                        <div
                            className={galleryMain.gallery_Main_Title}>
                            <span>
                                <i class="uil uil-image text-xl"></i>
                                <span> GALLERY</span>
                            </span>

                        </div>

                        <div className={galleryMain.galleryFirstPartDetail}>
                            {
                                search === '' ?
                                    <div>
                                        {
                                            findApprovedImgData?.slice((number - 10), number)?.map(imgData => {
                                                return (
                                                    <p onClick={() => getSingleBlogFromTitle(imgData?._id)} title={imgData?.title} className={galleryMain.title}>{imgData?.title?.length > 30 ? imgData?.title?.slice(0, 29) + '...' : imgData?.title}</p>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div>
                                        {
                                            findApprovedImgDataBySearch?.length > 0 &&
                                            findApprovedImgDataBySearch?.slice((number - 10), number)?.map(imgData => {
                                                return (
                                                    <p onClick={() => getSingleBlogFromTitle(imgData?._id)} title={imgData?.title} className={galleryMain.title}>{imgData?.title?.length > 30 ? imgData?.title?.slice(0, 29) + '...' : imgData?.title}</p>
                                                )
                                            })
                                        }
                                        {findApprovedImgDataBySearch?.length === 0 &&
                                            <p className='text-red-600 ml-3'>Found nothing from search result</p>
                                        }
                                    </div>
                            }
                        </div>

                    </div>
                </div>
                <div className={galleryMain.gallerySecondPart}>
                    <div className={`${galleryMain.gallerySecondPartContainer} ${darkmode ? 'bg-black' : 'bg-white'}`}>

                        <div className={galleryMain.searchBar}>
                            <span className={galleryMain.bargerRes}> <i onClick={flipDrawer === 0 ? () => setFlipDrawer(50) : () => setFlipDrawer(0)} className=" uil uil-bars ml-2"></i></span>
                            <div className={galleryMain.searchBarContainer}>
                                <div>
                                    <i className="uil uil-search text-xl "></i>
                                    <input
                                        className={galleryMain.gallery_input}
                                        placeholder='search'
                                        type="text"
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                    />
                                </div>
                                <i onClick={() => setSearch('')} className="uil uil-times text-xl cursor-pointer"></i>
                            </div>

                            <div className={galleryMain.totalImg}>
                                <span>TOTAL IMAGE: {search === '' ? findApprovedImgData?.length : findApprovedImgDataBySearch?.length}</span>
                                <span>  |  </span>
                                <span>PAGE: {number.toString().slice(0, (number.toString().length - 1))}</span>
                            </div>
                        </div>
                        {
                            search === ''
                                ?
                                <div style={{ transition: '1s ease-in-out' }} className={`${galleryMain.gallery} ${darkmode && 'bg-black'}`}>
                                    {
                                        findApprovedImgData?.slice((number - 10), number)?.map((allImg, index) => {
                                            return (
                                                <div data-aos="zoom-in" duration="1200" className={galleryMain.image}>
                                                    {

                                                        <div>
                                                            <img src={allImg?.imgLink} alt="" />
                                                            <div onClick={() => handleModalImage(index)} className={galleryMain.clickArea}>

                                                            </div>
                                                            <div className={galleryMain.editAndDelete}>
                                                                <div className='w-full flex items-center justify-between'>
                                                                    <span onClick={() => handleModalSection(allImg?._id)} > <i className="uil uil-eye ml-4"></i></span>

                                                                </div>
                                                            </div>
                                                            <p title={allImg.title} className={galleryMain.imgTitle}>{allImg.title.length > 30 ? allImg.title.slice(0, 30) + '...' : allImg.title}</p>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div>
                                    {
                                        findApprovedImgDataBySearch?.length > 0 &&
                                        <div style={{ transition: '1s ease-in-out' }} className={`${galleryMain.gallery} ${darkmode && 'bg-black'}`}>
                                            {
                                                findApprovedImgDataBySearch?.slice((number - 10), number)?.map((allImg, index) => {
                                                    return (
                                                        <div data-aos="zoom-in" duration="1200" className={galleryMain.image}>
                                                            {findApprovedImgDataBySearch?.length > 0 &&
                                                                <div>
                                                                    <img src={allImg?.imgLink} alt="" />
                                                                    <div onClick={() => handleModalImage(index)} className={galleryMain.clickArea}>

                                                                    </div>
                                                                    <div className={galleryMain.editAndDelete}>
                                                                        <div className='w-full flex items-center justify-between'>
                                                                            <span onClick={() => handleModalSection(allImg?._id)} > <i className="uil uil-eye ml-4"></i></span>

                                                                        </div>
                                                                    </div>
                                                                    <p title={allImg.title} className={galleryMain.imgTitle}>{allImg.title.length > 30 ? allImg.title.slice(0, 30) + '...' : allImg.title}</p>

                                                                </div>

                                                            }

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                    {
                                        findApprovedImgDataBySearch?.length === 0 &&
                                        <div style={{ width: '98%', height: '400px', boxShadow: ' 0 0 10px rgba(0, 0, 0, 0.2)', margin: 'auto', marginTop: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p className='text-red-600'>Found nothing from search result</p>
                                        </div>
                                    }
                                </div>

                        }
                        <div className={galleryMain.pagination} >

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <button onClick={() => handlePageButton('decrease')}> <p style={{ fontSize: '25px', marginRight: '10px' }}> <i className='uil uil-angle-left-b'></i></p> </button>
                                {
                                    mappedArray?.slice((buttonNumber - 10), buttonNumber).map(m => {
                                        return (
                                            <div key={m.id} onClick={() => handlePage(m.id)} style={{ height: '25px', width: '25px', border: '1px solid blue', borderRadius: '5px', margin: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <p >{m.id}</p>
                                            </div>
                                        )
                                    })
                                }
                                <button onClick={() => handlePageButton('increase')}> <p style={{ fontSize: '25px', marginLeft: '10px' }}><i className='uil uil-angle-right-b'></i></p></button>
                            </div>
                        </div>
                        <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${galleryMain.updateModal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                            <div style={{ transition: '1s ease-in-out' }} className={`${galleryMain.updateModalContainer} ${darkmode ? 'bg-black' : 'bg-white'}`}>
                                <br />
                                <br />
                                <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <div className={galleryMain.modalCover}>
                                    <div className={galleryMain.modalImg}>
                                        <img src={findDetailImageInfo?.imgLink} alt="" />
                                    </div>
                                    <br />
                                    <div className={galleryMain.modalTitle}>
                                        <p className='text-center text-2xl'>{findDetailImageInfo?.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallery-modal-part">
                <div className={`${visible ? 'block' : 'none'}  gallery-modal-section`}>
                    <div className='gallery-modal-main'>
                        <div className="gallery-modal">
                            <i onClick={() => setVisible(false)} className="uil uil-times-circle"></i>
                            <div style={{ width: `${imgModalData?.length * 100}%` }} className="gallery-modal-container">
                                {
                                    imgModalData?.slice()?.map((imgModal) => {
                                        return (
                                            <div style={{ transform: `translateX(${count * -100}%)`, transition: 'transform 1s' }} className="image-modal">

                                                <img className='maine-img' src={imgModal?.imgLink} alt="" />
                                                <div >
                                                    <p style={{ position: 'absolute', top: '20px', left: '25px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '95%', padding: '5px', borderRadius: '5px' }}>{imgModal.title}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className='gallerySlideController'>
                        <div className='gallerySlideControllerMain'>
                            <span onClick={() => handleDirection('decrease')}> <p style={{ color: 'blue' }}><i class="uil uil-angle-left-b"></i></p> </span>
                            <span onClick={() => handleDirection('increase')}> <p style={{ color: 'blue' }}><i class="uil uil-angle-right-b"></i></p> </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={galleryMain.fakeNavBackground}>

            </div>
        </div>
    );
};

export default GalleryMain;