import React, { useEffect, useRef, useState } from 'react';
import blogs from './Blogs.module.css'
import JoditEditor from 'jodit-react';
import useBlogData from '../../customHooks/useBlogSectionHook';

const Blogs = ({ darkmode }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [sectionController, setSectionController] = useState(1);
    const [blogData] = useBlogData();
    const allBlogs = blogData?.data?.data?.data;
    console.log(allBlogs);
    const [updateModal, setUpdateModal] = useState(100)

    const [flipDrawer, setFlipDrawer] = useState(-50);

    const [number, setNumber] = useState(10);
    const [buttonNumber, setButtonNumber] = useState(10);
    const [modifiedButtonNumber, setModifiedButtonNumber] = useState();
    const [idContainer, setIdContainer] = useState('');
    const findApprovedBlogs = allBlogs?.filter(f => {
        return f.approval === true;
    });
    console.log(findApprovedBlogs);

    const findDetailBlogInfo = findApprovedBlogs?.find(f => {
        return f._id === idContainer
    })


    const handleModalSection = (value) => {
        setUpdateModal(0);
        setIdContainer(value)
    }


    // pagination
    const roundedDataLength = Math.ceil(findApprovedBlogs?.length / 10);
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
                        <div className={blogs.blogsFirstPartDetail}>
                            {
                                findApprovedBlogs?.slice((number - 10), number)?.reverse()?.map(blogData => {
                                    return (
                                        <p>
                                            {

                                                <p title={blogData?.title} className={blogs.title}>{blogData?.title?.length > 30 ? blogData?.title?.slice(0, 29) + '...' : blogData?.title}</p>
                                            }
                                        </p>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                <div className={blogs.blogsSecondPart}>
                    <div className={blogs.blogsSecondPartContainer}>

                        <div className={blogs.searchBar}>
                            <span className={blogs.bargerRes}> <i onClick={flipDrawer === 0 ? () => setFlipDrawer(50) : () => setFlipDrawer(0)} className=" uil uil-bars ml-2"></i></span>
                            <div className={blogs.searchBarContainer}>
                                <div>
                                    <i className="uil uil-search text-xl "></i>
                                    <input className={blogs.blogs_input} placeholder='search' type="text" />
                                </div>
                                <i class="uil uil-times text-xl cursor-pointer"></i>
                            </div>

                            <div className={blogs.totalBlogs}>
                                <span>TOTAL BLOGS: {findApprovedBlogs?.length}</span>
                                <span>  |  </span>
                                <span>PAGE: {number.toString().slice(0, (number.toString().length - 1))}</span>
                            </div>
                        </div>
                        <div style={{ transition: '1s ease-in-out' }} className={`${blogs.blogs} ${darkmode && 'bg-black text-white'}`}>
                            {
                                findApprovedBlogs?.slice(number - 10, number)?.reverse()?.map(allBlogs => {
                                    return (
                                        <div>
                                            {
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
                                                    <p>{allBlogs.description}</p>
                                                    <br />
                                                    <div className={blogs.blogLastPart}>
                                                        <div className={blogs.blogLastPartOne}>
                                                            <span><i class="uil uil-heart"></i></span>
                                                            <span> 0</span>
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
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;