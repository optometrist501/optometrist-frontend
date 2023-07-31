import axios from "axios";

export const fetchGetMemberData = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/member`);
    const memberData = response;
    return memberData
}

export const fetchPostMemberData = async (MemberDataContainer) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/member/create-member`, MemberDataContainer);
        const memberData = response;
        console.log(memberData)
        return memberData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchUpdateMemberData = async (idContainer, updateMemberDataContainer, refetch) => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/v1/member/${idContainer}`, updateMemberDataContainer);
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
        const response = await axios.delete(`http://localhost:5000/api/v1/member/${theId}`);
        const memberData = response;
        console.log(memberData)
        refetch()
        return memberData;
    } catch (error) {
        console.log(error);
    }
}




