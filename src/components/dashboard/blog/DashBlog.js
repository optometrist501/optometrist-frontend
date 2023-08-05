import React, { useEffect, useRef, useState } from 'react';
import dashblog from './DashBloag.module.css';
import useBlogData from '../../../customHooks/useBlogSectionHook';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import { fetchDeleteBlogData, fetchPostBlogData, fetchUpdateBlogData } from '../../../fetchedData/fetchBlogData';
import useLikeData from '../../../customHooks/useLikeSectionHook';
import useCommentData from '../../../customHooks/useCommentSectionHooks';
import { fetchBulkDeleteLikeData } from '../../../fetchedData/fetchLikeData';
import { fetchBulkDeleteCommentData } from '../../../fetchedData/fetchCommentData';

const DashBlog = () => {

    const [user] = useAuthState(auth);
    console.log(user?.email);

    const [blogData, refetch] = useBlogData();
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const [open, setOpen] = useState(false);
    const allBlogs = blogData?.data?.data?.data;
    const [viewOption, setViewOption] = useState(1);
    const [findId, setFindId] = useState('');

    const [title, setTitle] = useState('');
    const [publisherName, setPublisherName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState();
    const [imgHolder, setImgHolder] = useState('');
    const [allBlogInfo] = useState({});
    const [updateAllBlogInfo] = useState({})

    const [updateTitle, setUpdateTitle] = useState('');
    const [updatePublisherName, setUpdatePublisherName] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [updateImg, setUpdateImg] = useState('');
    const [addImg, setAddImg] = useState('');
    const [blankIdentifier, setBlankIdentifier] = useState({});

    const [likeData, refetchLike] = useLikeData();
    const allLikes = likeData?.data?.data?.data;

    const [commentData, refetchComment] = useCommentData();
    const allComments = commentData?.data?.data?.data;

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

    const findpostsByEmail = allBlogs?.filter(f => {
        return f.email === user?.email;
    });

    const findBlog = findpostsByEmail?.find(f => {
        return f._id === findId;
    });

    const findPendings = findpostsByEmail?.filter(f => {
        return f.approval === false;
    });



    console.log(findpostsByEmail);

    useEffect(() => {
        setUpdateTitle(findBlog?.title);
        setUpdatePublisherName(findBlog?.name);
        setUpdateDate(findBlog?.release_date);
        setUpdateImg(findBlog?.imgLink);
        setUpdateDescription(findBlog?.description);

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
    }, [imgHolder, findBlog, allBlogInfo, updateAllBlogInfo, title, publisherName, user, date, content, updateImg]);

    console.log(imgHolder);


    const postBlog = async () => {

        allBlogInfo.title = title
        allBlogInfo.name = publisherName
        allBlogInfo.email = user?.email
        allBlogInfo.release_date = date
        allBlogInfo.imgLink = addImg
        allBlogInfo.description = content;

        setBlankIdentifier({
            title: title,
            name: publisherName,
            release_date: date,
            imgLink: addImg,
            description: content
        })

        console.log(allBlogInfo);

        if (
            allBlogInfo.title !== '' && allBlogInfo.name !== '' && allBlogInfo.email !== '' && allBlogInfo.release_date !== '' && allBlogInfo.imgLink !== '' && allBlogInfo.description !== ''
        ) {
            await fetchPostBlogData(allBlogInfo, refetch);
            toast.success('Blog added successfully');

            setTitle('');
            setPublisherName('');
            setDate('');
            setAddImg();
            setContent('');
            setImgHolder('');
        } else {
            toast.error('fillup all fields');
        }
    }

    const handleUpdate = async () => {
        updateAllBlogInfo.title = updateTitle;
        updateAllBlogInfo.name = updatePublisherName;
        updateAllBlogInfo.release_date = updateDate;
        updateAllBlogInfo.imgLink = updateImg;
        updateAllBlogInfo.description = content;

        await fetchUpdateBlogData(findId, updateAllBlogInfo, refetch);
        setImgHolder('');
        setContent('');
        toast.dark('updated successfully');
        console.log(updateAllBlogInfo);
    }

    const deletePost = async (theId) => {
        if (theId) {
            const result = window.confirm('are you sure to delete this item?');
            if (result) {
                await fetchDeleteBlogData(theId, refetch);
                toast.dark('successfully deleted');
                refetch();
            }

            const idsLike = allLikes?.filter(f => {
                return f?.link === theId
            })?.map(m => m._id)

            const idsComment = allComments?.filter(f => {
                return f?.link === theId
            })?.map(m => {
                return m._id
            })

            if (idsLike) {
                await fetchBulkDeleteLikeData(idsLike, refetchLike);

            }

            if (idsComment) {
                await fetchBulkDeleteCommentData(idsComment, refetchLike);
            }
        }








    }

    return (
        <div className={dashblog.main}>
            <div className={dashblog.container}>
                <div className={dashblog.titleContainer}>
                    <br />
                    <div className={dashblog.titleMain}>
                        <p className={dashblog.title}> YOUR BLOGS</p>
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
                    findpostsByEmail?.slice()?.reverse()?.map((blogs, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={blogs?._id} className={dashblog.detailPart}>
                                        <div className={dashblog.detailPartContainer}>
                                            <div className={dashblog.partOne}>
                                                <div className={dashblog.partOneDetail}>
                                                    <p className='mr-2'>{index + 1} </p>
                                                    <p title={blogs?.title} className={dashblog.partOneDetailTitle}>Title: {blogs?.title?.length > 37 ? blogs?.title?.slice(0, 37) + '...' : blogs?.title}</p>
                                                    <p title={blogs?.title} className={dashblog.partOneDetailTitleRes}>Title: {blogs?.title.length > 12 ? blogs?.title.slice(0, 12) + '...' : blogs?.title}</p>
                                                </div>
                                            </div>
                                            <div className={dashblog.partTwo}>
                                                <div className={dashblog.icons}>
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
                <div className={`${open ? 'block' : 'none'}  ${dashblog.modal}`}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={dashblog.modalDetail}>
                        <div className={dashblog.modalOption}>
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='view' onClick={() => handleOption(1)} className={`${dashblog.modalView} ${viewOption === 1 && 'bg-blue-600 text-white'} border border-blue-600 rounded `}>
                                    <p ><i class="uil uil-eye"></i></p>
                                </div>
                            }
                            {
                                (viewOption === 1 || viewOption === 2) &&
                                <div title='update' onClick={() => handleOption(2)} className={`${dashblog.modalUpdate} ${viewOption === 2 && 'bg-green-600 text-white'} border border-green-600 rounded`}>
                                    <p><i class="uil uil-edit "></i></p>
                                </div>
                            }
                            {
                                viewOption === 3 &&
                                <div title='add' onClick={() => handleOption(3)} className={`${dashblog.modalAdd} ${viewOption === 3 && 'bg-purple-600 text-white'} border border-purple-600 rounded`}>
                                    <p className='flex items-center justify-between w-5/6'><i class="uil uil-plus-circle text-2xl"></i> ADD BLOG</p>
                                </div>
                            }
                        </div>
                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${dashblog.viewPart}`}>
                                <div className={dashblog.viewPartMain}>
                                    <div className={dashblog.blogsContainer}>
                                        <br />
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-user-square"></i> {findBlog?.name}</p>
                                        <p className='text-sm text-gray-500 italic'> <i class="uil uil-clock-three"></i> {findBlog?.release_date}</p>
                                        <br />
                                        <hr />
                                        <br />
                                        <div className={dashblog.blogsImgContainer}>
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
                            <div className={`${dashblog.updatePart}`}>
                                <div className={`${dashblog.eventUpdateModalSection}`}>
                                    <br />
                                    <div className={dashblog.eventInputTitle}>
                                        <label htmlFor="">Blog Title</label>
                                        <input type="text"
                                            value={updateTitle}
                                            onChange={(e) => setUpdateTitle(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={dashblog.eventInputDateAndDeadline}>
                                        <div>
                                            <label htmlFor="">Publisher Name</label>
                                            <br />
                                            <input type="text"
                                                value={updatePublisherName}
                                                onChange={(e) => setUpdatePublisherName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Blog Date</label>
                                            <br />
                                            <input type="date"
                                                value={updateDate}
                                                onChange={(e) => setUpdateDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className={dashblog.eventsTextEditorSection}>
                                        <label htmlFor="">Blog Description</label>
                                        <div className='mt-2'>
                                            <JoditEditor
                                                ref={editor}
                                                value={updateDescription}
                                                onBlur={newContent => setContent(newContent)}
                                                onChange={(newContent) => setContent(newContent)}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className={dashblog.eventsImgSectionMain}>

                                        <div type="file" className={dashblog.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={dashblog.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={dashblog.chooseFile} type="file" name="" id=""
                                                    onChange={(e) => {
                                                        const imgFile = e.target.files[0];
                                                        setImgHolder(imgFile)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={dashblog.updateEventButton}>

                                        <div >
                                            <button onClick={handleUpdate} className='btn btn-primary mr-10'><i class="uil uil-edit mr-1"></i>update Blog</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            viewOption === 3 &&
                            <div className={`${dashblog.addPart}`}>
                                <div className={`${dashblog.addNewModalSection}`}>
                                    <br />
                                    <div className={dashblog.eventInputTitle}>
                                        <label htmlFor="">Blog Title</label>
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
                                    <div className={dashblog.eventInputDateAndDeadline}>
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
                                            <label htmlFor="">Blog Date</label>
                                            <br />
                                            <input
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                            {
                                                blankIdentifier.release_date === '' && <p className='text-sm text-red-600'>please fillup the field..</p>
                                            }
                                        </div>
                                    </div>
                                    <br />

                                    <div className={dashblog.eventsTextEditorSection}>

                                        <label htmlFor="">Blog Description</label>
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
                                    <div className={dashblog.eventsImgSectionMain}>

                                        <div type="file" className={dashblog.eventsImgSection}>
                                            <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                                {
                                                    imgHolder
                                                        ?
                                                        <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                        :
                                                        <span><i class="uil uil-image-v text-8xl"></i></span>
                                                }
                                            </div>
                                            <div className={dashblog.chooseFileDesign}>
                                                <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                                <input className={dashblog.chooseFile} type="file" name="" id=""
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

                                    <div className={dashblog.updateEventButton}>
                                        <button onClick={postBlog} className='btn btn-primary mr-10'><i class="uil uil-plus-circle mr-2"></i>Add Blog</button>
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

export default DashBlog;