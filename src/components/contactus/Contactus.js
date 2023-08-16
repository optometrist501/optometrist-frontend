import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import contact from './Contactus.module.css';
import logo from '../../images/customer.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.init';
import { toast } from 'react-toastify';
const Contactus = ({ darkmode }) => {
    const [message, setMessage] = useState('')
    const [from, setFrom] = useState('')
    const [user] = useAuthState(auth);
    const companyName = 'optometrist'

    const form = useRef();

    useEffect(() => {
        if (user) {
            setFrom(user?.email)
        }
    }, [user])

    const sendEmail = (e) => {
        e.preventDefault();

        if (from !== '' && message !== '') {
            emailjs.sendForm(`${process.env.REACT_APP_EMAIL_ID}`, `${process.env.REACT_APP_EMAIL_TEMPLATE_ID}`, form.current, `${process.env.REACT_APP_EMAIL_PUBLIC_KEY}`)
                .then((result) => {
                    if (result) {
                        toast.success("message sent successfully")
                    }

                }, (error) => {
                    if (error) {
                        toast.error("failed")
                    }
                });
        } else {
            toast.error("you can not keep any field empty")
        }
    };
    return (
        <div className={`${contact.main} ${darkmode ? 'bg-black' : 'bg-white'}`}>
            <div className={contact.container}>
                <div className={contact.one}>
                    <img src={logo} alt="" />
                </div>
                <div className={contact.two}>
                    <div className={contact.container_two}>
                        <form ref={form} onSubmit={sendEmail}>
                            <label className='text-sm font-bold'>To:</label>
                            <input type="text" name="to_name" value={companyName} />
                            <br />
                            <br />
                            <label className='text-sm font-bold'>From:</label>
                            <input type="email" name="from_email" value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                            <br />
                            <br />
                            <label className='text-sm font-bold'>Message</label>
                            <textarea name="message"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <br />
                            <br />
                            <button className='btn btn-primary w-full'>
                                <input type="submit" value="Send" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="fakeNavBackground">

            </div>
        </div>
    );
};

export default Contactus;