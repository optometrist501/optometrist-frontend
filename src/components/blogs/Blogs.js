import React, { useEffect, useState } from 'react';
import blogs from './Blogs.module.css'
import useBlogData from '../../customHooks/useBlogSectionHook';
import useLikeData from '../../customHooks/useLikeSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import { fetchDeleteLikeData, fetchPostLikeData } from '../../fetchedData/fetchLikeData';
import { useNavigate } from 'react-router-dom';
import { fetchPostCommentData } from '../../fetchedData/fetchCommentData';
import useCommentData from '../../customHooks/useCommentSectionHooks';
import { toast } from 'react-toastify';
import useBlogBySearchSectionData from '../../customHooks/useBlogBySearchSectionHook';
import { fetchGetBlogBySearchData } from '../../fetchedData/fetchBlogData';

const Blogs = ({ darkmode }) => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [likeData, refetch] = useLikeData();
    const allLikes = likeData?.data?.data?.data;


    const [blogData] = useBlogData();
    const allBlogs = blogData?.data?.data?.data;

    const [blogBySearchData, setBlogBySearchData] = useState([]);
    console.log(blogBySearchData);

    const [updateModal, setUpdateModal] = useState(100)

    const [flipDrawer, setFlipDrawer] = useState(-50);

    const [number, setNumber] = useState(10);
    const [buttonNumber, setButtonNumber] = useState(10);
    const [modifiedButtonNumber, setModifiedButtonNumber] = useState();
    const [idContainer, setIdContainer] = useState('');
    const [commentSwitch, setCommentSwitch] = useState(false);
    const [comments, setComments] = useState('');
    const [search, setSearch] = useState('');
    const [roundedDataLength, setRoundedDataLength] = useState()


    const [commentData, refetchComments] = useCommentData();
    const allComments = commentData?.data?.data?.data;


    const findApprovedBlogs = allBlogs?.filter(f => {
        return f.approval === true;
    });

    const findApprovedBlogsBySearch = blogBySearchData?.filter(f => {
        return f.approval === true;
    })


    const findDetailBlogInfo = findApprovedBlogs?.find(f => {
        return f._id === idContainer
    })


    const commentsFilteredByBlogId = allComments?.filter(f => {
        return f?.link === idContainer
    });


    const handlePostLike = async (idforLike) => {
        if (user?.email) {

            const bodyData = {
                email: user?.email,
                link: idforLike
            }
            await fetchPostLikeData(bodyData, refetch)
        } else {
            navigate('/login');
        }
    }

    const handleDeleteLike = async (blogId) => {
        console.log(blogId);

        const findLikeId = allLikes?.filter(f => {
            return f.link === blogId
        })?.find(f => {
            return f.email === user?.email
        })?._id

        console.log(findLikeId);

        if (user?.email) {
            await fetchDeleteLikeData(findLikeId, refetch)
        } else {
            navigate('/login');
        }
    }


    const handleComments = (idForComments) => {
        setCommentSwitch(true);
        setIdContainer(idForComments);

    }

    const postComment = async () => {

        const commentBody = {
            name: user?.displayName,
            email: user?.email,
            link: idContainer,
            comments: comments
        };


        if (user?.email) {


            if (comments !== '') {
                const response = await fetchPostCommentData(commentBody, refetchComments);
                if (response?.status === 200) {
                    toast("comment post successfully");
                } else {
                    toast.error("failed to post");
                }
            } else {
                toast.error('you can not post comment blank')
            }


        } else {
            navigate('/login');
            setCommentSwitch(false)
        }
        setComments('');
    }



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchGetBlogBySearchData(search);
                // console.log(response?.data?.data?.data);
                setBlogBySearchData(response?.data?.data?.data)
            } catch (error) {

            }
        }
        fetchData()

    }, [search])


    const handleModalSection = (value) => {
        setUpdateModal(0);
        setIdContainer(value)
    }


    // pagination
    useEffect(() => {
        if (search === '') {
            setRoundedDataLength(Math.ceil(findApprovedBlogs?.length / 10))
        } else {
            setRoundedDataLength(Math.ceil(findApprovedBlogsBySearch?.length / 10))
        }
    }, [findApprovedBlogs?.length, findApprovedBlogsBySearch?.length, search])

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

    const getSingleBlogFromTitle = (idFromTitle) => {
        setUpdateModal(0);
        setIdContainer(idFromTitle);
    }



    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${blogs.blogsMain} ${darkmode && 'bg-black'}`}>
            <div className={blogs.blogsMainContainer}>
                <div onMouseLeave={() => setFlipDrawer(-50)} style={{ left: `${flipDrawer}%`, transition: '1s ease-in-out' }} className={blogs.blogsFirstPart}>
                    <div className={blogs.blogsFirstPartContainer}>


                        <div
                            className={blogs.blogs_Main_Title}>
                            <span>
                                <i class="uil uil-file-edit-alt text-xl"></i>
                                <span> Blogs</span>
                            </span>
                            <span>
                                <i class="uil uil-angle-double-left text-2xl"></i>
                            </span>
                        </div>
                        {
                            search === ''
                                ?
                                <div className={blogs.blogsFirstPartDetail}>
                                    {
                                        findApprovedBlogs?.slice((number - 10), number)?.reverse()?.map(blogData => {
                                            return (
                                                <p onClick={() => getSingleBlogFromTitle(blogData?._id)} className='cursor-pointer'>
                                                    {

                                                        <p title={blogData?.title} className={blogs.title}>{blogData?.title?.length > 30 ? blogData?.title?.slice(0, 29) + '...' : blogData?.title}</p>
                                                    }
                                                </p>
                                            )
                                        })
                                    }
                                </div>
                                :

                                <div className={blogs.blogsFirstPartDetail}>
                                    {
                                        findApprovedBlogsBySearch?.length > 0 &&
                                        <div>
                                            {
                                                findApprovedBlogsBySearch?.slice((number - 10), number)?.map(blogData => {
                                                    return (
                                                        <p onClick={() => getSingleBlogFromTitle(blogData?._id)} className='cursor-pointer'>
                                                            {

                                                                <p title={blogData?.title} className={blogs.title}>{blogData?.title?.length > 30 ? blogData?.title?.slice(0, 29) + '...' : blogData?.title}</p>
                                                            }
                                                        </p>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                    {findApprovedBlogsBySearch?.length === 0 &&
                                        <p className='text-red-600 ml-3'>Found nothing from search result</p>
                                    }
                                </div>

                        }

                    </div>
                </div>
                <div className={blogs.blogsSecondPart}>
                    <div className={blogs.blogsSecondPartContainer}>

                        <div className={blogs.searchBar}>
                            <span className={blogs.bargerRes}> <i onClick={flipDrawer === 0 ? () => setFlipDrawer(50) : () => setFlipDrawer(0)} className=" uil uil-bars ml-2"></i></span>
                            <div className={blogs.searchBarContainer}>
                                <div>
                                    <i className="uil uil-search text-xl "></i>
                                    <input
                                        className={blogs.blogs_input}
                                        placeholder='search'
                                        type="text"
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                    />
                                </div>
                                <i onClick={() => setSearch('')} className="uil uil-times text-xl cursor-pointer"></i>
                            </div>

                            <div className={blogs.totalBlogs}>
                                <span>TOTAL BLOGS: {search === '' ? findApprovedBlogs?.length : findApprovedBlogsBySearch?.length}</span>
                                <span>  |  </span>
                                <span>PAGE: {number.toString().slice(0, (number.toString().length - 1))}</span>
                            </div>
                        </div>
                        {
                            search === '' ?
                                <div style={{ transition: '1s ease-in-out' }} className={`${blogs.blogs} ${darkmode && 'bg-black text-white'}`}>
                                    {
                                        findApprovedBlogs?.slice(number - 10, number)?.reverse()?.map(allBlogs => {
                                            return (
                                                <div className={blogs.blogsContainer}>
                                                    <br />
                                                    <p className='text-sm text-gray-500 italic'> <i class="uil uil-user-square"></i> {allBlogs.name}</p>
                                                    <p className='text-sm text-gray-500 italic'> <i class="uil uil-clock-three"></i> {allBlogs.release_date}</p>
                                                    <br />
                                                    <hr />
                                                    <br />
                                                    <div className={blogs.blogsImgContainer}>
                                                        <img src={allBlogs.imgLink} alt="" />
                                                    </div>
                                                    <br />
                                                    <p className='text-3xl font-bold'>{allBlogs.title}</p>
                                                    <br />
                                                    <p dangerouslySetInnerHTML={{ __html: allBlogs.description }}></p>
                                                    <br />
                                                    <div className={blogs.blogLastPart}>
                                                        <div className={blogs.blogLastPartOne}>
                                                            {
                                                                allLikes?.filter(f => {
                                                                    return f?.email === user?.email
                                                                })?.find(f => {
                                                                    return f?.link === allBlogs?._id
                                                                })?.link !== allBlogs?._id
                                                                    ?
                                                                    <span onClick={() => handlePostLike(allBlogs?._id)}><i class="uil uil-heart cursor-pointer"></i></span>
                                                                    :
                                                                    <span onClick={() => handleDeleteLike(allBlogs?._id)}><i class="uil uil-heart cursor-pointer text-red-600"></i></span>
                                                            }
                                                            <span className='ml-1'>{allLikes?.filter(f => {
                                                                return f?.link === allBlogs?._id
                                                            })?.length}</span>
                                                            <span className='ml-5'>
                                                                <i onClick={() => handleComments(allBlogs?._id)} class="uil uil-comment-alt-dots cursor-pointer"></i>
                                                            </span>
                                                            <span className='ml-2'>
                                                                {
                                                                    allComments?.filter(f => {
                                                                        return f?.link === allBlogs?._id
                                                                    })?.length
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className={blogs.blogLastPartTwo}>
                                                            <span onClick={() => handleModalSection(allBlogs?._id)} ><i className="uil uil-eye mr-2 cursor-pointer"></i></span>

                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div style={{ transition: '1s ease-in-out' }} className={`${blogs.blogs} ${darkmode && 'bg-black text-white'}`}>
                                    {
                                        findApprovedBlogsBySearch?.slice(number - 10, number)?.map(allBlogs => {
                                            return (
                                                <div className={blogs.blogsContainer}>
                                                    {
                                                        <div>
                                                            <br />
                                                            <p className='text-sm text-gray-500 italic'> <i class="uil uil-user-square"></i> {allBlogs.name}</p>
                                                            <p className='text-sm text-gray-500 italic'> <i class="uil uil-clock-three"></i> {allBlogs.release_date}</p>
                                                            <br />
                                                            <hr />
                                                            <br />
                                                            <div className={blogs.blogsImgContainer}>
                                                                <img src={allBlogs.imgLink} alt="" />
                                                            </div>
                                                            <br />
                                                            <p className='text-3xl font-bold'>{allBlogs.title}</p>
                                                            <br />
                                                            <p dangerouslySetInnerHTML={{ __html: allBlogs.description }}></p>
                                                            <br />
                                                            <div className={blogs.blogLastPart}>
                                                                <div className={blogs.blogLastPartOne}>
                                                                    {
                                                                        allLikes?.filter(f => {
                                                                            return f?.email === user?.email
                                                                        })?.find(f => {
                                                                            return f?.link === allBlogs?._id
                                                                        })?.link !== allBlogs?._id
                                                                            ?
                                                                            <span onClick={() => handlePostLike(allBlogs?._id)}><i class="uil uil-heart cursor-pointer"></i></span>
                                                                            :
                                                                            <span onClick={() => handleDeleteLike(allBlogs?._id)}><i class="uil uil-heart cursor-pointer text-red-600"></i></span>
                                                                    }
                                                                    <span className='ml-1'>{allLikes?.filter(f => {
                                                                        return f?.link === allBlogs?._id
                                                                    })?.length}</span>
                                                                    <span className='ml-5'>
                                                                        <i onClick={() => handleComments(allBlogs?._id)} class="uil uil-comment-alt-dots cursor-pointer"></i>
                                                                    </span>
                                                                    <span className='ml-2'>
                                                                        {
                                                                            allComments?.filter(f => {
                                                                                return f?.link === allBlogs?._id
                                                                            })?.length
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className={blogs.blogLastPartTwo}>
                                                                    <span onClick={() => handleModalSection(allBlogs?._id)} ><i className="uil uil-eye mr-2 cursor-pointer"></i></span>

                                                                </div>
                                                            </div>
                                                            <br />
                                                        </div>
                                                    }


                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        findApprovedBlogsBySearch?.length === 0 &&
                                        <div style={{ width: '98%', height: '400px', boxShadow: ' 0 0 10px rgba(0, 0, 0, 0.2)', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p className='text-red-600'>Found nothing from search result</p>
                                        </div>
                                    }

                                </div>
                        }
                        <div className={blogs.pagination} >

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <button onClick={() => handlePageButton('decrease')}> <p style={{ fontSize: '25px', marginRight: '25px' }}> <i className='uil uil-angle-left-b'></i></p></button>
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
                        <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${blogs.updateModal} ${darkmode && 'bg-black'}`}>
                            <div style={{ transition: '1s ease-in-out' }} className={`${blogs.updateModalContainer} ${darkmode && 'bg-black text-white'}`}>
                                <br />
                                <br />
                                <br />
                                <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <div className={blogs.modalCover}>
                                    <div className={blogs.modalImg}>
                                        <img src={findDetailBlogInfo?.imgLink} alt="" />
                                    </div>
                                    <br />
                                    <div className={blogs.modalTitle}>
                                        <p className='text-center text-2xl'>{findDetailBlogInfo?.title}</p>
                                    </div>
                                    <br />
                                    <div className={blogs.modaDescription}>
                                        <p dangerouslySetInnerHTML={{ __html: findDetailBlogInfo?.description }} className=''></p>
                                    </div>
                                    <br />

                                </div>
                            </div>
                        </div>
                        <div className={commentSwitch ? 'block' : 'none'}>
                            <div className={blogs.blogComments}>
                                <div className={blogs.blogCommentsContainer}>
                                    <div className={blogs.blogCommentBar}>
                                        <div className={blogs.commentBarOne}>
                                            <span className='ml-5 font-bold'>
                                                {
                                                    findDetailBlogInfo?.title
                                                }
                                            </span>
                                        </div>
                                        <div className={blogs.commentBarTwo}>
                                            <i onClick={() => setCommentSwitch(false)} class="uil uil-times text-xl cursor-pointer"></i>
                                        </div>
                                    </div>
                                    <div className={blogs.blogCommentsPart}>
                                        <div className={blogs.allCommentsPart}>
                                            {
                                                commentsFilteredByBlogId?.map((comments, index) =>

                                                    <div className='mb-10'>
                                                        <p className='text-sm text-gray-500 italic'><span>{index + 1}.</span> {comments?.name}</p>
                                                        <hr className='ml-2' />
                                                        <p className='text-sm ml-2'>{comments?.comments}</p>
                                                    </div>

                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className={blogs.commentInputField}>
                                        <span>
                                            <input type="text"
                                                value={comments}
                                                onChange={(e) => setComments(e.target.value)}
                                            />
                                        </span>
                                        <span onClick={postComment}>
                                            <i class="uil uil-message text-2xl ml-5 cursor-pointer"></i>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={blogs.fakeNavBackground}>

            </div>
        </div>
    );
};

export default Blogs;