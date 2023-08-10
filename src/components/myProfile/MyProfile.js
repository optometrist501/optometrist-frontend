import React, { useEffect, useState } from 'react';
import myProfile from './MyProfile.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { fetchUpdateMemberData } from '../../fetchedData/fetchMemberData';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyProfile = ({ darkmode }) => {

    const navigate = useNavigate();
    const [viewEditOption, setViewEditOption] = useState(false);

    const [user] = useAuthState(auth);
    console.log(user?.emailVerified)

    const [memberData, refetch] = useMemberData();
    const allMember = memberData?.data?.data?.data;
    console.log(allMember);
    const [mobile, setmobile] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [imgHolder, setimgHolder] = useState('')
    const [imgLink, setimgLink] = useState('')
    const [address, setaddress] = useState('')

    useEffect(() => {
        refetch()
    }, [refetch])

    const findMember = allMember?.find(f => {
        return f?.email === user?.email;
    });

    console.log(findMember?.email)

    useEffect(() => {
        setmobile(findMember?.mobile_no)
        setemail(findMember?.email)
        setpassword(findMember?.password)
        setaddress(findMember?.address)
        setimgLink(findMember?.imgLink);
    }, [findMember]);


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
                    setimgHolder(result?.data?.url)
                })
        }
    }, [imgHolder]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updateData = {
            mobile_no: mobile,
            email,
            password,
            address,
            imgLink: imgHolder
        }

        console.log(updateData);

        await fetchUpdateMemberData(findMember?._id, updateData, refetch);
        setimgHolder('');
        toast.success('successfully updated');
    }


    const handleSignOut = async () => {

        const result = window.confirm('are you sure to signout? if you do, please keep note down your memer_id and password');

        if (result) {
            const updateSignOut = {
                isSignOut: true
            }
            const response = await fetchUpdateMemberData(findMember?._id, updateSignOut, refetch);

            if (response.status === 200) {
                navigate('/memberLogin');
                toast.success("successfully signed out");

            }
        }
    }




    return (
        <div style={{ transition: '1s ease-in-out' }} className={`${myProfile.main} ${darkmode && 'bg-black text-white'}`}>

            <div style={{ transition: '1s ease-in-out' }} className={`${myProfile.container} ${darkmode ? 'bg-black border border-white' : 'bg-white'}`}>
                <div className={myProfile.firstPart}>
                    <img src={imgHolder ? imgHolder : imgLink} alt="" />
                    <p className='text-right mr-10 text-3xl text-green-500 relative'>

                        <input className='absolute top-0 left-20 opacity-0  transform scale-50' type="file" name="" id=""
                            onChange={(e) => {
                                const imgFile = e.target.files[0];
                                setimgHolder(imgFile)
                            }}
                        />
                        <i class="uil uil-plus-circle"></i>
                    </p>
                    <div className={myProfile.imgNameDesignation}>
                        <p className='font-bold text-purple-800 '>{findMember?.name}</p>
                        <p className='text-sm text-gray-500 '>{findMember?.designation}</p>
                    </div>
                </div>
                <div className={myProfile.secondPart}>
                    <div className={viewEditOption ? 'none' : 'block'} >
                        <p>Mobile :{findMember?.mobile_no}</p>
                        <p>Email : {findMember?.email}</p>
                        <p>Address: {findMember?.address}</p>
                        <br />
                        <br />
                        <br />
                        <hr />
                        <br />
                        <p>Id: {findMember?.member_id}</p>
                        <p>Type: {findMember?.isAdmin ? <span>Admin</span> : <span>Member</span>}</p>
                        <br />
                        <br />
                        <br />
                        <div className='w-full flex items-center justify-between'>
                            <button onClick={handleSignOut} className='btn btn-primary'>sign out</button>
                            <button onClick={() => navigate(`/qrProfile/${findMember?._id}`)} className='btn btn-primary'>QR-code</button>
                        </div>
                    </div>
                    <div className={viewEditOption ? 'block' : 'none'}>
                        <form action="" onSubmit={handleUpdate}>
                            <input
                                className='border border-gray-600 p-1 w-56'
                                placeholder='type mobile' type="text"
                                value={mobile}
                                onChange={(e) => setmobile(e.target.value)}
                            />
                            <br /><br />
                            <input
                                className='border border-gray-600 p-1 w-56'
                                placeholder='type email' type="text"
                                value={email}
                            />
                            <br /><br />
                            <textarea
                                className='border border-gray-600 p-1 w-56'
                                placeholder='type address' type="text"
                                value={address}
                                onChange={(e) => setaddress(e.target.value)}
                            />
                            <br /><br />
                            <br />
                            <br />
                            <hr />
                            <br />
                            <input
                                className='border border-gray-600 p-1 w-56' placeholder='password' type="text"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            <br />
                            <br />
                            <button
                                className='btn btn-primary w-56'
                                type='submit'
                            >update</button>
                        </form>
                    </div>
                </div>
                <span onClick={viewEditOption ? () => setViewEditOption(false) : () => setViewEditOption(true)} ><i className="uil uil-edit cursor-pointer"></i></span>
            </div>
            <div className="fakeNavBackground">

            </div>
        </div>
    );
};

export default MyProfile;