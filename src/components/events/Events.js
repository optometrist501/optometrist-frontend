import React, { useEffect, useRef, useState } from 'react';
import events from './Events.module.css';
import useEventData from '../../customHooks/useEventSectionHook';
import { fetchGetEventBySearchData } from '../../fetchedData/fetchEventData';
import Loading from '../../Loading/Loading';
import { useLocation } from 'react-router-dom';

const Events = ({ darkmode }) => {

    const [eventData] = useEventData();
    const allEvents = eventData?.data?.data?.data;

    const [updateModal, setUpdateModal] = useState(100);


    const [flipDrawer, setFlipDrawer] = useState(-50);

    const [number, setNumber] = useState(10);
    const [buttonNumber, setButtonNumber] = useState(10);
    const [modifiedButtonNumber, setModifiedButtonNumber] = useState();
    const [idContainer, setIdContainer] = useState('');
    const [search, setSearch] = useState('');
    const [eventBySearchData, setEventBySearchData] = useState([]);
    const [roundedDataLength, setRoundedDataLength] = useState();

    const findApprovedEventData = allEvents?.slice()?.reverse()?.filter(f => {
        return f.approval === true;
    })

    const findApprovedEventDataBySearch = eventBySearchData?.filter(f => {
        return f.approval === true;
    })



    const findDetailEvents = findApprovedEventData?.find(f => {
        return f._id === idContainer;
    })


    const handleModalSection = (value) => {
        setUpdateModal(0);
        setIdContainer(value);
    }


    // pagination
    useEffect(() => {
        if (search === '') {
            setRoundedDataLength(Math.ceil(findApprovedEventData?.length / 10))
        } else {
            setRoundedDataLength(Math.ceil(findApprovedEventDataBySearch?.length / 10))
        }
    }, [findApprovedEventData?.length, findApprovedEventDataBySearch?.length, search])
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
        async function fetchData() {
            try {
                const response = await fetchGetEventBySearchData(search);
                setEventBySearchData(response?.data?.data?.data)
            } catch (error) {

            }
        }
        fetchData()

    }, [search])

    const getSingleEventFromTitle = (valueFromTitle) => {
        setIdContainer(valueFromTitle)
        setUpdateModal(0)
    }

    const pageLocation = useLocation();

    useEffect(() => {
        document.title = `oabd-${pageLocation?.pathname?.slice(1)}`;
    }, [pageLocation]);


    if (eventData?.data?.statusCode !== 200) {
        return <Loading></Loading>
    }
    return (
        <div className={`${events.eventsMain} ${darkmode ? 'bg-black' : 'bg-white'}`}>
            <div className={events.eventsMainContainer}>
                <div onMouseLeave={() => setFlipDrawer(-50)} style={{ left: `${flipDrawer}%`, transition: '1s ease-in-out' }} className={events.eventsFirstPart}>
                    <div className={events.eventsFirstPartContainer}>

                        <div
                            className={events.events_Main_Title}>
                            <span>
                                <i class="uil uil-calendar-alt text-xl"></i>
                                <span> EVENTS</span>
                            </span>

                        </div>

                        {
                            search === ''
                                ?
                                <div className={events.eventsFirstPartDetail}>
                                    {
                                        findApprovedEventData?.slice((number - 10), number)?.map(eventData => {
                                            return (
                                                <p style={{ cursor: 'pointer' }} onClick={() => getSingleEventFromTitle(eventData?._id)} title={eventData?.title} className={events.title}>{eventData?.title?.length > 30 ? eventData?.title?.slice(0, 29) + '...' : eventData?.title}</p>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className={events.eventsFirstPartDetail}>
                                    {
                                        findApprovedEventDataBySearch?.slice((number - 10), number)?.map(eventData => {
                                            return (
                                                <p style={{ cursor: 'pointer' }} onClick={() => getSingleEventFromTitle(eventData?._id)} title={eventData?.title} className={events.title}>{eventData?.title?.length > 30 ? eventData?.title?.slice(0, 29) + '...' : eventData?.title}</p>
                                            )
                                        })
                                    }
                                    {findApprovedEventDataBySearch?.length === 0 &&
                                        <p className='text-red-600 ml-3'>Found nothing from search result</p>
                                    }
                                </div>
                        }

                    </div>
                </div>
                <div className={events.eventsSecondPart}>
                    <div className={`${events.eventsSecondPartContainer} ${darkmode ? 'bg-black' : 'bg-white'}`}>

                        <div className={events.searchBar}>
                            <span className={events.bargerRes}> <i onClick={flipDrawer === 0 ? () => setFlipDrawer(50) : () => setFlipDrawer(0)} className=" uil uil-bars ml-2"></i></span>
                            <div className={events.searchBarContainer}>
                                <div>
                                    <i className="uil uil-search text-xl "></i>
                                    <input
                                        className={events.event_input}
                                        placeholder='search'
                                        type="text"
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                    />
                                </div>
                                <i onClick={() => setSearch('')} className="uil uil-times text-xl cursor-pointer"></i>
                            </div>

                            <div className={events.totalImg}>
                                <span>TOTAL EVENTS: {search === '' ? findApprovedEventData?.length : findApprovedEventDataBySearch?.length}</span>
                                <span>  |  </span>
                                <span>PAGE: {number.toString().slice(0, (number.toString().length - 1))}</span>
                            </div>
                        </div>
                        {
                            search === ''
                                ?
                                <div style={{ transition: '1s ease-in-out' }} className={`${events.events} ${darkmode && 'bg-black text-white'}`}>
                                    {
                                        findApprovedEventData?.slice(number - 10, number)?.map(allEvents => {
                                            return (
                                                <div className={events.eventCart}>
                                                    <div className={events.eventImagePart}>
                                                        <img src={allEvents.imgLink} alt="" />
                                                    </div>

                                                    <div className={events.eventDetailPart}>
                                                        <div className={events.eventDetailPartContainer}>
                                                            <p title={allEvents.title} className='font-bold'>{allEvents.title.length > 70 ? allEvents.title.slice(0, 70) + '...' : allEvents.title}</p>
                                                            <br />
                                                            <p dangerouslySetInnerHTML={{ __html: allEvents?.description }} className={events.eventDetailPartDescription}></p>

                                                            <hr />
                                                            <div className={events.eventsLastPart}>
                                                                <div className={events.eventsLastPartOne}>
                                                                    <p className='text-sm mt-2 text-gray-500'> <i class="uil uil-clock-nine"></i> Event Date :
                                                                        <span>
                                                                            {allEvents.eventDate?.slice(8, 10)}-
                                                                            {allEvents.eventDate?.slice(5, 7)}-
                                                                            {allEvents.eventDate?.slice(0, 4)}
                                                                        </span>
                                                                    </p>
                                                                    <p className='text-sm text-gray-500'> <i className="uil uil-lock-alt"></i> Deadline :
                                                                        <span>
                                                                            {allEvents.deadline?.slice(8, 10)}-
                                                                            {allEvents.deadline?.slice(5, 7)}-
                                                                            {allEvents.deadline?.slice(0, 4)}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div className={events.eventsLastPartTwo}>
                                                                    <span title='view' onClick={() => handleModalSection(allEvents?._id)}><i className="uil uil-eye mr-2 cursor-pointer"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div style={{ transition: '1s ease-in-out' }} className={`${events.events} ${darkmode && 'bg-black text-white'}`}>
                                    {
                                        findApprovedEventDataBySearch?.slice(number - 10, number)?.map(allEvents => {
                                            return (
                                                <div className={events.eventCart}>
                                                    <div className={events.eventImagePart}>
                                                        <img src={allEvents.imgLink} alt="" />
                                                    </div>

                                                    <div className={events.eventDetailPart}>
                                                        <div className={events.eventDetailPartContainer}>
                                                            <p title={allEvents.title} className='font-bold'>{allEvents.title.length > 70 ? allEvents.title.slice(0, 70) + '...' : allEvents.title}</p>
                                                            <br />
                                                            <p dangerouslySetInnerHTML={{ __html: allEvents?.description }} className={events.eventDetailPartDescription}></p>

                                                            <hr />
                                                            <div className={events.eventsLastPart}>
                                                                <div className={events.eventsLastPartOne}>
                                                                    <p className='text-sm mt-2 text-gray-500'> <i class="uil uil-clock-nine"></i> Event Date :
                                                                        <span>
                                                                            {allEvents.eventDate?.slice(8, 10)}-
                                                                            {allEvents.eventDate?.slice(5, 7)}-
                                                                            {allEvents.eventDate?.slice(0, 4)}
                                                                        </span>
                                                                    </p>
                                                                    <p className='text-sm text-gray-500'> <i className="uil uil-lock-alt"></i> Deadline :
                                                                        <span>
                                                                            {allEvents.deadline?.slice(8, 10)}-
                                                                            {allEvents.deadline?.slice(5, 7)}-
                                                                            {allEvents.deadline?.slice(0, 4)}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div className={events.eventsLastPartTwo}>
                                                                    <span title='view' onClick={() => handleModalSection(allEvents?._id)}><i className="uil uil-eye mr-2 cursor-pointer"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        findApprovedEventDataBySearch?.length === 0 &&
                                        <div style={{ width: '98%', height: '400px', boxShadow: ' 0 0 10px rgba(0, 0, 0, 0.2)', margin: 'auto', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p className='text-red-600'>Found nothing from search result</p>
                                        </div>
                                    }
                                </div>
                        }
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
                        <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${events.updateModal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>

                            <div style={{ transition: '1s ease-in-out' }} className={`${events.updateModalContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                                <br />
                                <br />
                                <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <div className={events.modalCover}>
                                    <div className={events.modalImg}>
                                        <img src={findDetailEvents?.imgLink} alt="" />
                                    </div>
                                    <br />
                                    <div className={events.modalTitle}>
                                        <p className='text-center text-2xl'>{findDetailEvents?.title}</p>
                                    </div>
                                    <br />
                                    <div className={events.modaDescription}>
                                        <p dangerouslySetInnerHTML={{ __html: findDetailEvents?.description }} className=''></p>
                                    </div>
                                    <br />
                                    <div className={events?.modalOthers}>
                                        <p className='text-sm mt-2 text-gray-500'>
                                            <i class="uil uil-clock-nine"></i> Event Date :
                                            <span>
                                                {findDetailEvents?.eventDate?.slice(8, 10)}-
                                                {findDetailEvents?.eventDate?.slice(5, 7)}-
                                                {findDetailEvents?.eventDate?.slice(0, 4)}
                                            </span>
                                        </p>
                                        <p className='text-sm text-gray-500'> <i className="uil uil-lock-alt"></i> Deadline : <span>
                                            {findDetailEvents?.deadline?.slice(8, 10)}-
                                            {findDetailEvents?.deadline?.slice(5, 7)}-
                                            {findDetailEvents?.deadline?.slice(0, 4)}
                                        </span>

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={events.fakeNavBackground}>

            </div>
        </div>
    );
};

export default Events;