import axios from "axios";

export const fetchGetMemberData = async () => {
    const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/member`);
    const memberData = response;
    return memberData
}

export const fetchPostMemberData = async (MemberDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/member/create-member`, MemberDataContainer);
        const memberData = response;
        refetch();
        console.log(memberData)
        return memberData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchUpdateMemberData = async (idContainer, updateMemberDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometrist-server-46oo.onrender.com/api/v1/member/${idContainer}`, updateMemberDataContainer);
        const memberData = response;
        console.log(memberData)
        refetch();
        return memberData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDeleteMemberData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`https://optometrist-server-46oo.onrender.com/api/v1/member/${theId}`);
        const memberData = response;
        console.log(memberData)
        refetch()
        return memberData;
    } catch (error) {
        console.log(error);
    }
}




