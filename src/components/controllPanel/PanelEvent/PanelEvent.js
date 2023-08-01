import React, { useEffect, useRef, useState } from 'react';
import panelEvent from './PanelEvent.module.css';
import { fetchDeleteEventData, fetchPostEventData, fetchUpdateEventData } from '../../../fetchedData/fetchEventData';
import { toast } from 'react-toastify';
import useEventData from '../../../customHooks/useEventSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import JoditEditor from 'jodit-react';

const PanelEvent = () => {
    const [user] = useAuthState(auth);
    console.log(user?.email);
    const editor = useRef(null);
    const [eventData, refetch] = useEventData();
    const [content, setContent] = useState('');

    const [open, setOpen] = useState(false);
    const allEvents = eventData?.data?.data?.data;
    console.log(allEvents);
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
    const [updateApproval] = useState({});
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

    const findEvent = allEvents?.find(f => {
        return f._id === findId;
    });

    const findPendings = allEvents?.filter(f => {
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


    useEffect(() => {
        if (imgHolder) {
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
                    setAddImg(result?.data?.url)
                    setUpdateImg(result?.data?.url)
                    setImgHolder(result?.data?.url)
                })
        }
    }, [imgHolder, findEvent, allEventInfo, updateAllEventsInfo, title, publisherName, user, eventDate, content, updateImg]);

    console.log(imgHolder);


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

        console.log(allEventInfo);

        if (
            allEventInfo.title !== '' && allEventInfo.name !== '' && allEventInfo.eventDate !== '' && allEventInfo.imgLink !== '' && allEventInfo.description !== '' && allEventInfo.deadline !== ''
        ) {
            await fetchPostEventData(allEventInfo, refetch);
            toast.success('Blog added successfully');

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
        console.log(updateAllEventsInfo);
    }

    const updateApprovalPost = async (value) => {

        updateApproval.approval = value;

        console.log(updateApproval);

        await fetchUpdateEventData(findId, updateApproval, refetch);

        if (value === true) {
            toast.success('Post Approved')
        } else {
            toast.success('Approval Cancelled')
        }

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
        <div className={panelEvent.main}>
            <div className={panelEvent.container}>
                <div className={panelEvent.titleContainer}>
                    <br />
                    <div className={panelEvent.titleMain}>
                        <p className={panelEvent.title}> All EVENTS :</p>
                        <div className='flex items-center justify-between lg:w-1/6 md:w-2/6 sm:w-3/6'>
                            <p style={{ fontSize: '12.5px' }} className='text-gray-500 font-semibold '>TOTAL PENDING: {findPendings?.length} </p>
                            <p onClick={() => handleOption(3)} ><i class="uil uil-plus-circle mr-3 text-3xl text-purple-600 cursor-pointer"></i></p>
                        </div>
                    </div>
                    <br />
                    <hr />
                </div>
                <br />
                {
                    allEvents?.slice()?.reverse()?.map((events, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={events?._id} className={panelEvent.detailPart}>
                                        <div className={panelEvent.detailPartContainer}>
                                            <div className={panelEvent.partOne}>
                                                <div className={panelEvent.partOneDetail}>
                                                    <p className='mr-2'>{index + 1} </p>
                                                    <p title={events?.title} className={panelEvent.partOneDetailTitle}> {events?.title?.length > 37 ? events?.title?.slice(0, 37) + '...' : events?.title}</p>
                                                    <p title={events?.title} className={panelEvent.partOneDetailTitleRes}>{events?.title.length > 12 ? events?.title.slice(0, 12) + '...' : events?.title}</p>
                                                </div>
                                            </div>
                                            <div className={panelEvent.partTwo}>
                                                <div className={panelEvent.icons}>
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
                <div className={`${open ? 'block' : 'none'}  ${panelEvent.modal}`}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={panelEvent.modalDetail}>
                        <div className={panelEvent.modalOption}>
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='view' onClick={() => handleOption(1)} className={`${panelEvent.modalView} ${viewOption === 1 && 'bg-blue-600 text-white'} border border-blue-600 rounded `}>
                                    <p ><i class="uil uil-eye"></i></p>
                                </div>
                            }
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='update' onClick={() => handleOption(2)} className={`${panelEvent.modalUpdate} ${viewOption === 2 && 'bg-green-600 text-white'} border border-green-600 rounded`}>
                                    <p><i class="uil uil-edit "></i></p>
                                </div>
                            }
                            {
                                viewOption === 3 &&
                                <div title='add' onClick={() => handleOption(3)} className={`${panelEvent.modalAdd} ${viewOption === 3 && 'bg-purple-600 text-white'} border border-purple-600 rounded`}>
                                    <p className='flex items-center justify-between w-6/6'><i class="uil uil-plus-circle text-1xl"></i> ADD EVENT</p>
                                </div>
                            }
                        </div>
                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${panelEvent.viewPart}`}>
                                <div className={panelEvent.viewPartMain}>
                                    <div className={panelEvent.eventsContainer}>
                                        <br />
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-user-square"></i> {findEvent?.name}</p>
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-clock-three"></i> {findEvent?.eventDate}</p>
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-clock-three"></i> {findEvent?.deadline}</p>
                                        <br />
                                        <hr />
                                        <br />
                                        <div className={panelEvent.eventsImgContainer}>
                                            <img src={findEvent?.imgLink} alt="" />
                                        </div>
                                        <br />
                                        <p className='text-3xl font-bold'>{findEvent?.title}</p>
                                        <br />
                                        <p dangerouslySetInnerHTML={{ __html: findEvent?.description }}></p>
                                        <br />
                                        <br />
                                        <div className={`${panelEvent.approvalPart} text-right mr-10`}>
                                            {
                                                findEvent?.approval === false &&
                                                <button onClick={() => updateApprovalPost(true)} className='btn btn-success text-white '>Approve</button>
                                            }
                                            {
                                                findEvent?.approval === true &&
                                                <button onClick={() => updateApprovalPost(false)} className='btn btn-error text-white '>Cancel Approval</button>
                                            }
                                        </div>
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            viewOption === 2 &&
                            <div className={`${panelEvent.updatePart}`}>
                                <div className={`${panelEvent.eventUpdateModalSection}`}>
                                    <br />
                                    <div className={panelEvent.eventInputTitle}>
                                        <label htmlFor="">Event Title</label>
                                        <input type="text"
                                            value={updateTitle}
                                            onChange={(e) => setUpdateTitle(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={panelEvent.eventInputDateAndDeadline}>
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
                                    <div className={panelEvent.eventsTextEditorSection}>
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
                                    <div className={panelEvent.eventsImgSectionMain}>

                                        <div type="file" className={panelEvent.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={panelEvent.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={panelEvent.chooseFile} type="file" name="" id=""
                                                    onChange={(e) => {
                                                        const imgFile = e.target.files[0];
                                                        setImgHolder(imgFile)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={panelEvent.updateEventButton}>

                                        <div >
                                            <button onClick={handleUpdate} className='btn btn-primary mr-10'><i class="uil uil-edit mr-1"></i>update Blog</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            viewOption === 3 &&
                            <div className={`${panelEvent.addPart}`}>
                                <div className={`${panelEvent.addNewModalSection}`}>
                                    <br />
                                    <div className={panelEvent.eventInputTitle}>
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
                                    <div className={panelEvent.eventInputDateAndDeadline}>
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

                                    <div className={panelEvent.eventsTextEditorSection}>

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
                                    <div className={panelEvent.eventsImgSectionMain}>

                                        <div type="file" className={panelEvent.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={panelEvent.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={panelEvent.chooseFile} type="file" name="" id=""
                                                    onChange={(e) => {
                                                        const imgFile = e.target.files[0];
                                                        setImgHolder(imgFile)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        blankIdentifier.imgLink === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                    }

                                    <div className={panelEvent.updateEventButton}>
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

export default PanelEvent;