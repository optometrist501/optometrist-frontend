import React, { useEffect, useRef, useState } from 'react';
import galleryMain from './GalleryMain.module.css';
import JoditEditor from 'jodit-react';

const GalleryMain = ({ darkmode }) => {

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [sectionController, setSectionController] = useState(1);
    const [updateModal, setUpdateModal] = useState(100)

    const [imgData, setImgData] = useState([]);

    const [count, setCount] = useState(0);
    const [flipDrawer, setFlipDrawer] = useState(-50);

    const [number, setNumber] = useState(10);
    const [buttonNumber, setButtonNumber] = useState(10);
    const [modifiedButtonNumber, setModifiedButtonNumber] = useState();
    const imgModalData = imgData.slice((number - 10), number);

    const handleModalSection = (value) => {
        if (value === 1) {
            setSectionController(1)
        }
        if (value === 2) {
            setSectionController(2)
        }
    }


    // pagination
    const roundedDataLength = Math.ceil(imgData?.length / 10);
    const totalDataLength = roundedDataLength * 10
    // console.log(totalDataLength)

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

    // console.log(mappedArray.length);

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
    useEffect(() => {
        const url = 'gallery.json';
        fetch(url).then(res => res.json()).then(res => setImgData(res))
    })

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





    return (
        <div className={galleryMain.galleryMain}>
            <div className={galleryMain.galleryMainContainer}>
                <div onMouseLeave={() => setFlipDrawer(-50)} style={{ left: `${flipDrawer}%`, transition: '1s ease-in-out' }} className={galleryMain.galleryFirstPart}>
                    <div className={galleryMain.galleryFirstPartContainer}>

                        <div
                            className={galleryMain.gallery_Main_Title}>
                            <span>
                                <i class="uil uil-image text-xl"></i>
                                <span> GALLERY</span>
                            </span>
                            <span>
                                <i class="uil uil-angle-double-left text-2xl"></i>
                            </span>
                        </div>

                        <div className={galleryMain.galleryFirstPartDetail}>
                            {
                                imgData?.slice((number - 10), number).map(imgData => {
                                    return (
                                        <p title={imgData?.title} className={galleryMain.title}>{imgData?.title?.length > 30 ? imgData?.title?.slice(0, 29) + '...' : imgData?.title}</p>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                <div className={galleryMain.gallerySecondPart}>
                    <div className={galleryMain.gallerySecondPartContainer}>

                        <div className={galleryMain.searchBar}>
                            <span className={galleryMain.bargerRes}> <i onClick={flipDrawer === 0 ? () => setFlipDrawer(50) : () => setFlipDrawer(0)} className=" uil uil-bars ml-2"></i></span>
                            <div className={galleryMain.searchBarContainer}>
                                <div>
                                    <i className="uil uil-search text-xl "></i>
                                    <input className={galleryMain.gallery_input} placeholder='search' type="text" />
                                </div>
                                <i class="uil uil-times text-xl cursor-pointer"></i>
                            </div>

                            <div className={galleryMain.totalImg}>
                                <span>TOTAL IMAGE: {imgData?.length}</span>
                                <span>  |  </span>
                                <span>PAGE: {number.toString().slice(0, (number.toString().length - 1))}</span>
                            </div>
                        </div>
                        <div style={{ transition: '1s ease-in-out' }} className={`${galleryMain.gallery} ${darkmode && 'bg-black'}`}>
                            {
                                imgData?.slice((number - 10), number)?.map((allImg, index) => {
                                    return (
                                        <div data-aos="zoom-in" duration="1200" className={galleryMain.image}>
                                            <img src={allImg.url} alt="" />
                                            <div onClick={() => handleModalImage(index)} className={galleryMain.clickArea}>

                                            </div>
                                            <div className={galleryMain.editAndDelete}>
                                                <div className='w-full flex items-center justify-between'>
                                                    <span onClick={() => setUpdateModal(0)} > <i className="uil uil-edit ml-4"></i></span>
                                                    <span > <i className="uil uil-trash mr-4"></i></span>
                                                </div>
                                            </div>
                                            <p title={allImg.title} className={galleryMain.imgTitle}>{allImg.title.length > 30 ? allImg.title.slice(0, 30) + '...' : allImg.title}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
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
                                <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <div className={galleryMain.eventModalSectionButtons}>
                                    <p onClick={() => handleModalSection(1)} className={galleryMain.eventUpdatebutton}><i class="uil uil-edit mr-2"></i> UPDATE</p>
                                    <p onClick={() => handleModalSection(2)} className={galleryMain.addEventsNewButton}><i class="uil uil-plus-circle mr-2"></i> ADD NEW</p>
                                </div>
                                <div className={galleryMain.eventModalSectionButtons}>
                                    <p className={`${galleryMain.eventUpdateLine} ${sectionController === 1 && galleryMain.brownColor} `}></p>
                                    <p className={`${galleryMain.addEventsNewLine} ${sectionController === 2 && galleryMain.brownColor} `}></p>
                                </div>
                                <div className={galleryMain.ModalSectionContainer}>
                                    <div className={`${sectionController === 1 ? 'block' : 'none'} ${galleryMain.eventUpdateModalSection}`}>
                                        <br />
                                        <div className={galleryMain.eventInputTitle}>
                                            <label htmlFor="">Update Image Title</label>
                                            <input type="text" />
                                        </div>
                                        <br />

                                        <p className='font-bold text-sm mb-3' htmlFor="">Update Image</p>

                                        <div className={galleryMain.eventsImgSectionMain}>

                                            <div type="file" className={galleryMain.eventsImgSection}>
                                                <div className={galleryMain.chooseFileDesign}>
                                                    <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                    <input className={galleryMain.chooseFile} type="file" name="" id="" />
                                                </div>


                                            </div>
                                        </div>
                                        <div className={galleryMain.updateEventButton}>
                                            <button className='btn btn-primary mr-10'><i class="uil uil-edit mr-1"></i>update Image</button>
                                        </div>
                                    </div>

                                    <div className={`${sectionController === 2 ? 'block' : 'none'} ${galleryMain.eventAddNewModalSection}`}>
                                        <br />
                                        <div className={galleryMain.eventInputTitle}>
                                            <label htmlFor="">Add Image Title</label>
                                            <input type="text" />
                                        </div>
                                        <br />
                                        <p className='font-bold text-sm mb-3' htmlFor="">Add Image</p>
                                        <div className={galleryMain.eventsImgSectionMain}>

                                            <div type="file" className={galleryMain.eventsImgSection}>
                                                <div className={galleryMain.chooseFileDesign}>
                                                    <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                    <input className={galleryMain.chooseFile} type="file" name="" id="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={galleryMain.updateEventButton}>
                                            <button className='btn btn-primary mr-10'><i class="uil uil-plus-circle mr-2"></i>Add Image</button>
                                        </div>

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
                                    imgModalData?.map((imgModal) => {
                                        return (
                                            <div style={{ transform: `translateX(${count * -100}%)`, transition: 'transform 1s' }} className="image-modal">

                                                <img style={{ width: '100%', height: 'auto' }} className='maine-img' src={imgModal.url} alt="" />
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

        </div>
    );
};

export default GalleryMain;