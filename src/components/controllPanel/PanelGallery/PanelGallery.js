import React, { useEffect, useState } from 'react';
import panelGallery from './PanelGallery.module.css';
import { fetchDeleteGalleryData, fetchPostGalleryData, fetchUpdateGalleryData } from '../../../fetchedData/fetchGalleryData';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import useGalleryData from '../../../customHooks/useGallerySectionHook';
import { uploadForPanelDash } from '../../../fetchedData/fetchPostImageData';

const PanelGallery = ({ darkmode }) => {
    const [user] = useAuthState(auth);


    const [galleryData, refetch] = useGalleryData()
    const [content, setContent] = useState('');

    const [open, setOpen] = useState(false);
    const allGallery = galleryData?.data?.data?.data;

    const [viewOption, setViewOption] = useState(1);
    const [findId, setFindId] = useState('');

    const [title, setTitle] = useState('');
    const [publisherName, setPublisherName] = useState('');

    const [imgHolder, setImgHolder] = useState('');
    const [allBlogInfo] = useState({});
    const [updateAllGalleryInfo] = useState({});
    const [updateApproval] = useState({});

    const [updateTitle, setUpdateTitle] = useState('');
    const [updatePublisherName, setUpdatePublisherName] = useState('');

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

    const findBlog = allGallery?.find(f => {
        return f._id === findId;
    });

    const findPendings = allGallery?.filter(f => {
        return f.approval === false;
    });

    useEffect(() => {
        setUpdateTitle(findBlog?.title);
        setUpdatePublisherName(findBlog?.name);
        setUpdateImg(findBlog?.imgLink);
    }, [findBlog])


    const postBlog = async () => {

        allBlogInfo.title = title
        allBlogInfo.name = publisherName
        allBlogInfo.email = user?.email
        allBlogInfo.imgLink = addImg


        setBlankIdentifier({
            title: title,
            name: publisherName,
            imgLink: addImg,
            description: content
        })



        if (
            allBlogInfo.title !== '' && allBlogInfo.name !== '' && allBlogInfo.email !== '' && allBlogInfo.imgLink !== '' && allBlogInfo.description !== ''
        ) {
            await fetchPostGalleryData(allBlogInfo, refetch);
            toast.success('Blog added successfully');

            setTitle('');
            setPublisherName('');
            setAddImg();
            setImgHolder('');
        } else {
            toast.error('fillup all fields');
        }
    }

    const handleUpdate = async () => {
        updateAllGalleryInfo.title = updateTitle;
        updateAllGalleryInfo.name = updatePublisherName;
        updateAllGalleryInfo.imgLink = updateImg;

        await fetchUpdateGalleryData(findId, updateAllGalleryInfo, refetch);
        setImgHolder('');
        setContent('');
        toast.dark('updated successfully');

    }

    const updateApprovalPost = async (value) => {

        updateApproval.approval = value;



        await fetchUpdateGalleryData(findId, updateApproval, refetch);

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
                await fetchDeleteGalleryData(theId, refetch);
                toast.dark('successfully deleted');
                refetch();
            }
        }
    }
    return (
        <div className={panelGallery.main}>
            <div className={panelGallery.container}>
                <div className={`${panelGallery.titleContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <br />
                    <div className={panelGallery.titleMain}>
                        <p className={panelGallery.title}> All GALLERY-IMAGES:</p>
                        <div className='flex items-center justify-between lg:w-1/6 md:w-2/6 sm:w-3/6'>
                            <p style={{ fontSize: '12.5px' }} className={`${darkmode ? 'text-white' : 'text-gray-500 '} font-semibold`}  >TOTAL PENDING: {findPendings?.length} </p>
                            <p onClick={() => handleOption(3)} ><i class="uil uil-plus-circle mr-3 text-3xl text-purple-600 cursor-pointer"></i></p>
                        </div>
                    </div>
                    <br />
                    <hr />
                </div>
                <br />
                {
                    allGallery?.slice()?.reverse()?.map((blogs, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={blogs?._id} className={panelGallery.detailPart}>
                                        <div className={panelGallery.detailPartContainer}>
                                            <div className={`${darkmode && 'text-white'} ${panelGallery.partOne}`}>
                                                <div className={panelGallery.partOneDetail}>
                                                    <p className='mr-2'>{index + 1} </p>
                                                    <p title={blogs?.title} className={panelGallery.partOneDetailTitle}> {blogs?.title?.length > 37 ? blogs?.title?.slice(0, 37) + '...' : blogs?.title}</p>
                                                    <p title={blogs?.title} className={panelGallery.partOneDetailTitleRes}> {blogs?.title.length > 12 ? blogs?.title.slice(0, 12) + '...' : blogs?.title}</p>
                                                </div>
                                            </div>
                                            <div className={panelGallery.partTwo}>
                                                <div className={panelGallery.icons}>
                                                    <p>{blogs?.approval === true ? <p className='text-sm text-green-600 italic'>approved</p> : <p className='text-sm text-red-600 italic'>pending</p>}</p>
                                                    <p title='view' onClick={() => handleModal(1, blogs?._id)} ><i class="uil uil-eye text-blue-600 cursor-pointer"></i></p>
                                                    <p title='edit' onClick={() => handleModal(2, blogs?._id)}><i class="uil uil-edit text-green-600 cursor-pointer"></i></p>
                                                    <p title='delete' onClick={() => deletePost(blogs?._id)}><i class="uil uil-trash-alt text-red-600 cursor-pointer"></i></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div className={`${open ? 'block' : 'none'}  ${panelGallery.modal} ${darkmode ? 'text-white bg-black' : 'bg-white'} `}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={panelGallery.modalDetail}>
                        <div className={panelGallery.modalOption}>
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='view' onClick={() => handleOption(1)} className={`${panelGallery.modalView} ${viewOption === 1 && 'bg-blue-600 text-white'} border border-blue-600 rounded `}>
                                    <p ><i class="uil uil-eye"></i></p>
                                </div>
                            }
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='update' onClick={() => handleOption(2)} className={`${panelGallery.modalUpdate} ${viewOption === 2 && 'bg-green-600 text-white'} border border-green-600 rounded`}>
                                    <p><i class="uil uil-edit "></i></p>
                                </div>
                            }
                            {
                                viewOption === 3 &&
                                <div title='add' onClick={() => handleOption(3)} className={`${panelGallery.modalAdd} ${viewOption === 3 && 'bg-purple-600 text-white'} border border-purple-600 rounded`}>
                                    <p className='flex items-center justify-between w-6/6'><i class="uil uil-plus-circle text-1xl"></i> ADD GALLERY</p>
                                </div>
                            }
                        </div>
                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${panelGallery.viewPart}`}>
                                <div className={panelGallery.viewPartMain}>
                                    <div className={panelGallery.blogsContainer}>
                                        <br />
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-user-square"></i> {findBlog?.name}</p>

                                        <br />
                                        <hr />
                                        <br />
                                        <div className={panelGallery.blogsImgContainer}>
                                            <img src={findBlog?.imgLink} alt="" />
                                        </div>
                                        <br />
                                        <p className='text-3xl font-bold'>{findBlog?.title}</p>
                                        <br />
                                        <p dangerouslySetInnerHTML={{ __html: findBlog?.description }}></p>
                                    </div>
                                    <br />
                                    <br />
                                    <div className={`${panelGallery.approvalPart} text-right mr-10`}>
                                        {
                                            findBlog?.approval === false &&
                                            <button onClick={() => updateApprovalPost(true)} className='btn btn-success text-white '>Approve</button>
                                        }
                                        {
                                            findBlog?.approval === true &&
                                            <button onClick={() => updateApprovalPost(false)} className='btn btn-error text-white '>Cancel Approval</button>
                                        }
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        }

                        {
                            viewOption === 2 &&
                            <div className={`${panelGallery.updatePart}`}>
                                <div className={`${panelGallery.eventUpdateModalSection}`}>
                                    <br />
                                    <div className={panelGallery.eventInputTitle}>
                                        <label htmlFor="">Gallery Title</label>
                                        <input type="text"
                                            value={updateTitle}
                                            onChange={(e) => setUpdateTitle(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={panelGallery.eventInputDateAndDeadline}>
                                        <div>
                                            <label htmlFor="">Publisher Name</label>
                                            <br />
                                            <input type="text"
                                                value={updatePublisherName}
                                                onChange={(e) => setUpdatePublisherName(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                    <br />
                                    <div className={panelGallery.eventsImgSectionMain}>

                                        <div type="file" className={panelGallery.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={panelGallery.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={panelGallery.chooseFile} type="file" name="" id=""
                                                    onChange={(e) => {
                                                        const imgFile = e.target.files[0];
                                                        uploadForPanelDash(imgFile, setAddImg, setUpdateImg, setImgHolder)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={panelGallery.updateEventButton}>

                                        <div >
                                            <button onClick={handleUpdate} className='btn btn-primary mr-10'><i class="uil uil-edit mr-1"></i>Update Gallery</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            viewOption === 3 &&
                            <div className={`${panelGallery.addPart}`}>
                                <div className={`${panelGallery.addNewModalSection}`}>
                                    <br />
                                    <div className={panelGallery.eventInputTitle}>
                                        <label htmlFor="">Gallery Title</label>
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
                                    <div className={panelGallery.eventInputDateAndDeadline}>
                                        <div>
                                            <label htmlFor="">Publisher Name</label>
                                            <input
                                                type="text"
                                                value={publisherName}
                                                onChange={(e) => setPublisherName(e.target.value)}

                                            />
                                            {
                                                blankIdentifier.name === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                            }
                                        </div>

                                    </div>
                                    <br />
                                    <div className={panelGallery.eventsImgSectionMain}>

                                        <div type="file" className={panelGallery.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={panelGallery.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={panelGallery.chooseFile} type="file" name="" id=""
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

                                    <div className={panelGallery.updateEventButton}>
                                        <button onClick={postBlog} className='btn btn-primary mr-10'><i class="uil uil-plus-circle mr-2"></i>Add Gallery</button>
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

export default PanelGallery;