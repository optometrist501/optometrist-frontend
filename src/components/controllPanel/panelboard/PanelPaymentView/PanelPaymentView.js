import React, { useEffect, useState } from 'react';
import allHistory from '../panelPaymentHistory/PanelPaymentHistory.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchGetPaymentData } from '../../../../fetchedData/fetchPaymentData';
import { toast } from 'react-toastify';
import useOfflinePaymentSectionHook from '../../../../customHooks/useOfflinePaymentSectionHook';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase/firebase.init';
import { fetchDeleteOfflinePaymentData } from '../../../../fetchedData/fetchOfflinePaymentData';

const PanelPaymentView = ({ darkmode }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [online, setOnline] = useState(true);
    const [viewOption, setViewOption] = useState(1);
    const [open, setOpen] = useState(false);
    const [offLineOpen, setOfflineOpen] = useState(false);
    const [viewOptionOffline, setViewOptionOffline] = useState(1);
    const [findId, setFindId] = useState('');
    const [myHistory, setMyHistory] = useState([]);
    const [errorHolder, setErrorHolder] = useState('');

    const allMyHistory = myHistory?.data?.result;

    const [offlinePaymentData, refetch] = useOfflinePaymentSectionHook();
    const allOfflinePaymentData = offlinePaymentData?.data?.data?.data;

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
            setViewOptionOffline(1)
        } else if (value === 2) {
            setViewOptionOffline(2)
        } else if (value === 3) {
            setViewOptionOffline(3);
        }

    }

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
        getPayment('');

        if (errorHolder) {
            navigate('/login');
            toast("please login again");
        }

    }, [errorHolder, navigate]);

    const deletePost = async (theId) => {
        if (theId) {
            const result = window.confirm('are you sure to delete this item?');
            if (result) {
                await fetchDeleteOfflinePaymentData(theId, refetch);
                toast.dark('successfully deleted');
                refetch();
            }
        }

    }

    return (
        <div className={allHistory.main}>
            <div className={allHistory.container}>
                <div className={`${allHistory.titleContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <br />
                    <div className={allHistory.titleMain}>
                        <p className={allHistory.title}> Members Payment History :</p>
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
                                    <div key={history?._id} className={allHistory.detailPart}>
                                        <div className={allHistory.detailPartContainer}>
                                            <div className={`${darkmode && 'text-white'} ${allHistory.partOne} `}>
                                                <div className={allHistory.partOneDetail}>
                                                    <span>{index + 1}. </span>
                                                    <span className='ml-5'>{history?.total_amount}</span>

                                                    <span className='ml-5'>{history?.createdAt?.slice(8, 10)}-{history?.createdAt?.slice(5, 7)}-{history?.createdAt?.slice(0, 4)}</span>

                                                    <span className='ml-5'>{history?.cus_name}</span>
                                                </div>
                                            </div>
                                            <div className={allHistory.partTwo}>
                                                <div className={allHistory.icons}>
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
                    allOfflinePaymentData?.slice()?.reverse()?.map((history, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div key={history?._id} className={allHistory.detailPart}>
                                        <div className={allHistory.detailPartContainer}>
                                            <div className={`${darkmode && 'text-white'} ${allHistory.partOne} `}>
                                                <div className={allHistory.partOneDetail}>
                                                    <span>{index + 1}. </span>
                                                    <span className='ml-5'>{history?.total_amount}</span>

                                                    <span className='ml-5'>{history?.createdAt?.slice(8, 10)}-{history?.createdAt?.slice(5, 7)}-{history?.createdAt?.slice(0, 4)}</span>

                                                    <span className='ml-5'>{history?.cus_name}</span>
                                                </div>
                                            </div>
                                            <div className={allHistory.partTwo}>
                                                <div className={allHistory.icons}>
                                                    <p className='text-green-400 text-sm italic'>paid</p>
                                                    <p title='view' onClick={() => handleOfflineModal(1, history?._id)} ><i class="uil uil-eye text-blue-600 cursor-pointer"></i></p>

                                                    <p title='view' onClick={() => deletePost(history?._id)} ><i class="uil uil-trash-alt text-red-600 cursor-pointer"></i></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }

                <div className={`${open ? 'block' : 'none'}  ${allHistory.modal}    ${darkmode ? 'bg-black text-white' : 'bg-white'} `}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={`${allHistory.modalDetail}`}>

                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${allHistory.viewPart}`}>
                                <div className={allHistory.viewPartMain}>
                                    <div className={allHistory.eventsContainer}>

                                        <div style={{ width: '60%', minHeight: '300px', boxShadow: '0 0 2px 2px #e7e4e4', margin: 'auto', marginTop: '50px', padding: '10px' }}>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Name: {findHistory?.cus_name}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Amount: {findHistory?.total_amount}</p>

                                            <p className='font-bold text-sm text-blue-500 mb-2'>Email: {findHistory?.cus_email}</p>


                                            <p className='font-bold text-sm text-blue-500 mb-2'>City: {findHistory?.cus_city}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>postcode: {findHistory?.cus_postcode}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>country: {findHistory?.cus_country}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Status: {findHistory?.isPaid ? <span>Paid</span> : <span>Failed</span>}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Payment Method: online</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>
                                                <span>
                                                    payment-date:
                                                    {findHistory?.createdAt?.slice(8, 10)}-
                                                    {findHistory?.createdAt?.slice(5, 7)}-
                                                    {findHistory?.createdAt?.slice(0, 4)}
                                                </span>
                                            </p>
                                            <button className='btn btn-primary print:hidden' onClick={() => window.print()} >print</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }



                    </div>

                </div>

                <div className={`${offLineOpen ? 'block' : 'none'}  ${allHistory.modal}    ${darkmode ? 'bg-black text-white' : 'bg-white'} `}>
                    <i onClick={() => setOfflineOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>

                    <br />
                    <div className={`${allHistory.modalDetail}`}>

                        <hr />
                        {
                            viewOption === 1 &&
                            <div className={`${allHistory.viewPart}`}>
                                <div className={allHistory.viewPartMain}>
                                    <div className={allHistory.eventsContainer}>

                                        <div style={{ width: '60%', minHeight: '300px', boxShadow: '0 0 2px 2px #e7e4e4', margin: 'auto', marginTop: '50px', padding: '10px' }}>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Name: {findOfflinePaymentHistory?.cus_name}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Amount: {findOfflinePaymentHistory?.total_amount}</p>

                                            <p className='font-bold text-sm text-blue-500 mb-2'>Email: {findOfflinePaymentHistory?.cus_email}</p>


                                            <p className='font-bold text-sm text-blue-500 mb-2'>City: {findOfflinePaymentHistory?.cus_city}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>postcode: {findOfflinePaymentHistory?.cus_postcode}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>country: {findOfflinePaymentHistory?.cus_country}</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Status: paid</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>Payment Method: offline</p>
                                            <p className='font-bold text-sm text-blue-500 mb-2'>
                                                <span>
                                                    payment date:
                                                    {findOfflinePaymentHistory?.createdAt?.slice(8, 10)}-
                                                    {findOfflinePaymentHistory?.createdAt?.slice(5, 7)}-
                                                    {findOfflinePaymentHistory?.createdAt?.slice(0, 4)}
                                                </span>
                                            </p>
                                            <button className='btn btn-primary print:hidden' onClick={() => window.print()} >print</button>
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

export default PanelPaymentView;