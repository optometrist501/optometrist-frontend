import axios from "axios";

export const fetchGetMemberData = async () => {
    const response = await axios.get(`https://optometrist-server.vercel.app/api/v1/member`);
    const memberData = response;
    return memberData
}

export const fetchPostMemberData = async (MemberDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server.vercel.app/api/v1/member/create-member`, MemberDataContainer);
        const memberData = response;
        refetch();

        return memberData;
    } catch (error) {

    }
}

export const fetchUpdateMemberData = async (idContainer, updateMemberDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometrist-server.vercel.app/api/v1/member/${idContainer}`, updateMemberDataContainer);
        const memberData = response;

        refetch();
        return memberData;
    } catch (error) {

    }
}

export const fetchDeleteMemberData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`https://optometrist-server.vercel.app/api/v1/member/${theId}`);
        const memberData = response;

        refetch()
        return memberData;
    } catch (error) {

    }
}




