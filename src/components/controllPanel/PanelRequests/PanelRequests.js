import React from 'react';
import panelRequest from './PanelRequests.module.css';
import useMemberData from '../../../customHooks/useMemberSectionHook';
import { fetchUpdateMemberData } from '../../../fetchedData/fetchMemberData';
import { toast } from 'react-toastify';

const PanelRequests = () => {
    const [memberData, refetch] = useMemberData();
    const allMembers = memberData?.data?.data?.data;
    console.log(allMembers)
    const pendingMembers = allMembers?.filter(f => {
        return f?.approval === false
    });


    const acceptRequest = async (value, id) => {

        const updateApproval = {
            approval: value
        }


        const response = await fetchUpdateMemberData(id, updateApproval, refetch);

        if (response?.status === 200) {
            toast('request approved');
        }
    }

    return (
        <div className={panelRequest.modalDetail}>
            {
                pendingMembers?.length > 0 ?
                    <div>
                        {
                            pendingMembers?.slice()?.reverse()?.map(pendingMember => {
                                return (
                                    <div key={pendingMember._id} className={`${panelRequest.viewPart}`}>
                                        <div className={panelRequest.viewPartMain}>
                                            <div className={panelRequest.membersContainer}>
                                                <div className={panelRequest.detailMemberOne}>
                                                    <div className={panelRequest.memberImg}>
                                                        <img src={pendingMember?.imgLink} alt="" />
                                                    </div>
                                                </div>
                                                <div className={panelRequest.detailMemberTwo}>
                                                    <br />
                                                    <p>Name : {pendingMember?.name} </p>
                                                    <p>Designation : {pendingMember?.designation} </p>
                                                    <p>Email : {pendingMember?.email} </p>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <hr />
                                                    <br />
                                                    {
                                                        <button onClick={() => acceptRequest(true, pendingMember?._id)} className='btn btn-primary'>
                                                            Approve
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>

                    :

                    <div className={panelRequest.noRequestPart}>
                        <div className={panelRequest.noRequestPartContainer}>
                            <p className='text-red-500'>No Request found yet...</p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default PanelRequests;