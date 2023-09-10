import React from 'react';
import { useEffect } from 'react';
import { fetchGetPaymentData } from '../../../fetchedData/fetchPaymentData';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import { useState } from 'react';
import { toast } from 'react-toastify';
import dashHistory from '../DashHistory.module.css'
import useOfflinePaymentSectionHook from '../../../customHooks/useOfflinePaymentSectionHook';

const DashPaymentHistory = ({ darkmode }) => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const [viewOption, setViewOption] = useState(1);
    const [online, setOnline] = useState(true)
    const [open, setOpen] = useState(false);
    const [offLineOpen, setOfflineOpen] = useState(false);
    const [findId, setFindId] = useState('');
    const [myHistory, setMyHistory] = useState([]);
    const [errorHolder, setErrorHolder] = useState('');
    console.log(errorHolder);

    const allMyHistory = myHistory?.data?.result;




    const handleModal = (value, id) => {
        setOpen(true);
        setFindId(id);
        if (value === 1) {
            setViewOption(1)
        } else if (value === 2) {
            setViewOption(2)
        } else if (value === 3) {
            setViewOption(3);
        }

    }

    const handleOfflineModal = (value, id) => {
        setOfflineOpen(true);
        setFindId(id);
        if (value === 1) {
            setViewOption(1)
        } else if (value === 2) {
            setViewOption(2)
        } else if (value === 3) {
            setViewOption(3);
        }

    }

    const [offlinePaymentData] = useOfflinePaymentSectionHook();
    const allOfflinePaymentData = offlinePaymentData?.data?.data?.data;

    const filterOfflinePayment = allOfflinePaymentData?.filter(f => {
        return f?.cus_email === user?.email
    })


    const findHistory = allMyHistory?.find(f => {
        return f?._id === findId
    })

    const findOfflinePaymentHistory = allOfflinePaymentData?.find(f => {
        return f?._id === findId
    })

    useEffect(() => {
        const getPayment = async (paymentId) => {
            await fetchGetPaymentData(paymentId, setErrorHolder)
                .then(res => setMyHistory(res))
        }
        getPayment(user?.email);

        if (errorHolder) {
            navigate('/login');
            toast("please login again");
        }

    }, [user?.email, errorHolder, navigate]);



    return (
        <div className={dashHistory.main}>
            <div className={dashHistory.container}>
                <div className={`${dashHistory.titleContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <br />
                    <div className={dashHistory.titleMain}>
                        <p className={dashHistory.title}> Your Payment History :</p>
                        <div className='text-sm'>
                            <span onClick={() => setOnline(true)} className={`mr-5 cursor-pointer ${online ? 'text-blue-400' : 'text-gray-400 '}`}>online</span>
                            <span onClick={() => setOnline(false)} className={`mr-5 cursor-pointer ${!online ? 'text-blue-400' : 'text-gray-400'}`}>offline</span>
                        </div>
                    </div>
                    <br />
                    <hr />
                </div>
                <br />
                {online &&
                    allMyHistory?.slice()?.reverse()?.map((history, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={history?._id} className={dashHistory.detailPart}>
                                        <div className={dashHistory.detailPartContainer}>
                                            <div className={`${darkmode && 'text-white'} ${dashHistory.partOne} `}>
                                                <div className={dashHistory.partOneDetail}>
                                                    <span>{index + 1}. </span>
                                                    <span className='ml-5'>{history?.total_amount}</span>

                                                    <span className='ml-5'>{history?.createdAt?.slice(0, 10)}</span>
                                                </div>
                                            </div>
                                            <div className={dashHistory.partTwo}>
                                                <div className={dashHistory.icons}>
                                                    <p>{history?.isPaid ? <span className='text-green-600 italic text-sm'>Paid</span> : <span className='text-red-500 italic text-sm'>Failed</span>}</p>
                                                    <p title='view' onClick={() => handleModal(1, history?._id)} ><i class="uil uil-eye text-blue-600 cursor-pointer"></i></p>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                {!online &&
                    filterOfflinePayment?.slice()?.reverse()?.map((history, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={history?._id} className={dashHistory.detailPart}>
                                        <div className={dashHistory.detailPartContainer}>
                                            <div className={`${darkmode && 'text-white'} ${dashHistory.partOne} `}>
                                                <div className={dashHistory.partOneDetail}>
                                                    <span>{index + 1}. </span>
                                                    <span className='ml-5'>{history?.total_amount}</span>

                                                    <span className='ml-5'>{history?.createdAt?.slice(0, 10)}</span>
                                                </div>
                                            </div>
                                            <div className={dashHistory.partTwo}>
                                                <div className={dashHistory.icons}>
                                                    <p className='text-green-400 text-sm italic'>paid</p>
                                                    <p title='view' onClick={() => handleOfflineModal(1, history?._id)} ><i class="uil uil-eye text-blue-600 cursor-pointer"></i></p>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div className={`${open ? 'block' : 'none'}  ${dashHistory.modal}    ${darkmode ? 'bg-black text-white' : 'bg-white'} `}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={`${dashHistory.modalDetail}`}>

                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${dashHistory.viewPart}`}>
                                <div className={dashHistory.viewPartMain}>
                                    <div className={dashHistory.eventsContainer}>

                                        <div style={{ width: '60%', minHeight: '300px', boxShadow: '0 0 2px 2px #e7e4e4', margin: 'auto', marginTop: '50px', padding: '10px' }}>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Name: {findHistory?.cus_name}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Amount: {findHistory?.total_amount}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Transection_id: {findHistory?.tran_id}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Email: {findHistory?.cus_email}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Phone: {findHistory?.cus_phone}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Address: {findHistory?.cus_add1}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>City: {findHistory?.cus_city}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>postcode: {findHistory?.cus_postcode}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>country: {findHistory?.cus_country}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Status: {findHistory?.isPaid ? <span>Paid</span> : <span>Failed</span>}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }



                    </div>

                </div>
                <div className={`${offLineOpen ? 'block' : 'none'}  ${dashHistory.modal}    ${darkmode ? 'bg-black text-white' : 'bg-white'} `}>
                    <i onClick={() => setOfflineOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={`${dashHistory.modalDetail}`}>

                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${dashHistory.viewPart}`}>
                                <div className={dashHistory.viewPartMain}>
                                    <div className={dashHistory.eventsContainer}>

                                        <div style={{ width: '60%', minHeight: '300px', boxShadow: '0 0 2px 2px #e7e4e4', margin: 'auto', marginTop: '50px', padding: '10px' }}>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Name: {findOfflinePaymentHistory?.cus_name}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Amount: {findOfflinePaymentHistory?.total_amount}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Email: {findOfflinePaymentHistory?.cus_email}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Phone: {findOfflinePaymentHistory?.cus_phone}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Address: {findOfflinePaymentHistory?.cus_add1}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>City: {findOfflinePaymentHistory?.cus_city}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>postcode: {findOfflinePaymentHistory?.cus_postcode}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>country: {findOfflinePaymentHistory?.cus_country}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Status: paid</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }



                    </div>

                </div>
            </div>

        </div>
    );
};

export default DashPaymentHistory;