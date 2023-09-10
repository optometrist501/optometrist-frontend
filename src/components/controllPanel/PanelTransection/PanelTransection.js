import React, { useEffect, useState } from 'react';
import panelTransection from './PanelTransection.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebase.init';
import { fetchGetPaymentData, fetchPostPaymentData } from '../../../fetchedData/fetchPaymentData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useOfflinePaymentSectionHook from '../../../customHooks/useOfflinePaymentSectionHook';
import { fetchPostOfflinePaymentData } from '../../../fetchedData/fetchOfflinePaymentData';
import useMemberData from '../../../customHooks/useMemberSectionHook';

const PanelTransection = ({ darkmode }) => {
    const [user] = useAuthState(auth);
    const currency = 'BDT';
    const [aUrl, setAUrl] = useState('');
    const [errorHolder, setErrorHolder] = useState('');
    const [online, setOnline] = useState(true);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const [offlinePaymentData, refetch] = useOfflinePaymentSectionHook();
    const allOfflinePayment = offlinePaymentData?.data?.data?.data;

    const [memberData] = useMemberData();
    const allMemberData = memberData?.data?.data?.data;

    const findEmail = allMemberData?.find(f => {
        return f?.email === email
    });


    const handlePayment = async (e) => {
        e.preventDefault();
        const cus_name = e.target.name.value;
        const cus_phone = e.target.phone.value;
        const cus_email = user?.email;
        const cus_postcode = e.target.postcode.value;
        const cus_country = e.target.country.value;
        const cus_city = e.target.city.value;
        const total_amount = e.target.amount.value;
        const cus_add1 = e.target.address.value;

        const parsedAmount = parseInt(total_amount);

        const paymentData = {
            cus_name,
            cus_email,
            cus_add1,
            cus_city,
            total_amount: parsedAmount,
            cus_postcode,
            cus_country,
            cus_phone,
            currency,
        }

        await fetchPostPaymentData(paymentData);

    }

    useEffect(() => {
        const getPayment = async () => {
            await fetchGetPaymentData('', setErrorHolder)
        }
        getPayment();

        if (errorHolder) {
            navigate('/login');
            toast("please login again");
        }

    }, [errorHolder, navigate]);

    const handleOfflinePayment = async (e) => {

        e.preventDefault();
        const cus_name = e.target.name.value;
        const cus_phone = e.target.phone.value;
        const cus_email = email;
        const cus_postcode = e.target.postcode.value;
        const cus_country = e.target.country.value;
        const cus_city = e.target.city.value;
        const total_amount = e.target.amount.value;
        const cus_add1 = e.target.address.value;

        const parsedAmount = parseInt(total_amount);

        const paymentData = {
            cus_name,
            cus_email,
            cus_add1,
            cus_city,
            total_amount: parsedAmount,
            cus_postcode,
            cus_country,
            cus_phone,
        }

        if (findEmail) {
            await fetchPostOfflinePaymentData(paymentData, refetch)
                .then(res => {
                    if (res?.data?.statusCode === 200) {
                        toast.success('payment added successfully')
                    }
                })
        } else {
            toast.error('email is not matched');
        }


    }

    return (
        <div className={panelTransection.main}>
            <div className={panelTransection.container}>
                <div className='w-full flex items-center justify-between '>
                    <p onClick={() => setOnline(true)} className={`text-sm font-bold cursor-pointer ${online ? 'text-blue-400' : 'text-gray-400'}`}>online</p>
                    <p className='text-xl font-bold text-center mb-2 text-purple-600'>PAYMENT-FORM</p>
                    <p onClick={() => setOnline(false)} className={`text-sm font-bold cursor-pointer ${!online ? 'text-blue-400' : 'text-gray-400'}`}>offline</p>
                </div>
                {online &&
                    <form onSubmit={handlePayment} classname={panelTransection.styled_form}>
                        <hr />
                        <br />
                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Name :</label>
                                <input required type="text" name="name" placeholder="Name" />
                            </div>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Phone :</label>
                                <input required type="text" name="phone" placeholder="Phone" />
                            </div>
                        </div>
                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Email :</label>
                                <input required value={user?.email} type="text" name="email" placeholder="email" />
                            </div>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Postcode :</label>
                                <input required type="text" name="postcode" placeholder="postcode" />
                            </div>
                        </div>
                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Country :</label>
                                <input required type="text" name="country" placeholder="Country" />
                            </div>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">City :</label>
                                <input required type="text" name="city" placeholder="City" />
                            </div>
                        </div>
                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Amount :</label>
                                <input required type="text" name="amount" placeholder="Amount" />
                            </div>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Currency :</label>
                                <input required value={currency} type="text" name="currency" placeholder="Currency" />
                            </div>
                        </div>

                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Address :</label>
                                <input required type="text" name="address" placeholder="Address" />
                            </div>
                        </div>
                        {aUrl && aUrl}
                        <div>
                            <input className='btn btn-primary w-full ' type="submit" value="Submit" />
                        </div>
                    </form>
                }

                {!online &&
                    <form onSubmit={handleOfflinePayment} classname={panelTransection.styled_form}>
                        <hr />
                        <br />
                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Name :</label>
                                <input required type="text" name="name" placeholder="Name" />
                            </div>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Phone :</label>
                                <input required type="text" name="phone" placeholder="Phone" />
                            </div>
                        </div>
                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Email :</label>
                                <input required type="text" name="email" placeholder="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {
                                    email.length > 0
                                    &&
                                    <div>
                                        {
                                            findEmail
                                                ?
                                                <p className='text-sm text-green-400 ml-3'>matched</p>
                                                :
                                                <p className='text-sm text-red-400 ml-3'>not matched</p>
                                        }
                                    </div>
                                }
                            </div>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Postcode :</label>
                                <input required type="text" name="postcode" placeholder="postcode" />
                            </div>
                        </div>
                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Country :</label>
                                <input required type="text" name="country" placeholder="Country" />
                            </div>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">City :</label>
                                <input required type="text" name="city" placeholder="City" />
                            </div>
                        </div>
                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Amount :</label>
                                <input required type="text" name="amount" placeholder="Amount" />
                            </div>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Currency :</label>
                                <input required value={currency} type="text" name="currency" placeholder="Currency" />
                            </div>
                        </div>

                        <div className={panelTransection.form_row}>
                            <div className={panelTransection.form_row_div}>
                                <label className={`${darkmode && panelTransection.label_color} ml-3`} htmlFor="">Address :</label>
                                <input required type="text" name="address" placeholder="Address" />
                            </div>
                        </div>
                        {aUrl && aUrl}
                        <div>
                            <input className='btn btn-primary w-full ' type="submit" value="Submit" />
                        </div>
                    </form>
                }
            </div>
        </div>
    );
};

export default PanelTransection;