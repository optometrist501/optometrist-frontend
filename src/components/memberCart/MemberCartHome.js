import React from 'react';
import useMemberData from '../../customHooks/useMemberSectionHook';

const MemberCartHome = ({ darkmode }) => {

    const [memberData] = useMemberData();
    const allmembers = memberData?.data?.data?.data;

    const approvedMembers = allmembers?.filter(f => {
        return f?.approval === true;
    })

    return (
        <div className={`${darkmode ? 'bg-black' : 'memberCartBackground'} `}>
            <br />
            <div style={{ transition: '1s ease-in-out' }} className={`pt-5 pb-5`}>
                <br />

                <p style={{ transition: '1s ease-in-out' }} className={`text-5xl font-bold text-center mb-7 ${darkmode && 'text-white'}`}>MEMBERS</p>
                <div className={`cart ${darkmode && 'bg-black text-white'}`}>
                    {
                        approvedMembers?.slice(0, 3)?.map(member => {
                            return (
                                <div className={`product ${darkmode && 'border-2 border-white'}`}>
                                    <div className="memberImgContainer">
                                        <img className="product-image" src={member.imgLink} alt="" />
                                    </div>
                                    <div className="product-details">
                                        <h3 className="product-title">{member?.name}</h3>
                                        <p className="product-description">{member?.member_id}</p>
                                        <p className="product-description">{member?.designation}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default MemberCartHome;