import React from 'react';
import aboutDetail from './AboutDetails.module.css';
import useAboutData from '../../customHooks/useAboutSectionHook';
import useBlogData from '../../customHooks/useBlogSectionHook';
import { useNavigate } from 'react-router-dom';

const AboutDetails = ({ darkmode }) => {

    const navigate = useNavigate();

    const [aboutData] = useAboutData();
    const aboutAll = aboutData?.data?.data?.data;

    const [blogData] = useBlogData();
    const allBlogs = blogData?.data?.data?.data;

    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${aboutDetail.main} ${darkmode && 'bg-black text-white'}`}>
            {
                aboutAll?.map(worksInfo => {
                    return (
                        <div className={aboutDetail.imgPart}>
                            <img src={worksInfo?.imgBig} alt="" />
                        </div>
                    )
                })
            }
            <div className={aboutDetail.detailPart}>
                {
                    aboutAll?.map(workInfoAll => {
                        return (
                            <div className={aboutDetail.leftPart}>

                                <p className='text-xl text-gray-600 ' >ABOUT US</p>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <p dangerouslySetInnerHTML={{ __html: workInfoAll?.description }}>
                                </p>
                            </div>
                        )
                    })
                }
                <div className={aboutDetail.rightPart}>
                    <p className='text-center'><i class="uil uil-file-edit-alt text-xl"></i> BLOGS</p>
                    <br />
                    <hr />
                    <div className={aboutDetail.allBlogTitles}>
                        {
                            allBlogs?.slice(0, 7)?.map((blogTitle) => {
                                return (
                                    <p
                                        onClick={() => navigate(`/blogsDetail/${blogTitle?._id}`)}
                                        className='text-gray-500 italic mb-4 cursor-pointer'>{blogTitle?.title}</p>
                                )
                            })
                        }
                        <p onClick={() => navigate('/blogs')} className='text-blue-500 italic cursor-pointer'>view more</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutDetails;