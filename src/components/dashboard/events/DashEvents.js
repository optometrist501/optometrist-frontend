import React, { useEffect, useRef, useState } from 'react';
import dashEvent from './DashEvents.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

import auth from '../../../firebase/firebase.init';
import { fetchDeleteEventData, fetchPostEventData, fetchUpdateEventData } from '../../../fetchedData/fetchEventData';
import useEventData from '../../../customHooks/useEventSectionHook';
import { uploadForPanelDash } from '../../../fetchedData/fetchPostImageData';

const DashEvents = ({ darkmode }) => {
    const [user] = useAuthState(auth);


    const editor = useRef(null);
    const [eventData, refetch] = useEventData();
    const [content, setContent] = useState('');

    const [open, setOpen] = useState(false);
    const allEvents = eventData?.data?.data?.data;

    const [viewOption, setViewOption] = useState(1);
    const [findId, setFindId] = useState('');

    const [title, setTitle] = useState('');
    const [publisherName, setPublisherName] = useState('');
    const [description, setDescription] = useState('');
    const [udpateDescription, setUpdateDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const [imgHolder, setImgHolder] = useState('');
    const [allEventInfo] = useState({});
    const [updateAllEventsInfo] = useState({})

    const [updateTitle, setUpdateTitle] = useState('');
    const [updatePublisherName, setUpdatePublisherName] = useState('');
    const [updateDeadline, setUpdateDeadline] = useState('');
    const [updateEventDate, setUpdateEventDate] = useState('');
    const [updateImg, setUpdateImg] = useState('');
    const [addImg, setAddImg] = useState('');
    const [blankIdentifier, setBlankIdentifier] = useState({});

    const handleModal = (value, id) => {
        setOpen(true);
        setFindId(id);
        if (value === 1) {
            setViewOption(1)
        } else if (value === 2) {
            setViewOption(2)
        } else if (value === 3) {
            setViewOption(3);
        }

    }

    const handleOption = (value) => {
        setOpen(true);
        if (value === 1) {
            setViewOption(1)
        } else if (value === 2) {
            setViewOption(2)
        } else if (value === 3) {
            setViewOption(3);
        }
    }

    const findpostsByEmail = allEvents?.filter(f => {
        return f?.email === user?.email;
    })

    const findEvent = findpostsByEmail?.find(f => {
        return f._id === findId;
    });

    const findPendings = findpostsByEmail?.filter(f => {
        return f.approval === false;
    });

    useEffect(() => {
        setUpdateTitle(findEvent?.title);
        setUpdatePublisherName(findEvent?.name);
        setUpdateImg(findEvent?.imgLink);
        setUpdateDeadline(findEvent?.deadline);
        setUpdateEventDate(findEvent?.eventDate);
        setUpdateDescription(findEvent?.description);
    }, [findEvent])






    const postBlog = async () => {

        allEventInfo.title = title
        allEventInfo.name = publisherName
        allEventInfo.email = user?.email
        allEventInfo.imgLink = addImg
        allEventInfo.eventDate = eventDate
        allEventInfo.deadline = deadline
        allEventInfo.description = content


        setBlankIdentifier({
            title: title,
            name: publisherName,
            eventDate: eventDate,
            imgLink: addImg,
            description: content,
            deadline: deadline
        })



        if (
            allEventInfo.title !== '' && allEventInfo.name !== '' && allEventInfo.eventDate !== '' && allEventInfo.imgLink !== '' && allEventInfo.description !== '' && allEventInfo.deadline !== ''
        ) {
            await fetchPostEventData(allEventInfo, refetch);
            toast.success('Event added successfully');

            setTitle('');
            setPublisherName('');
            setAddImg();
            setImgHolder('');
            setEventDate('');
            setDeadline('');
        } else {
            toast.error('fillup all fields');
        }
    }

    const handleUpdate = async () => {
        updateAllEventsInfo.title = updateTitle;
        updateAllEventsInfo.name = updatePublisherName;
        updateAllEventsInfo.imgLink = updateImg;
        updateAllEventsInfo.eventDate = updateEventDate;
        updateAllEventsInfo.deadline = updateDeadline;
        updateAllEventsInfo.description = content;

        await fetchUpdateEventData(findId, updateAllEventsInfo, refetch);
        setImgHolder('');
        setContent('');
        toast.dark('updated successfully');
    }

    const deletePost = async (theId) => {
        if (theId) {
            const result = window.confirm('are you sure to delete this item?');
            if (result) {
                await fetchDeleteEventData(theId, refetch);
                toast.dark('successfully deleted');
                refetch();
            }
        }
    }
    return (
        <div className={dashEvent.main}>
            <div className={dashEvent.container}>
                <div className={`${dashEvent.titleContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <br />
                    <div className={dashEvent.titleMain}>
                        <p className={dashEvent.title}> YOUR EVENTS :</p>
                        <div className='flex items-center justify-between lg:w-1/6 md:w-2/6 sm:w-3/6'>
                            <p style={{ fontSize: '12.5px' }} className={`${darkmode && 'text-white'} text-gray-500 font-semibold`}>TOTAL PENDING: {findPendings?.length} </p>
                            <p onClick={() => handleOption(3)} ><i class="uil uil-plus-circle mr-3 text-3xl text-purple-600 cursor-pointer"></i></p>
                        </div>
                    </div>
                    <br />
                    <hr />
                </div>
                <br />
                {
                    findpostsByEmail?.slice()?.reverse()?.map((events, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={events?._id} className={dashEvent.detailPart}>
                                        <div className={dashEvent.detailPartContainer}>
                                            <div className={dashEvent.partOne}>
                                                <div className={`${dashEvent.partOneDetail} ${darkmode && 'text-white'}`}>
                                                    <p className='mr-2'>{index + 1} </p>
                                                    <p title={events?.title} className={dashEvent.partOneDetailTitle}>Title: {events?.title?.length > 37 ? events?.title?.slice(0, 37) + '...' : events?.title}</p>
                                                    <p title={events?.title} className={dashEvent.partOneDetailTitleRes}>Title: {events?.title.length > 12 ? events?.title.slice(0, 12) + '...' : events?.title}</p>
                                                </div>
                                            </div>
                                            <div className={dashEvent.partTwo}>
                                                <div className={dashEvent.icons}>
                                                    <p>{events?.approval === true ? <p className='text-sm text-green-600 italic'>approved</p> : <p className='text-sm text-red-600 italic'>pending</p>}</p>
                                                    <p title='view' onClick={() => handleModal(1, events?._id)} ><i class="uil uil-eye text-blue-600 cursor-pointer"></i></p>
                                                    <p title='edit' onClick={() => handleModal(2, events?._id)}><i class="uil uil-edit text-green-600 cursor-pointer"></i></p>
                                                    <p title='delete' onClick={() => deletePost(events?._id)}><i class="uil uil-trash-alt text-red-600 cursor-pointer"></i></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div className={`${open ? 'block' : 'none'}  ${dashEvent.modal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={dashEvent.modalDetail}>
                        <div className={dashEvent.modalOption}>
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='view' onClick={() => handleOption(1)} className={`${dashEvent.modalView} ${viewOption === 1 && 'bg-blue-600 text-white'} border border-blue-600 rounded `}>
                                    <p ><i class="uil uil-eye"></i></p>
                                </div>
                            }
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='update' onClick={() => handleOption(2)} className={`${dashEvent.modalUpdate} ${viewOption === 2 && 'bg-green-600 text-white'} border border-green-600 rounded`}>
                                    <p><i class="uil uil-edit "></i></p>
                                </div>
                            }
                            {
                                viewOption === 3 &&
                                <div title='add' onClick={() => handleOption(3)} className={`${dashEvent.modalAdd} ${viewOption === 3 && 'bg-purple-600 text-white'} border border-purple-600 rounded`}>
                                    <p className='flex items-center justify-between w-6/6'><i class="uil uil-plus-circle text-1xl"></i> ADD EVENT</p>
                                </div>
                            }
                        </div>
                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${dashEvent.viewPart}`}>
                                <div className={dashEvent.viewPartMain}>
                                    <div className={dashEvent.eventsContainer}>
                                        <br />
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-user-square"></i> {findEvent?.name}</p>
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-clock-three"></i> {findEvent?.eventDate}</p>
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-clock-three"></i> {findEvent?.deadline}</p>
                                        <br />
                                        <hr />
                                        <br />
                                        <div className={dashEvent.eventsImgContainer}>
                                            <img src={findEvent?.imgLink} alt="" />
                                        </div>
                                        <br />
                                        <p className='text-3xl font-bold'>{findEvent?.title}</p>
                                        <br />
                                        <p dangerouslySetInnerHTML={{ __html: findEvent?.description }}></p>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            viewOption === 2 &&
                            <div className={`${dashEvent.updatePart}`}>
                                <div className={`${dashEvent.eventUpdateModalSection}`}>
                                    <br />
                                    <div className={dashEvent.eventInputTitle}>
                                        <label htmlFor="">Event Title</label>
                                        <input type="text"
                                            value={updateTitle}
                                            onChange={(e) => setUpdateTitle(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={dashEvent.eventInputDateAndDeadline}>
                                        <div>
                                            <label htmlFor="">Publisher Name</label>
                                            <br />
                                            <input type="text"
                                                value={updatePublisherName}
                                                onChange={(e) => setUpdatePublisherName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Event Date</label>
                                            <br />
                                            <input type="date"
                                                value={updateEventDate}
                                                onChange={(e) => setUpdateEventDate(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Deadline</label>
                                            <br />
                                            <input type="date"
                                                value={updateDeadline}
                                                onChange={(e) => setUpdateDeadline(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className={dashEvent.eventsTextEditorSection}>
                                        <label htmlFor="">Event Description</label>
                                        <div className='mt-2'>
                                            <JoditEditor
                                                ref={editor}
                                                value={udpateDescription}
                                                onBlur={newContent => setContent(newContent)}
                                                onChange={(newContent) => setContent(newContent)}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className={dashEvent.eventsImgSectionMain}>

                                        <div type="file" className={dashEvent.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={dashEvent.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={dashEvent.chooseFile} type="file" name="" id=""
                                                    onChange={(e) => {
                                                        const imgFile = e.target.files[0];
                                                        uploadForPanelDash(imgFile, setAddImg, setUpdateImg, setImgHolder)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={dashEvent.updateEventButton}>

                                        <div >
                                            <button onClick={handleUpdate} className='btn btn-primary mr-10'><i class="uil uil-edit mr-1"></i>update Blog</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            viewOption === 3 &&
                            <div className={`${dashEvent.addPart}`}>
                                <div className={`${dashEvent.addNewModalSection}`}>
                                    <br />
                                    <div className={dashEvent.eventInputTitle}>
                                        <label htmlFor="">Event Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}

                                        />
                                        {
                                            blankIdentifier.title === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                        }
                                    </div>
                                    <br />
                                    <div className={dashEvent.eventInputDateAndDeadline}>
                                        <div>
                                            <label htmlFor="">Publisher Name</label>
                                            <br />
                                            <input
                                                type="text"
                                                value={publisherName}
                                                onChange={(e) => setPublisherName(e.target.value)}

                                            />
                                            {
                                                blankIdentifier.name === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                            }
                                        </div>
                                        <div>
                                            <label htmlFor="">Event Date</label>
                                            <br />
                                            <input
                                                type="date"
                                                value={eventDate}
                                                onChange={(e) => setEventDate(e.target.value)}
                                                required
                                            />
                                            {
                                                blankIdentifier.eventDate === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                            }
                                        </div>

                                        <div>
                                            <label htmlFor="">Deadline</label>
                                            <br />
                                            <input
                                                type="date"
                                                value={deadline}
                                                onChange={(e) => setDeadline(e.target.value)}
                                                required
                                            />
                                            {
                                                blankIdentifier.deadline === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                            }
                                        </div>
                                    </div>
                                    <br />

                                    <div className={dashEvent.eventsTextEditorSection}>

                                        <label htmlFor="">Event Description</label>
                                        <div className='mt-2'>
                                            <JoditEditor
                                                ref={editor}
                                                value={content}
                                                onBlur={newContent => setContent(newContent)}
                                                onChange={(newContent) => { setDescription(newContent) }}

                                            />
                                            {
                                                blankIdentifier.description === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                            }
                                        </div>
                                    </div>

                                    <br />
                                    <div className={dashEvent.eventsImgSectionMain}>

                                        <div type="file" className={dashEvent.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={dashEvent.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={dashEvent.chooseFile} type="file" name="" id=""
                                                    onChange={(e) => {
                                                        const imgFile = e.target.files[0];
                                                        uploadForPanelDash(imgFile, setAddImg, setUpdateImg, setImgHolder)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        blankIdentifier.imgLink === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                    }

                                    <div className={dashEvent.updateEventButton}>
                                        <button onClick={postBlog} className='btn btn-primary mr-10'><i class="uil uil-plus-circle mr-2"></i>Add Event</button>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>

        </div>
    );
};

export default DashEvents;