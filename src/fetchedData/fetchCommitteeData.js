import axios from "axios";



export const fetchGetCommitteeData = async () => {
    const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/committee`
    );
    const committeeData = response;
    return committeeData
}

export const fetchGetBlogBySearchData = async (searchValue) => {
    const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/committee?searchTerm=${searchValue}`);
    const committeeData = response;
    return committeeData
}

export const fetchPostCommitteeData = async (CommitteeDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/committee/create-committee`, CommitteeDataContainer);
        const committeeData = response;
        refetch();

        return committeeData;
    } catch (error) {


    }
}

export const fetchUpdateCommitteeData = async (idContainer, updateCommitteeDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometrist-server-46oo.onrender.com/api/v1/committee/${idContainer}`, updateCommitteeDataContainer);
        const committeeData = response;

        refetch();
        return committeeData;
    } catch (error) {

    }
}
export const fetchDeleteCommitteeData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`https://optometrist-server-46oo.onrender.com/api/v1/committee/${theId}`);
        const committeeData = response;

        refetch()
        return committeeData;
    } catch (error) {

    }
}




