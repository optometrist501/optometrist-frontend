import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import { fetchPostPaymentData } from '../../fetchedData/fetchPaymentData';
import dashTransection from './DashTransection.module.css';

const DashTransection = ({ darkmode }) => {
    const [user] = useAuthState(auth);
    const currency = 'BDT';
    const [aUrl, setAUrl] = useState('');

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
    return (
        <div className={dashTransection.main}>
            <div className={dashTransection.container}>
                <form onSubmit={handlePayment} classname={`${dashTransection.styled_form}`}>
                    <p className='text-xl font-bold text-center mb-2 text-purple-600'>PAYMENT-FORM</p>
                    <hr />
                    <br />
                    <div className={dashTransection.form_row}>
                        <div className={dashTransection.form_row_div}>
                            <label className={`${darkmode && dashTransection.label_color} ml-3`} htmlFor="">Name :</label>
                            <input required type="text" name="name" placeholder="Name" />
                        </div>
                        <div className={dashTransection.form_row_div}>
                            <label className={`${darkmode && dashTransection.label_color} ml-3`} htmlFor="">Phone :</label>
                            <input required type="text" name="phone" placeholder="Phone" />
                        </div>
                    </div>
                    <div className={dashTransection.form_row}>
                        <div className={dashTransection.form_row_div}>
                            <label className={`${darkmode && dashTransection.label_color} ml-3`} htmlFor="">Email :</label>
                            <input required value={user?.email} type="text" name="email" placeholder="email" />
                        </div>
                        <div className={dashTransection.form_row_div}>
                            <label className={`${darkmode && dashTransection.label_color} ml-3`} htmlFor="">Postcode :</label>
                            <input required type="text" name="postcode" placeholder="postcode" />
                        </div>
                    </div>
                    <div className={dashTransection.form_row}>
                        <div className={dashTransection.form_row_div}>
                            <label className={`${darkmode && dashTransection.label_color} ml-3`} htmlFor="">Country :</label>
                            <input required type="text" name="country" placeholder="Country" />
                        </div>
                        <div className={dashTransection.form_row_div}>
                            <label className={`${darkmode && dashTransection.label_color} ml-3`} htmlFor="">City :</label>
                            <input required type="text" name="city" placeholder="City" />
                        </div>
                    </div>
                    <div className={dashTransection.form_row}>
                        <div className={dashTransection.form_row_div}>
                            <label className={`${darkmode && dashTransection.label_color} ml-3`} htmlFor="">Amount :</label>
                            <input required type="text" name="amount" placeholder="Amount" />
                        </div>
                        <div className={dashTransection.form_row_div}>
                            <label className={`${darkmode && dashTransection.label_color} ml-3`} htmlFor="">Currency :</label>
                            <input required value={currency} type="text" name="currency" placeholder="Currency" />
                        </div>
                    </div>

                    <div className={dashTransection.form_row}>
                        <div className={dashTransection.form_row_div}>
                            <label className={`${darkmode && dashTransection.label_color} ml-3`} htmlFor="">Address :</label>
                            <input required type="text" name="address" placeholder="Address" />
                        </div>
                    </div>
                    {aUrl && aUrl}
                    <div>
                        <input className='btn btn-primary w-full ' type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DashTransection;