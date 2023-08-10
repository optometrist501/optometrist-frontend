import React from 'react';
import useBlogData from '../../customHooks/useBlogSectionHook';
import { useParams } from 'react-router-dom';
import blogsDetail from './BlogHomeDetail.module.css';

const BlogHomeDetail = () => {
    const { blogId } = useParams();
    const [blogData] = useBlogData();

    const findDetailBlogInfo = blogData?.data?.data?.data?.find(f => {
        return f._id === blogId
    });



    return (
        <div>
            <div style={{ width: '100%' }} >
                <br />
                <br />
                <br />
                <br />
                <br />
                <hr />
                <br />
                <div className='m-5 border border-gray-500 p-4' >
                    <div style={{ maxWidth: '98%', margin: 'auto' }} className='bg-blue-300' >
                        <img className='mx-auto block' src={findDetailBlogInfo?.imgLink} alt="" />
                    </div>
                    <br />
                    <div >
                        <p className='font-bold text-2xl' >{findDetailBlogInfo?.title}</p>
                    </div>
                    <br />
                    <div >
                        <p dangerouslySetInnerHTML={{ __html: findDetailBlogInfo?.description }} ></p>
                    </div>
                    <br />

                </div>
            </div>

            <div className="fakeNavBackground">

            </div>
        </div>
    );
};

export default BlogHomeDetail;