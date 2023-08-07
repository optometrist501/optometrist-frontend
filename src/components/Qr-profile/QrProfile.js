import React from 'react';
import qrProfile from './QrProfile.module.css';
import { useLocation, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import useMemberData from '../../customHooks/useMemberSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import { useState } from 'react';
import { fetchUpdateMemberData } from '../../fetchedData/fetchMemberData';
import { toast } from 'react-toastify';

const QrProfile = () => {
    const id = useParams('/:id');
    console.log(id);
    const [viewEditOption, setViewEditOption] = useState(false);
    const [user] = useAuthState(auth);
    const [imgUrl, setImgUrl] = useState('');

    const [memberData, refetch] = useMemberData();
    const allMembers = memberData?.data?.data?.data;
    console.log(allMembers)

    const location = useLocation();
    console.log(location?.pathname);

    const mainQrProfileLink = `https://optometrist-a88bd.web.app${location?.pathname}`;
    console.log(mainQrProfileLink);


    const findMembership = allMembers?.find(f => {
        return f?.email === user?.email;
    });


    const generatingQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(mainQrProfileLink);
            setImgUrl(response);
            console.log(imgUrl);
            console.log(typeof (response))

            const updatedData = {
                qr_code: response
            }

            console.log(updatedData);
            console.log(id?.id)

            const responseMemberData = await fetchUpdateMemberData(id?.id, updatedData, refetch);
            console.log(responseMemberData);
            if (responseMemberData) {
                toast("QR-CODE Generated");
            }

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ transition: '1s ease-in-out' }} className={`${qrProfile.container}`}>
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
                            </div>
                        }
                    </div>
                    <div className={viewEditOption ? 'block' : 'none'}>
                        <div className={qrProfile.qrContainer} style={{ minHeight: '320px', width: '100%' }}>
                            {
                                findMembership?.qr_code ?
                                    <img style={{ width: '250px', height: '250px' }} src={findMembership?.qr_code} alt="" />
                                    :
                                    <p className='text-red-600'>No QR-Code Generated yet....</p>
                            }
                        </div>
                        <hr />
                        <br />
                        {
                            findMembership?.email === user?.email &&
                            <span ><button className='btn btn-error' onClick={viewEditOption ? () => setViewEditOption(false) : () => setViewEditOption(true)}>BACK</button> <button onClick={generatingQrCode} className='btn btn-primary'>Generate QR Code</button></span>
                        }

                        {
                            findMembership?.qr_code &&
                            // eslint-disable-next-line jsx-a11y/anchor-has-content
                            <button className='btn btn-neutral ml-2'><a
                                href={findMembership?.qr_code}
                                download
                            >DOWNLOAD</a> </button>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QrProfile;

