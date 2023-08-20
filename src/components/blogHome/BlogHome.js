import React, { useEffect, useState } from 'react';
import './BlogHome.css';
import { Link, useNavigate } from 'react-router-dom';
import useBlogData from '../../customHooks/useBlogSectionHook';


const BlogHome = ({ darkmode }) => {
    const navigate = useNavigate();
    const [imgData, setImgData] = useState([]);
    const [blogData] = useBlogData();
    const allBlogs = blogData?.data?.data?.data;

    useEffect(() => {
        setImgData(allBlogs);
    }, [allBlogs])


    const [count, setCount] = useState(0);




    const handleDirection = (value) => {
        if (value === 'decrease') {
            if (count === 0) {
                setCount(imgData?.length - 1)
            } else {
                setCount(count - 1)
            }
        }

        if (value === 'increase') {
            if (count === imgData?.length - 1) {
                setCount(0)
            } else {
                setCount(count + 1)
            }
        }
    }


    const handleNavigate = (idValue) => {
        navigate(`/blogsDetail/${idValue}`)
    }

    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${darkmode ? 'bg-black text-white' : 'bg-white'} pt-5 pb-5`} >
            <p className='text-5xl font-bold text-center mb-7'>BLOGS</p>
            <div className="blog-modal-part">

                <div data-aos='fade-up' duration='300' className='blog-modal-main '>
                    <div className={`${!darkmode && 'blogBackground'} blog-modal`}>

                        <div style={{ width: `${imgData?.length * 100}%` }} className="blog-modal-container">
                            {
                                imgData?.slice()?.reverse()?.map((blogs) => {
                                    return (
                                        <div key={blogs.id} style={{ transform: `translateX(${count * -100}%)`, transition: 'transform 1s' }} className="allBlogs">
                                            <p className='text-gray-500 text-sm italic'><i class="uil uil-user-square"></i> {blogs.name}</p>
                                            <p className='text-gray-500 text-sm italic'><i className="uil uil-clock-three"></i> {blogs.release_date}</p>
                                            <br />
                                            <  hr />
                                            <br />
                                            <h1 className='text-2xl font-bold mb-12'>{blogs.title}</h1>
                                            <p dangerouslySetInnerHTML={{ __html: blogs?.description?.length > 888 ? blogs?.description?.slice(0, 888) + '...' : blogs?.description }}>

                                            </p>
                                            <p onClick={() => handleNavigate(blogs?._id)}>{blogs?.description?.length > 888 && <span className='text-blue-500 cursor-pointer'>see more</span>}</p>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>

                </div>

                <div className='blogSlideController'>
                    <div className='blogSlideControllerMain'>
                        <span onClick={() => handleDirection('decrease')}> <p style={{ color: 'gray' }}><i class="uil uil-angle-left-b"></i></p> </span>
                        <span onClick={() => handleDirection('increase')}> <p style={{ color: 'gray' }}><i class="uil uil-angle-right-b"></i></p> </span>
                    </div>
                </div>

            </div>
            <div style={{ width: '150px', height: '150px' }} className=" flex items-center justify-center mx-auto">
                <Link to='/blogs'><button className='btn btn-primary '>view detail</button></Link>
            </div>

        </div>
    );
};

export default BlogHome;