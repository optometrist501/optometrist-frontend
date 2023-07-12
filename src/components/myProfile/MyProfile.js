import React, { useState } from 'react';
import myProfile from './MyProfile.module.css';

const MyProfile = ({ darkmode }) => {
    const [viewEditOption, setViewEditOption] = useState(false);

    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${myProfile.main} ${darkmode && 'bg-black text-white'}`}>

            <div style={{ transition: '1s ease-in-out' }} className={`${myProfile.container} ${darkmode ? 'bg-black border border-white' : 'bg-white'}`}>
                <div className={myProfile.firstPart}>
                    <img src="https://source.unsplash.com/1600x900/?potrait" alt="" />
                    <p className='text-right mr-10 text-3xl text-green-500 relative'>

                        <input className='absolute top-0 left-20 opacity-0  transform scale-50' type="file" name="" id="" />
                        <i class="uil uil-plus-circle"></i>
                    </p>
                    <div className={myProfile.imgNameDesignation}>
                        <p className='font-bold text-purple-800 text-xl'>John Doe</p>
                        <p className='text-sm text-gray-500 '>Eye Specialist</p>
                    </div>
                </div>
                <div className={myProfile.secondPart}>
                    <div className={viewEditOption ? 'none' : 'block'} >
                        <p>Mobile : +99776487609</p>
                        <p>Email : john_doe154@gmail.com</p>
                        <p>Address: Ontario, Canada</p>
                        <br />
                        <br />
                        <br />
                        <hr />
                        <br />
                        <p>Id: M-00536</p>
                        <p>Password: 1265f@#c</p>
                    </div>
                    <div className={viewEditOption ? 'block' : 'none'}>
                        <input className='border border-gray-600 p-1 w-56' placeholder='type mobile' type="text" />
                        <br /><br />
                        <input className='border border-gray-600 p-1 w-56' placeholder='type email' type="text" />
                        <br /><br />
                        <textarea className='border border-gray-600 p-1 w-56' placeholder='type address' type="text" />
                        <br /><br />
                        <br />
                        <br />
                        <hr />
                        <br />
                        <input className='border border-gray-600 p-1 w-56' placeholder='password' type="text" />
                        <br />
                        <br />
                        <button className='btn btn-primary w-56'>update</button>
                    </div>
                </div>
                <span onClick={viewEditOption ? () => setViewEditOption(false) : () => setViewEditOption(true)} ><i className="uil uil-edit cursor-pointer"></i></span>
            </div>
        </div>
    );
};

export default MyProfile;