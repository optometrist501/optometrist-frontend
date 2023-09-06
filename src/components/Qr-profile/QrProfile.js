import React from 'react';
import qrProfile from './QrProfile.module.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import { useState } from 'react';
import { fetchUpdateMemberData } from '../../fetchedData/fetchMemberData';
import { toast } from 'react-toastify';

const QrProfile = ({ darkmode }) => {
    const id = useParams('/:id');

    const [viewEditOption, setViewEditOption] = useState(false);
    const [user] = useAuthState(auth);
    const [imgUrl, setImgUrl] = useState('');

    const [memberData, refetch] = useMemberData();
    const allMembers = memberData?.data?.data?.data;


    const location = useLocation();


    const mainQrProfileLink = `https://oabd.org${location?.pathname}`;



    const findMembership = allMembers?.find(f => {
        return f?._id === location?.pathname?.substring(11)
    });


    const generatingQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(mainQrProfileLink);
            setImgUrl(response);


            const updatedData = {
                qr_code: response
            }



            const responseMemberData = await fetchUpdateMemberData(id?.id, updatedData, refetch);

            if (responseMemberData) {
                toast("QR-CODE Generated");
            }

        } catch (error) {

        }
    }



    return (
        <div className={darkmode ? 'bg-black' : 'bg-white'} style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ transition: '1s ease-in-out' }} className={`${qrProfile.container} ${darkmode ? 'bg-black text-white' : 'bg-white'} `}>
                <div className={qrProfile.firstPart}>
                    <img src={findMembership?.imgLink} alt="" />
                    <div className={qrProfile.imgNameDesignation}>
                        <p className='font-bold text-purple-800 '>{findMembership?.name}</p>
                        <p className='text-sm text-gray-500 '>{findMembership?.designation}</p>
                    </div>
                </div>
                <div className={qrProfile.secondPart}>
                    <div className={viewEditOption ? 'none' : 'block'} >
                        <p>Email : {findMembership?.email}</p>
                        <p>Address: {findMembership?.address}</p>
                        <br />
                        <br />
                        <br />
                        <hr />
                        <br />
                        <p>Id: {findMembership?.member_id}</p>
                        <p>Type: {findMembership?.isAdmin ? <span>Admin</span> : <span>Member</span>}</p>
                        <br />
                        <br />
                        <br />
                        {
                            findMembership?.email === user?.email &&
                            <div className='w-full flex items-center justify-between'>
                                <button onClick={viewEditOption ? () => setViewEditOption(false) : () => setViewEditOption(true)} className='btn btn-primary'>QR-CODE</button>
                                <Link to='/'> <button className='btn btn-primary mr-3'>Back</button></Link>
                            </div>
                        }
                    </div>
                    <div className={viewEditOption ? 'block' : 'none'}>
                        <div className={qrProfile.qrContainer} style={{ minHeight: '320px', width: '100%' }}>
                            {
                                findMembership?.qr_code === 'will be updated' ?

                                    <p className='text-red-600'>No QR-Code Generated yet....</p>
                                    :

                                    <img style={{ width: '250px', height: '250px' }} src={findMembership?.qr_code} alt="" />
                            }
                        </div>
                        <hr />
                        <br />
                        {
                            findMembership?.email === user?.email &&
                            <span >
                                <button className='btn btn-sm mr-2' onClick={viewEditOption ? () => setViewEditOption(false) : () => setViewEditOption(true)}>
                                    BACK
                                </button>
                                <button onClick={generatingQrCode} className='btn btn-sm'>
                                    Generate QR Code
                                </button>
                            </span>
                        }
                        <br />
                        <br />
                        {
                            (findMembership?.qr_code && findMembership?.email === user?.email) &&
                            // eslint-disable-next-line jsx-a11y/anchor-has-content
                            <span>
                                <button className='btn btn-sm '>
                                    <a
                                        href={findMembership?.qr_code}
                                        download
                                    >
                                        DOWNLOAD
                                    </a>
                                </button>
                            </span>
                        }
                    </div>

                </div>
            </div>
            <div className="fakeNavBackground">

            </div>
        </div>
    );
};

export default QrProfile;

