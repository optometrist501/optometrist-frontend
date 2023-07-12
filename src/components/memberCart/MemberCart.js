import React, { useEffect, useState } from 'react';
import './MemberCart.css'
import { Link } from 'react-router-dom';

const MemberCart = ({ darkmode }) => {
    const [member, setMember] = useState([]);
    console.log(member);
    useEffect(() => {
        const url = 'memberCart.json';
        fetch(url).then(res => res.json()).then(res => setMember(res));
    }, [])
    return (

        <div className={`${darkmode && 'bg-black'} `}>
            <div style={{ transition: '1s ease-in-out' }} className={`pt-5 pb-5`}>
                <p style={{ transition: '1s ease-in-out' }} className={`text-5xl font-bold text-center mb-7 ${darkmode && 'text-white'}`}>MEMBERS</p>
                <div className={`cart ${darkmode && 'bg-black text-white'}`}>
                    {
                        member?.map(member => {
                            return (
                                <div data-aos='fade-up' duration='300' className={`product ${darkmode && 'border-2 border-white'}`}>
                                    <div className="memberImgContainer">
                                        <img className="product-image" src={member.imgLink} alt="" />
                                    </div>
                                    <div className="product-details">
                                        <h3 className="product-title">{member.name}</h3>
                                        <p className="product-description">{member.occupation}</p>
                                        <p className="product-price">{member.short_description}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

                <div style={{ width: '150px', height: '150px' }} className=" flex items-center justify-center mx-auto">
                    <Link to='/members'><button className='btn btn-primary '>view all</button></Link>
                </div>
            </div>
        </div>
    );
};

export default MemberCart;