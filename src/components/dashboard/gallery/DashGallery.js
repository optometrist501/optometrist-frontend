import React, { useEffect, useState } from 'react';
import dashGallery from './DashGallery.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import { toast } from 'react-toastify';
import useGalleryData from '../../../customHooks/useGallerySectionHook';
import { fetchDeleteGalleryData, fetchPostGalleryData, fetchUpdateGalleryData } from '../../../fetchedData/fetchGalleryData';

const DashGallery = ({ darkmode }) => {
    const [user] = useAuthState(auth);


    const [galleryData, refetch] = useGalleryData()
    const [content, setContent] = useState('');




    const [open, setOpen] = useState(false);
    const allGallery = galleryData?.data?.data?.data;

    const [viewOption, setViewOption] = useState(1);
    const [findId, setFindId] = useState('');

    const [title, setTitle] = useState('');
    const [publisherName, setPublisherName] = useState('');
    const [date, setDate] = useState('');
    const [imgHolder, setImgHolder] = useState('');
    const [allBlogInfo] = useState({});
    const [updateAllGalleryInfo] = useState({})

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

    const findpostsByEmail = allGallery?.filter(f => {
        return f?.email === user?.email;
    });

    const findBlog = findpostsByEmail?.find(f => {
        return f._id === findId;
    });

    const findPendings = findpostsByEmail?.filter(f => {
        return f.approval === false;
    });

    useEffect(() => {
        setUpdateTitle(findBlog?.title);
        setUpdatePublisherName(findBlog?.name);
        setUpdateImg(findBlog?.imgLink);
    }, [findBlog])


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
    }, [imgHolder, findBlog, allBlogInfo, updateAllGalleryInfo, title, publisherName, user, date, content, updateImg]);




    const postBlog = async () => {

        allBlogInfo.title = title
        allBlogInfo.name = publisherName
        allBlogInfo.email = user?.email
        allBlogInfo.imgLink = addImg


        setBlankIdentifier({
            title: title,
            name: publisherName,
            release_date: date,
            imgLink: addImg,
            description: content
        })



        if (
            allBlogInfo.title !== '' && allBlogInfo.name !== '' && allBlogInfo.email !== '' && allBlogInfo.release_date !== '' && allBlogInfo.imgLink !== '' && allBlogInfo.description !== ''
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
        <div className={dashGallery.main}>
            <div className={dashGallery.container}>
                <div className={`${dashGallery.titleContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <br />
                    <div className={dashGallery.titleMain}>
                        <p className={dashGallery.title}> YOUR GALLERY :</p>
                        <div className='flex items-center justify-between lg:w-1/6 md:w-2/6 sm:w-3/6'>
                            <p style={{ fontSize: '12.5px' }} className={`${darkmode && 'text-white'} text-gray-500 font-semibold `}>TOTAL PENDING: {findPendings?.length} </p>
                            <p onClick={() => handleOption(3)} ><i class="uil uil-plus-circle mr-3 text-3xl text-purple-600 cursor-pointer"></i></p>
                        </div>
                    </div>
                    <br />
                    <hr />
                </div>
                <br />
                {
                    findpostsByEmail?.slice()?.reverse()?.map((blogs, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={blogs?._id} className={dashGallery.detailPart}>
                                        <div className={dashGallery.detailPartContainer}>
                                            <div className={dashGallery.partOne}>
                                                <div className={`${dashGallery.partOneDetail} ${darkmode && 'text-white'}`}>
                                                    <p className='mr-2'>{index + 1} </p>
                                                    <p title={blogs?.title} className={dashGallery.partOneDetailTitle}>Title: {blogs?.title?.length > 37 ? blogs?.title?.slice(0, 37) + '...' : blogs?.title}</p>
                                                    <p title={blogs?.title} className={dashGallery.partOneDetailTitleRes}>Title: {blogs?.title.length > 12 ? blogs?.title.slice(0, 12) + '...' : blogs?.title}</p>
                                                </div>
                                            </div>
                                            <div className={dashGallery.partTwo}>
                                                <div className={dashGallery.icons}>
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
                <div className={`${open ? 'block' : 'none'}  ${dashGallery.modal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={dashGallery.modalDetail}>
                        <div className={dashGallery.modalOption}>
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='view' onClick={() => handleOption(1)} className={`${dashGallery.modalView} ${viewOption === 1 && 'bg-blue-600 text-white'} border border-blue-600 rounded `}>
                                    <p ><i class="uil uil-eye"></i></p>
                                </div>
                            }
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='update' onClick={() => handleOption(2)} className={`${dashGallery.modalUpdate} ${viewOption === 2 && 'bg-green-600 text-white'} border border-green-600 rounded`}>
                                    <p><i class="uil uil-edit "></i></p>
                                </div>
                            }
                            {
                                viewOption === 3 &&
                                <div title='add' onClick={() => handleOption(3)} className={`${dashGallery.modalAdd} ${viewOption === 3 && 'bg-purple-600 text-white'} border border-purple-600 rounded`}>
                                    <p className='flex items-center justify-between w-6/6'><i class="uil uil-plus-circle text-1xl"></i> ADD GALLERY</p>
                                </div>
                            }
                        </div>
                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${dashGallery.viewPart}`}>
                                <div className={dashGallery.viewPartMain}>
                                    <div className={dashGallery.blogsContainer}>
                                        <br />
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-user-square"></i> {findBlog?.name}</p>

                                        <br />
                                        <hr />
                                        <br />
                                        <div className={dashGallery.blogsImgContainer}>
                                            <img src={findBlog?.imgLink} alt="" />
                                        </div>
                                        <br />
                                        <p className='text-3xl font-bold'>{findBlog?.title}</p>
                                        <br />
                                        <p dangerouslySetInnerHTML={{ __html: findBlog?.description }}></p>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            viewOption === 2 &&
                            <div className={`${dashGallery.updatePart}`}>
                                <div className={`${dashGallery.eventUpdateModalSection}`}>
                                    <br />
                                    <div className={dashGallery.eventInputTitle}>
                                        <label htmlFor="">Gallery Title</label>
                                        <input type="text"
                                            value={updateTitle}
                                            onChange={(e) => setUpdateTitle(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={dashGallery.eventInputDateAndDeadline}>
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
                                    <div className={dashGallery.eventsImgSectionMain}>

                                        <div type="file" className={dashGallery.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={dashGallery.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={dashGallery.chooseFile} type="file" name="" id=""
                                                    onChange={(e) => {
                                                        const imgFile = e.target.files[0];
                                                        setImgHolder(imgFile)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={dashGallery.updateEventButton}>

                                        <div >
                                            <button onClick={handleUpdate} className='btn btn-primary mr-10'><i class="uil uil-edit mr-1"></i>update Blog</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            viewOption === 3 &&
                            <div className={`${dashGallery.addPart}`}>
                                <div className={`${dashGallery.addNewModalSection}`}>
                                    <br />
                                    <div className={dashGallery.eventInputTitle}>
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
                                    <div className={dashGallery.eventInputDateAndDeadline}>
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
                                    <div className={dashGallery.eventsImgSectionMain}>

                                        <div type="file" className={dashGallery.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={dashGallery.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={dashGallery.chooseFile} type="file" name="" id=""
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

                                    <div className={dashGallery.updateEventButton}>
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

export default DashGallery;