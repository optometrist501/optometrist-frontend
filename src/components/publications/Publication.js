import React, { useEffect, useState } from 'react';
import events from './Publication.module.css';

const Publication = () => {
    const [imgData, setImgData] = useState([]);

    const [flipDrawer, setFlipDrawer] = useState(-50);

    const [number, setNumber] = useState(10);
    const [buttonNumber, setButtonNumber] = useState(10);
    const [modifiedButtonNumber, setModifiedButtonNumber] = useState();


    // pagination
    const roundedDataLength = Math.ceil(imgData?.length / 10);
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

    useEffect(() => {
        const url = 'gallery.json';
        fetch(url).then(res => res.json()).then(res => setImgData(res))
    })


    return (
        <div className={events.eventsMain}>
            <div className={events.eventsMainContainer}>
                <div onMouseLeave={() => setFlipDrawer(-50)} style={{ left: `${flipDrawer}%`, transition: '1s ease-in-out' }} className={events.eventsFirstPart}>
                    <div className={events.eventsFirstPartContainer}>


                        <div
                            className={events.events_Main_Title}>
                            <span>
                                <i class="uil uil-newspaper text-xl"></i>
                                <span> PUBLICATIONS</span>
                            </span>
                            <span>
                                <i class="uil uil-angle-double-left text-2xl"></i>
                            </span>
                        </div>
                        <div className={events.eventsFirstPartDetail}>
                            {
                                imgData?.slice((number - 10), number).map(imgData => {
                                    return (
                                        <p title={imgData?.title} className={events.title}>{imgData?.title?.length > 30 ? imgData?.title?.slice(0, 29) + '...' : imgData?.title}</p>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                <div className={events.eventsSecondPart}>
                    <div className={events.eventsSecondPartContainer}>

                        <div className={events.searchBar}>
                            <span className={events.bargerRes}> <i onClick={flipDrawer === 0 ? () => setFlipDrawer(50) : () => setFlipDrawer(0)} className=" uil uil-bars ml-2"></i></span>
                            <div className={events.searchBarContainer}>
                                <i className="uil uil-search text-xl "></i>
                                <input className={events.gallery_input} placeholder='search' type="text" />
                                <i class="uil uil-times text-xl cursor-pointer"></i>
                            </div>

                            <div className={events.totalImg}>
                                <span>TOTAL PB: {imgData?.length}</span>
                                <span>  |  </span>
                                <span>PAGE: {number.toString().slice(0, (number.toString().length - 1))}</span>
                            </div>
                        </div>
                        <div className={events.events}>

                        </div>
                        <div className={events.pagination} >

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <button onClick={() => handlePageButton('decrease')}> <p style={{ fontSize: '25px', marginRight: '25px' }}> <i className='uil uil-angle-left-b'></i></p> </button>
                                {
                                    mappedArray?.slice((buttonNumber - 10), buttonNumber).map(m => {
                                        return (
                                            <div key={m.id} onClick={() => handlePage(m.id)} style={{ height: '25px', width: '25px', border: '1px solid blue', borderRadius: '5px', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <p >{m.id}</p>
                                            </div>
                                        )
                                    })
                                }
                                <button onClick={() => handlePageButton('increase')}> <p style={{ fontSize: '25px', marginLeft: '25px' }}><i className='uil uil-angle-right-b'></i></p></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publication;