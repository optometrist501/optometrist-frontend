import React, { useEffect, useRef, useState } from 'react';
import events from './Events.module.css';
import JoditEditor from 'jodit-react';

const Events = ({ darkmode }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    const [eventData, seteventData] = useState([]);
    const [updateModal, setUpdateModal] = useState(100);
    const [sectionController, setSectionController] = useState(1);

    const [flipDrawer, setFlipDrawer] = useState(-50);

    const [number, setNumber] = useState(10);
    const [buttonNumber, setButtonNumber] = useState(10);
    const [modifiedButtonNumber, setModifiedButtonNumber] = useState();

    const handleDelete = () => {
        const result = window.confirm('are you sure to delete this event?');

        if (result) {
            // will be deleted the event
        } else {
            // will be cancelled deletion
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


    // pagination
    const roundedDataLength = Math.ceil(eventData?.length / 10);
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
        const url = 'events.json';
        fetch(url).then(res => res.json()).then(res => seteventData(res))
    })



    return (
        <div className={events.eventsMain}>
            <div className={events.eventsMainContainer}>
                <div onMouseLeave={() => setFlipDrawer(-50)} style={{ left: `${flipDrawer}%`, transition: '1s ease-in-out' }} className={events.eventsFirstPart}>
                    <div className={events.eventsFirstPartContainer}>

                        <div
                            className={events.events_Main_Title}>
                            <span>
                                <i class="uil uil-calendar-alt text-xl"></i>
                                <span> EVENTS</span>
                            </span>
                            <span>
                                <i class="uil uil-angle-double-left text-2xl"></i>
                            </span>
                        </div>

                        <div className={events.eventsFirstPartDetail}>
                            {
                                eventData?.slice((number - 10), number).map(eventData => {
                                    return (
                                        <p title={eventData?.title} className={events.title}>{eventData?.title?.length > 30 ? eventData?.title?.slice(0, 29) + '...' : eventData?.title}</p>
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
                                <div>
                                    <i className="uil uil-search text-xl "></i>
                                    <input className={events.event_input} placeholder='search' type="text" />
                                </div>
                                <i class="uil uil-times text-xl cursor-pointer"></i>
                            </div>

                            <div className={events.totalImg}>
                                <span>TOTAL EVENTS: {eventData?.length}</span>
                                <span>  |  </span>
                                <span>PAGE: {number.toString().slice(0, (number.toString().length - 1))}</span>
                            </div>
                        </div>
                        <div style={{ transition: '1s ease-in-out' }} className={`${events.events} ${darkmode && 'bg-black text-white'}`}>
                            {
                                eventData?.slice(number - 10, number)?.map(allEvents => {
                                    return (
                                        <div className={events.eventCart}>
                                            <div className={events.eventImagePart}>
                                                <img src={allEvents.imgLink} alt="" />
                                            </div>

                                            <div className={events.eventDetailPart}>
                                                <div className={events.eventDetailPartContainer}>
                                                    <p title={allEvents.title} className='font-bold'>{allEvents.title.length > 70 ? allEvents.title.slice(0, 70) + '...' : allEvents.title}</p>
                                                    <br />
                                                    <p className={events.eventDetailPartDescription}>{allEvents.description}</p>

                                                    <hr />
                                                    <div className={events.eventsLastPart}>
                                                        <div className={events.eventsLastPartOne}>
                                                            <p className='text-sm mt-2 text-gray-500'> <i class="uil uil-clock-nine"></i> Event Date : {allEvents.eventDate}</p>
                                                            <p className='text-sm text-gray-500'> <i className="uil uil-lock-alt"></i> Deadline : {allEvents.deadline}</p>
                                                        </div>
                                                        <div className={events.eventsLastPartTwo}>
                                                            <span onClick={() => setUpdateModal(0)}><i className="uil uil-edit mr-2 cursor-pointer"></i></span>
                                                            <span onClick={handleDelete}><i className="uil uil-trash-alt mr-5 cursor-pointer"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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
                        <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${events.updateModal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>

                            <div style={{ transition: '1s ease-in-out' }} className={`${events.updateModalContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                                <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <div className={events.eventModalSectionButtons}>
                                    <p onClick={() => handleModalSection(1)} className={events.eventUpdatebutton}><i class="uil uil-edit mr-2"></i> UPDATE</p>
                                    <p onClick={() => handleModalSection(2)} className={events.addEventsNewButton}><i class="uil uil-plus-circle mr-2"></i> ADD NEW</p>
                                </div>
                                <div className={events.eventModalSectionButtons}>
                                    <p className={`${events.eventUpdateLine} ${sectionController === 1 && events.brownColor} `}></p>
                                    <p className={`${events.addEventsNewLine} ${sectionController === 2 && events.brownColor} `}></p>
                                </div>
                                <div className={events.ModalSectionContainer}>
                                    <div className={`${sectionController === 1 ? 'block' : 'none'} ${events.eventUpdateModalSection}`}>
                                        <br />
                                        <div className={events.eventInputTitle}>
                                            <label htmlFor="">Event Title</label>
                                            <input type="text" />
                                        </div>
                                        <br />
                                        <div className={events.eventInputDateAndDeadline}>
                                            <div>
                                                <label htmlFor="">Event Date</label>
                                                <br />
                                                <input type="date" />
                                            </div>
                                            <div>
                                                <label htmlFor="">Event Deadline</label>
                                                <br />
                                                <input type="date" />
                                            </div>
                                        </div>
                                        <br />
                                        <div className={events.eventsTextEditorSection}>
                                            <label htmlFor="">Event Description</label>
                                            <div className='mt-2'>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={description}
                                                    onBlur={newContent => setContent(newContent)}
                                                    onChange={newContent => { setDescription(newContent) }}
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <div className={events.eventsImgSectionMain}>

                                            <div type="file" className={events.eventsImgSection}>
                                                <div className={events.chooseFileDesign}>
                                                    <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                    <input className={events.chooseFile} type="file" name="" id="" />
                                                </div>


                                            </div>
                                        </div>
                                        <div className={events.updateEventButton}>
                                            <button className='btn btn-primary mr-10'><i class="uil uil-edit mr-1"></i>update event</button>
                                        </div>
                                    </div>

                                    <div className={`${sectionController === 2 ? 'block' : 'none'} ${events.eventAddNewModalSection}`}>
                                        <br />
                                        <div className={events.eventInputTitle}>
                                            <label htmlFor="">Event Title</label>
                                            <input type="text" />
                                        </div>
                                        <br />
                                        <div className={events.eventInputDateAndDeadline}>
                                            <div>
                                                <label htmlFor="">Event Date</label>
                                                <br />
                                                <input type="date" />
                                            </div>
                                            <div>
                                                <label htmlFor="">Event Deadline</label>
                                                <br />
                                                <input type="date" />
                                            </div>
                                        </div>
                                        <br />
                                        <div className={events.eventsTextEditorSection}>
                                            <label htmlFor="">Event Description</label>
                                            <div className='mt-2'>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={description}
                                                    onBlur={newContent => setContent(newContent)}
                                                    onChange={newContent => { setDescription(newContent) }}
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <div className={events.eventsImgSectionMain}>

                                            <div type="file" className={events.eventsImgSection}>
                                                <div className={events.chooseFileDesign}>
                                                    <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                    <input className={events.chooseFile} type="file" name="" id="" />
                                                </div>


                                            </div>
                                        </div>
                                        <div className={events.updateEventButton}>
                                            <button className='btn btn-primary mr-10'><i class="uil uil-plus-circle mr-2"></i>Add event</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Events;