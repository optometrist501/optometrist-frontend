import React, { useEffect, useState } from 'react';
import member from './MemberLogin.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import { fetchPostMemberData, fetchUpdateMemberData } from '../../../fetchedData/fetchMemberData';
import { toast } from 'react-toastify';
import useMemberData from '../../../customHooks/useMemberSectionHook';
import { useNavigate } from 'react-router-dom';

const MemberLogin = (darkmode) => {
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

    console.log(findEmail);


    useEffect(() => {
        if (imgHolder) {
            const imgStorageKey = `${process.env.REACT_APP_IMG_STORAGE_KEY}`;
            const formData = new FormData();
            formData.append('image', imgHolder);
            const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(result => {

                    setImgHolder(result?.data?.url)
                })
        }
    }, [imgHolder]);

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
            email: user?.email
        };
        console.log(bodyData);


        if (bodyData.name !== '' && bodyData.address !== '' && bodyData.designation !== '' && bodyData.email !== '' && bodyData.mobile_no !== '' && bodyData.imgLink !== '') {

            if (user?.email !== findEmail?.email) {
                await fetchPostMemberData(bodyData);
                toast.success('Request Submitted successfully');
                navigate('/');
            } else {
                toast.error('account already exists');
            }

        } else {
            toast.error('failed to submit');
        };

        e.target.address.value = '';
        e.target.name.value = '';
        e.target.mobile_no.value = '';
        e.target.designation.value = '';
    }

    console.log(member_id);

    const matchId = allMember?.find(f => {
        return f.member_id === member_id
    });




    const matchPassword = allMember?.find(f => {
        return f.password === password
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
                        navigate('/dashboard')
                    }, 1000)
                    toast.success("Login succussfull");
                } else if (findEmail?.approval === false) {
                    toast.dark("Login successfull and wait for approval...")
                }
            }

        } else {
            toast.error("not matched");
        }

    }


    return (
        <div style={{ transition: '1s ease-in-out' }} className={`loginMain`}>
            <div className={member.loginRegistrationContainer}>
                <div className={member.loginRegistrationOptions}>
                    <div onClick={() => setLoginSwith(false)} className={`${!loginSwitch && `${member.backgroundForOptions}`} ${member.loginOption}`}>Login</div>
                    <div onClick={() => setLoginSwith(true)} className={` ${loginSwitch && `${member.backgroundForOptions}`} ${member.registrationOption}`}>Registration</div>
                </div>
                <br />
                {
                    !loginSwitch &&
                    <form onSubmit={handleLogin}>
                        <div className={member.login_form}>
                            <div className={member.form_group}>
                                <label>Member_id:</label>
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
                                <label>Password:</label>
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
                                        <label>Name:</label>
                                        <input
                                            className={member.inputLoginReg}
                                            type="text"
                                            name='name'
                                            required
                                        />
                                    </div>
                                    <div className={member.form_group}>
                                        <label>Designation:</label>
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
                                        <label>Mobile:</label>
                                        <input
                                            className={member.inputLoginReg}
                                            type="text"
                                            name='mobile_no'
                                            required
                                        />
                                    </div>
                                    <div className={member.form_group}>
                                        <label>Address:</label>
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
                                    <label>Upload Your Photo :</label>
                                    <div className={member.chooseFileDesign}>
                                        <p className='text-white font-bold'>
                                            <i class="uil uil-upload mr-2"></i>
                                            <span>Choose File</span>
                                        </p>
                                        <input className={member.chooseFile} type="file" onChange={(e) => {
                                            const imgFile = e.target.files[0];
                                            console.log(imgFile);

                                            setImgHolder(imgFile);
                                        }}
                                            required
                                        />
                                    </div>

                                </div>

                                {
                                    imgHolder && <span className='text-green-500 italic mt-5'>Image Added</span>
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
        </div>
    );
};

export default MemberLogin;