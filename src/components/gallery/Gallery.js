import React, { useEffect, useState } from 'react';
import './Gallery.css'
import { Link } from 'react-router-dom';

const Gallery = ({ darkmode }) => {
    const [imgData, setImgData] = useState([]);
    const [count, setCount] = useState(0);
    const imgModalData = imgData.slice(imgData.length - 6, imgData.length)

    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const url = 'gallery.json';
        fetch(url).then(res => res.json()).then(res => setImgData(res))
    })

    const handleModalImage = (value) => {
        setVisible(true);
        setCount(value);
    }


    const handleDirection = (value) => {
        if (value === 'decrease') {
            if (count === 0) {
                setCount(imgData?.slice(0, 6)?.length - 1)
            } else {
                setCount(count - 1)
            }
        }

        if (value === 'increase') {
            if (count === imgData?.slice(0, 6)?.length - 1) {
                setCount(0)
            } else {
                setCount(count + 1)
            }
        }
    }
    return (
        <div >
            <p style={{ transition: '1s ease-in-out' }} className={`text-5xl font-bold text-center mt-9 mb-9 ${darkmode && 'text-white'}`}>GALLERY </p>

            <div className="gallery">
                {
                    imgModalData?.map((allImg, index) => {
                        return (
                            <div onClick={() => handleModalImage(index)} data-aos="zoom-in" duration="1200" className="image">
                                <img src={allImg.url} alt="" />
                                <p title={allImg.title} className='img-title'>{allImg.title.length > 22 ? allImg.title.slice(0, 22) + '...' : allImg.title}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div style={{ width: '150px', height: '150px' }} className=" flex items-center justify-center mx-auto">
                <Link to='/gallery' ><button className='btn btn-primary '>view more</button></Link>
            </div>
            <div className="gallery-modal-part">
                <div className={`${visible ? 'block' : 'none'}  gallery-modal-section`}>
                    <div className='gallery-modal-main'>
                        <div className="gallery-modal">
                            <i onClick={() => setVisible(false)} className="uil uil-times-circle"></i>
                            <div style={{ width: `${imgModalData?.length * 100}%` }} className="gallery-modal-container">
                                {
                                    imgModalData?.slice(0, 6).map((imgModal) => {
                                        return (
                                            <div style={{ transform: `translateX(${count * -100}%)`, transition: 'transform 1s' }} className="image-modal">
                                                <div>
                                                    <img style={{ width: '100%', height: 'auto' }} className='maine-img' src={imgModal.url} alt="" />
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

export default Gallery;