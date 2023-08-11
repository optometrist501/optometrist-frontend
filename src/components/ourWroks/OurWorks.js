import React, { useEffect, useRef, useState } from 'react';
import works from './OurWorks.module.css';
import JoditEditor from 'jodit-react';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';

const OurWorks = ({ darkmode }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [blogData, setBlogData] = useState([]);
    const [updateModal, setUpdateModal] = useState(100);

    const [memberData] = useMemberData();
    const allMembers = memberData?.data?.data?.data;
    const [user] = useAuthState(auth);

    const findAdmin = allMembers?.find(f => {
        return f?.email === user?.email
    })

    useEffect(() => {
        const url = 'blog.json';
        fetch(url).then(res => res.json()).then(res => setBlogData(res));
    }, [])
    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${works.main} ${darkmode && 'bg-black text-white'}`}>
            <div className={works.imgPart}>
                {
                    findAdmin?.isAdmin &&
                    <p onClick={() => setUpdateModal(0)} className={works.editButton}><i className="uil uil-edit mr-5 text-green-500 cursor-pointer"></i></p>
                }
                <img src="https://source.unsplash.com/1600x900/?office" alt="" />
            </div>
            <div className={works.detailPart}>
                <div className={works.leftPart}>
                    <p className='text-4xl font-bold text-purple-600' >OUR WORKS</p>
                    <p className='text-xl text-gray-600 ' >What We Do</p>
                    <br />
                    <br />
                    <hr />
                    <br />
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi atque, aut iure omnis non distinctio. Quod culpa id provident dolor iure voluptatibus veniam modi ex itaque nesciunt ipsam pariatur, consequatur quam reiciendis sequi cupiditate nisi facilis sed? Dolorum, cumque reprehenderit tempora quasi voluptates dolorem nulla, adipisci at, rerum vel delectus amet modi iure? Accusamus repellendus at illum atque eveniet, suscipit deleniti ipsum quam voluptatibus laborum nostrum? Maxime suscipit repellat ipsa, laboriosam fugiat odio, laudantium velit inventore quisquam, error accusamus? Impedit omnis maiores fugit eum iure praesentium quam vel esse, consequuntur possimus suscipit reiciendis facere eos? Accusamus eaque dolor animi!
                    </p>

                    <br />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ducimus vitae reprehenderit, recusandae facere minima voluptatum eligendi quae numquam sint quas reiciendis exercitationem, beatae quaerat obcaecati magnam ea officia voluptates possimus temporibus illum nam? Nesciunt quisquam consequuntur unde non sapiente aliquam officia hic culpa saepe. Ipsa fugit debitis quibusdam ut!
                    </p>
                </div>
                <div className={works.rightPart}>
                    <p className='text-center'><i class="uil uil-file-edit-alt text-xl"></i> BLOGS</p>
                    <br />
                    <hr />
                    <div className={works.allBlogTitles}>
                        {
                            blogData?.map(blogTitle => {
                                return (
                                    <p className='text-gray-500 italic mb-4'>{blogTitle?.title}</p>
                                )
                            })
                        }
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
                                    value={description}
                                    onBlur={newContent => setContent(newContent)}
                                    onChange={newContent => { setDescription(newContent) }}
                                />
                            </div>
                            <br />
                            <div className={works.aboutImgSectionMain}>

                                <div type="file" className={works.aboutImgSection}>
                                    <div className={works.chooseFileDesign}>
                                        <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                        <input className={works.chooseFile} type="file" name="" id="" />
                                    </div>


                                </div>
                            </div>
                        </div>
                        <br />
                        <div className={works.updateButton}>
                            <button className='btn btn-primary'>update</button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurWorks;