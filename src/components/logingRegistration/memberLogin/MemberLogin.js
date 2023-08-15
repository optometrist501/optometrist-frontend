import React, { useEffect, useState } from 'react';
import member from './MemberLogin.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import { fetchPostMemberData, fetchUpdateMemberData } from '../../../fetchedData/fetchMemberData';
import { toast } from 'react-toastify';
import useMemberData from '../../../customHooks/useMemberSectionHook';
import { useLocation, useNavigate } from 'react-router-dom';
import { updloadImage } from '../../../fetchedData/fetchPostImageData';

const MemberLogin = ({ darkmode }) => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [memberData, refetch] = useMemberData();
    const [member_id, setMemberId] = useState('');
    const [password, setpassword] = useState('');;
    const allMember = memberData?.data?.data?.data;
    const [loginSwitch, setLoginSwith] = useState(false);
    const [imgHolder, setImgHolder] = useState('');

    const findEmail = allMember?.find(f => {
        return f.email === user?.email;
    });







    const imageLinkWord = process.env.REACT_APP_IMG_LINK_SLICED;
    const imgHolderModifiedWord = imgHolder.slice(0, 17);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const designation = e.target.designation.value;
        const mobile_no = e.target.mobile_no.value;
        const address = e.target.address.value;
        const imgLink = imgHolder

        const bodyData = {
            name,
            designation,
            mobile_no,
            address,
            imgLink,
            email: user?.email,
        };


        if (user?.email !== findEmail?.email) {

            if (imageLinkWord === imgHolderModifiedWord) {
                const response = await fetchPostMemberData(bodyData, refetch);

                if (response?.status === 200) {
                    toast.success('success');
                    navigate('/');
                } else {
                    toast.error(response);
                }
            } else {
                toast.error("image not added yet. please wait for load image")
            }

        } else {
            toast.error('account already exists');
        }

        e.target.address.value = '';
        e.target.name.value = '';
        e.target.mobile_no.value = '';
        e.target.designation.value = '';
    }

    const matchId = allMember?.find(f => {
        return f.email === user?.email
    });

    const matchPassword = allMember?.find(f => {
        return f.email === user?.email
    });

    const handleLogin = async (e) => {

        e.preventDefault();

        if (matchId?.member_id === member_id && matchPassword?.password === password) {

            const updateSignOutData = {
                isSignOut: false
            }

            const response = await fetchUpdateMemberData(findEmail?._id, updateSignOutData, refetch);

            if (response.status === 200) {
                if (findEmail?.approval === true) {

                    setTimeout(() => {
                        if (findEmail?.isAdmin === true) {
                            navigate('/panelBoard')
                        } else {
                            navigate('/dashboard')
                        }
                    }, 2000)

                    toast.success("Login succussfull");
                } else if (findEmail?.approval === false) {
                    toast.dark("Login successfull and wait for approval...")
                }
            }

        } else {
            toast.error("not matched");
        }

    }


    const pageLocation = useLocation();

    useEffect(() => {
        document.title = `oabd-${pageLocation?.pathname?.slice(1)}`;
    }, [pageLocation]);



    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${darkmode ? 'bg-black ' : 'bg-white '} loginMain`}>
            <div className={member.loginRegistrationContainer}>
                <div className={member.loginRegistrationOptions}>
                    <div onClick={() => setLoginSwith(false)} className={`${!loginSwitch && `${member.backgroundForOptions}`} ${darkmode && 'text-white'} ${member.loginOption} `}>Login</div>
                    <div onClick={() => setLoginSwith(true)} className={` ${loginSwitch && `${member.backgroundForOptions}`} ${darkmode && 'text-white'} ${member.registrationOption}`}>Registration</div>
                </div>
                <br />
                {
                    !loginSwitch &&
                    <form onSubmit={handleLogin}>
                        <div className={member.login_form}>
                            <div className={member.form_group}>
                                <label className={`${darkmode && 'text-white'}`}>Member_id:</label>
                                <input
                                    className={member.inputLoginReg}
                                    type="text"
                                    value={member_id}
                                    onChange={(e) => { setMemberId(e.target.value) }}
                                    required
                                />
                                <p>
                                    {
                                        member_id.length > 0 &&
                                        <p>
                                            {matchId?.member_id === member_id ? <p className='text-sm text-green-500'>matched</p> : <p className='text-sm text-red-500'>not matched...</p>}
                                        </p>
                                    }
                                </p>
                            </div>
                            <div className={member.form_group}>
                                <label className={`${darkmode && 'text-white'}`}>Password:</label>
                                <input
                                    className={member.inputLoginReg}
                                    type="password"
                                    value={password}
                                    onChange={(e) => { setpassword(e.target.value) }}
                                    required
                                />
                                <p>
                                    {
                                        password.length > 0 &&
                                        <p>
                                            {matchPassword?.password === password ? <p className='text-sm text-green-500'>matched</p> : <p className='text-sm text-red-500'>not matched...</p>}
                                        </p>
                                    }
                                </p>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />

                            <div className={member.loginRegSubmitBtn}>
                                <div className={member.loginRegSubmitBtnContainer}>
                                    <button onClick={() => {

                                    }} className={member.btnLoginReg} type="submit">Login</button>
                                </div>
                            </div>

                        </div>
                    </form>
                }
                {
                    loginSwitch &&
                    <div className={member.login_form}>
                        <form onSubmit={handleSubmit} >
                            <div className={member.memberReg}>
                                <div className={member.memberRegPartOne}>
                                    <div className={member.form_group}>
                                        <label className={`${darkmode && 'text-white'}`}>Name:</label>
                                        <input
                                            className={member.inputLoginReg}
                                            type="text"
                                            name='name'
                                            required
                                        />
                                    </div>
                                    <div className={member.form_group}>
                                        <label className={`${darkmode && 'text-white'}`}>Designation:</label>
                                        <input
                                            className={member.inputLoginReg}
                                            type="text"
                                            name='designation'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={member.memberRegPartTwo}>
                                    <div className={member.form_group}>
                                        <label className={`${darkmode && 'text-white'}`}>Mobile:</label>
                                        <input
                                            className={member.inputLoginReg}
                                            type="text"
                                            name='mobile_no'
                                            required
                                        />
                                    </div>
                                    <div className={member.form_group}>
                                        <label className={`${darkmode && 'text-white'}`}>Address:</label>
                                        <textarea
                                            className={member.inputLoginReg}
                                            type="text"
                                            name='address'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <label className={`${darkmode && 'text-white'}`}>Upload Your Photo :</label>
                                    <div className={member.chooseFileDesign}>
                                        <p className='text-white font-bold'>
                                            <i class="uil uil-upload mr-2"></i>
                                            <span>Choose File</span>
                                        </p>
                                        <input className={member.chooseFile} type="file" onChange={(e) => {
                                            const imgFile = e.target.files[0];

                                            updloadImage(imgFile, setImgHolder);
                                        }}
                                            required
                                        />
                                    </div>

                                </div>


                                {
                                    (imageLinkWord === imgHolderModifiedWord) && <span className='text-green-600 text-sm italic mt-5'>Image added</span>
                                }
                                <div>

                                </div>
                            </div>
                            <br />
                            <div className={member.loginRegSubmitBtn}>
                                <button onClick={() => {

                                }} className={member.btnLoginReg} type="submit">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
            <div className={member.fakeNavBackground}>

            </div>
        </div>
    );
};

export default MemberLogin;