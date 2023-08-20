import React, { useEffect, useRef, useState } from 'react';
import works from './OurWorks.module.css';
import JoditEditor from 'jodit-react';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import useWrokSectionHook from '../../customHooks/useWrokSectionHook';
import { fetchUpdateWorkData } from '../../fetchedData/fetchWorkData';
import { updloadImage } from '../../fetchedData/fetchPostImageData';
import { toast } from 'react-toastify';
import useBlogData from '../../customHooks/useBlogSectionHook';
import { useNavigate } from 'react-router-dom';

const OurWorks = ({ darkmode }) => {
    const navigate = useNavigate();
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [idContainer, setIdContainer] = useState('');
    const [description, setDescription] = useState('');

    const [updateModal, setUpdateModal] = useState(100);
    const [imgHolder, setImgHolder] = useState('');

    const [memberData] = useMemberData();
    const allMembers = memberData?.data?.data?.data;
    const [user] = useAuthState(auth);

    const [getWorkData, refetch] = useWrokSectionHook();
    const workData = getWorkData?.data?.data?.data;

    const [blogs] = useBlogData();
    const blogData = blogs?.data?.data?.data;
    const findAdmin = allMembers?.find(f => {
        return f?.email === user?.email
    });

    const findWorksById = workData?.find(f => {
        return f?._id === idContainer;
    })




    useEffect(() => {
        setImgHolder(findWorksById?.imgOne)
    }, [findWorksById])


    const updateWorkData = async () => {

        const updateData = {
            descriptionOne: description,
            imgOne: imgHolder
        }

        await fetchUpdateWorkData(idContainer, updateData, refetch)
            .then(res => {
                if (res?.data?.statusCode === 200) {
                    toast.success('successfully updated')
                }
            })


    }

    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${works.main} ${darkmode && 'bg-black text-white'}`}>
            {
                workData?.map(worksInfo => {
                    return (
                        <div className={works.imgPart}>
                            {
                                findAdmin?.isAdmin &&
                                <p onClick={() => {
                                    setUpdateModal(0)
                                    setIdContainer(worksInfo?._id)
                                }} className={works.editButton}>
                                    <i className="uil uil-edit text-white mr-5 cursor-pointer"></i>
                                </p>
                            }
                            <img src={worksInfo?.imgOne} alt="" />
                        </div>
                    )
                })
            }
            <div className={works.detailPart}>
                {
                    workData?.map(workInfoAll => {
                        return (
                            <div className={works.leftPart}>
                                <p className='text-4xl font-bold text-purple-600' >{workInfoAll?.titleOne}</p>
                                <p className='text-xl text-gray-600 ' >What We Do</p>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <p dangerouslySetInnerHTML={{ __html: workInfoAll?.descriptionOne }}>
                                </p>
                            </div>
                        )
                    })
                }
                <div className={works.rightPart}>
                    <p className='text-center'><i class="uil uil-file-edit-alt text-xl"></i> BLOGS</p>
                    <br />
                    <hr />
                    <div className={works.allBlogTitles}>
                        {
                            blogData?.slice(0, 7)?.map((blogTitle) => {
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
            <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${works.updateModal} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                <div style={{ transition: '1s ease-in-out' }} className={`${works.updateModalContainer} ${darkmode ? 'bg-black' : 'bg-white'}`}>
                    <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                    <br />
                    <br />
                    <hr />
                    <br />

                    <div className={works.aboutTextEditorContainer}>
                        <div>
                            <p className='italic text-gray-500'>update description here...</p>
                        </div>
                        <br />
                        <div className={works.aboutTextEditor}>
                            <div className={works.aboutTextEditorSection}>
                                <JoditEditor
                                    ref={editor}
                                    value={findWorksById?.descriptionOne}
                                    onBlur={newContent => setContent(newContent)}
                                    onChange={newContent => { setDescription(newContent) }}
                                />
                            </div>
                            <br />

                            <div className={works.aboutImgSectionMain}>
                                <div type="file" className={works.aboutImgSection}>
                                    <div style={{ width: '150px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                        {
                                            imgHolder
                                                ?
                                                <img style={{ height: '100px', width: '150px' }} src={imgHolder} alt="" />
                                                :
                                                <span><i class="uil uil-image-v text-8xl"></i></span>
                                        }
                                    </div>
                                    <div className={works.chooseFileDesign}>
                                        <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                        <input className={works.chooseFile} type="file" name="" id=""
                                            onChange={(e) => {
                                                const imgFile = e.target.files[0];
                                                updloadImage(imgFile, setImgHolder)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className={works.updateButton}>
                            <button onClick={updateWorkData} className='btn btn-primary'>update</button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurWorks;