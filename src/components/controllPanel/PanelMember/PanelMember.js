import React, { useState } from 'react';
import panelMember from './PanelMember.module.css';
import useMemberData from '../../../customHooks/useMemberSectionHook';
import { fetchDeleteMemberData, fetchUpdateMemberData } from '../../../fetchedData/fetchMemberData';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase/firebase.init';

const PanelMember = ({ darkmode }) => {
    const [user] = useAuthState(auth)
    const [viewOption, setViewOption] = useState(1);
    const [open, setOpen] = useState(false);
    const [idContainer, setIdContainer] = useState('');

    const [memberData, refetch] = useMemberData();
    const allMembers = memberData?.data?.data?.data;



    const findMembers = allMembers?.find(f => {
        return f._id === idContainer
    })

    const findPendingRequest = allMembers?.filter(f => {
        return f.approval === false;
    })

    const filterAdmins = allMembers?.filter(f => {
        return f?.isAdmin === true;
    });

    const findMainAdmin = filterAdmins?.find(f => {
        return f.email === process.env.REACT_APP_MAIN_ADMIN;
    })

    const handleOption = (value, number) => {
        setIdContainer(value);
        setOpen(true);
        if (number === 1) {
            setViewOption(1)
        }
    }

    const updateApproval = async (value, id) => {
        const updateApproval = {
            approval: value
        };

        if (value === true) {
            const response = await fetchUpdateMemberData(id, updateApproval, refetch);

            if (response.status === 200) {
                toast('Requset Approved');
            }
        } else if (value === false) {
            const response = await fetchUpdateMemberData(id, updateApproval, refetch);
            if (response.status === 200) {
                toast('Request Cancelled');
            }
        }
    }


    const deleteMember = async (id) => {

        const result = window.confirm("are you sure to delete this user ?");

        if (result) {
            const response = await fetchDeleteMemberData(id, refetch);

            if (response.status === 200) {
                toast.success("successfully deleted");
            }
        }
    }

    const adminRole = async (adminValue, adminId) => {

        const adminUpdateData = {
            isAdmin: adminValue
        };

        if (filterAdmins?.length < 5) {
            const response = await fetchUpdateMemberData(adminId, adminUpdateData, refetch);

            if (response?.status === 200) {
                toast.success("coverted to Admin")
            }
        } else {
            toast.error("Admin Role cannot exceed 4")
        }
    }


    return (
        <div className={panelMember.main}>
            <div className={panelMember.container}>
                <div className={`${panelMember.titleContainer} ${darkmode ? 'bg-black text-white' : 'bg-white'}`}>
                    <br />
                    <div className={panelMember.titleMain}>
                        <p className={panelMember.title}> All members :</p>
                        <div className='flex items-center justify-between lg:w-1/6 md:w-2/6 sm:w-3/6'>
                            <p style={{ fontSize: '12.5px' }} className={`${darkmode && 'text-white'} text-gray-500 font-semibold`}>TOTAL PENDING: {findPendingRequest?.length} </p>

                        </div>
                    </div>
                    <br />
                    <hr />
                </div>
                <br />
                {
                    allMembers?.slice()?.reverse()?.map((members, index) => {
                        return (
                            <div className={`${open ? 'none' : 'block'}`}>
                                {
                                    <div className={panelMember.detailPart}>
                                        <div className={panelMember.detailPartContainer}>
                                            <div className={`${darkmode && 'text-white'} ${panelMember.partOne}`}>
                                                <div key={members?._id} className={panelMember.partOneDetail}>
                                                    <p className='mr-2'>{index + 1} </p>
                                                    <p title={members?.title} className={panelMember.partOneDetailTitle}> {members?.name?.length > 37 ? members?.name?.slice(0, 37) + '...' : members?.name}</p>
                                                    <p title={members?.title} className={panelMember.partOneDetailTitleRes}> {members?.name.length > 12 ? members?.name.slice(0, 12) + '...' : members?.name}</p>
                                                </div>
                                            </div>
                                            <div className={panelMember.partTwo}>
                                                <div className={panelMember.icons}>
                                                    <p>{members?.approval === true ? <p className='text-sm text-green-600 italic'>approved</p> : <p className='text-sm text-red-600 italic'>pending</p>}</p>

                                                    <p title='view' onClick={() => handleOption(members?._id, 1)}  ><i class="uil uil-eye text-blue-600 cursor-pointer"></i></p>

                                                    <p onClick={() => deleteMember(members?._id)} title='delete'><i class="uil uil-trash-alt text-red-600 cursor-pointer"></i></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div className={`${open ? 'block' : 'none'}  ${panelMember.modal} ${darkmode ? 'bg-black text-white' : 'bg-white'} `}>
                    <i onClick={() => setOpen(false)} class="uil uil-backspace text-2xl ml-2 cursor-pointer"></i>
                    <br />
                    <br />
                    <hr />
                    <br />
                    <div className={panelMember.modalDetail}>
                        {
                            viewOption === 1 &&
                            <div className={`${panelMember.viewPart}`}>
                                <div className={panelMember.viewPartMain}>
                                    <div className={panelMember.membersContainer}>
                                        <div className={panelMember.detailMemberOne}>
                                            <div className={panelMember.memberImg}>
                                                <img src={findMembers?.imgLink} alt="" />
                                            </div>
                                        </div>
                                        <div className={panelMember.detailMemberTwo}>
                                            <br />
                                            <p>Name : {findMembers?.name} </p>
                                            <p>Designation : {findMembers?.designation} </p>
                                            <p>Email : {findMembers?.email} </p>
                                            <p>Type : {findMembers?.isAdmin ? 'Admin' : 'Member'}
                                                <span>{findMainAdmin?.email === findMembers?.email && <i class="uil uil-star ml-1 text-orange-500 font-bold"></i>}</span>
                                            </p>
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <hr />
                                            <br />
                                            {
                                                !findMembers?.isAdmin &&
                                                <button className='btn btn-primary'>
                                                    {findMembers?.approval === false
                                                        ?
                                                        <span onClick={() => updateApproval(true, findMembers?._id)}>
                                                            Approve
                                                        </span>
                                                        :
                                                        <span onClick={() => updateApproval(false, findMembers?._id)}>
                                                            Cancel Approval
                                                        </span>}
                                                </button>
                                            }
                                            {
                                                (findMainAdmin?.email === user?.email &&
                                                    findMainAdmin?.email !== findMembers?.email && findMembers?.approval === true) &&
                                                <button className='btn btn-primary ml-4'>
                                                    {(findMembers?.isAdmin === false)
                                                        ?
                                                        <span onClick={() => adminRole(true, findMembers?._id)}>
                                                            Make Admin
                                                        </span>
                                                        :
                                                        <span onClick={() => adminRole(false, findMembers?._id)}>
                                                            Make Member
                                                        </span>}
                                                </button>
                                            }
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

export default PanelMember;