import React, { useEffect, useRef, useState } from 'react';
import partners from './OurPartners.module.css';
import JoditEditor from 'jodit-react';

const OurPartners = ({ darkmode }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [blogData, setBlogData] = useState([]);

    const [updateModal, setUpdateModal] = useState(100);
    console.log(blogData)
    useEffect(() => {
        const url = 'blog.json';
        fetch(url).then(res => res.json()).then(res => setBlogData(res));
    }, [])
    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${partners.main} ${darkmode && 'bg-black text-white'}`}>
            <div className={partners.imgPart}>
                <p onClick={() => setUpdateModal(0)} className={partners.editButton}><i className="uil uil-edit mr-2 cursor-pointer text-white"></i></p>
                <img src="https://source.unsplash.com/1600x900/?business" alt="" />
            </div>
            <div className={partners.detailPart}>
                <div className={partners.leftPart}>
                    <p className='text-4xl font-bold text-purple-600' >OUR PARTNERS</p>
                    <p className='text-xl text-gray-600 ' >How We Deal</p>
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
                <div className={partners.rightPart}>
                    <p className='text-center'><i class="uil uil-file-edit-alt text-xl"></i> BLOGS</p>
                    <br />
                    <hr />
                    <div className={partners.allBlogTitles}>
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
            <div style={{ transform: `translateX(${updateModal}%)`, transition: 'transform 2s' }} className={`${partners.updateModal} ${darkmode ? 'bg-black' : 'bg-white'}`}>
                <div style={{ transition: '1s ease-in-out' }} className={`${partners.updateModalContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <span onClick={() => setUpdateModal(100)}><i className="uil uil-times cursor-pointer text-2xl ml-5"></i></span>
                    <br />
                    <br />
                    <hr />
                    <br />

                    <div className={partners.aboutTextEditorContainer}>
                        <div>
                            <p className='italic text-gray-500'>update description here...</p>
                        </div>
                        <br />
                        <div className={partners.aboutTextEditor}>
                            <div className={partners.aboutTextEditorSection}>
                                <JoditEditor
                                    ref={editor}
                                    value={description}
                                    onBlur={newContent => setContent(newContent)}
                                    onChange={newContent => { setDescription(newContent) }}
                                />
                            </div>
                            <br />
                            <div className={partners.aboutImgSectionMain}>

                                <div type="file" className={partners.aboutImgSection}>
                                    <div className={partners.chooseFileDesign}>
                                        <p className='text-white font-bold'><i class="uil uil-upload"></i> <span>Choose File</span></p>
                                        <input className={partners.chooseFile} type="file" name="" id="" />
                                    </div>


                                </div>
                            </div>
                        </div>
                        <br />
                        <div className={partners.updateButton}>
                            <button className='btn btn-primary'>update</button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurPartners;