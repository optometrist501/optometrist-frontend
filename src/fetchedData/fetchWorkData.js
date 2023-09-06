import axios from "axios"

export const fetchGetWorkData = async () => {

    const response = await axios.get(`https://optometrist-server.vercel.app/api/v1/work`);
    const workData = response;
    return workData
}

export const fetchUpdateWorkData = async (updateId, updatedData, refetch) => {

    try {
        const response = await axios.patch(`https://optometrist-server.vercel.app/api/v1/work/${updateId}`, updatedData);
        const workData = response;
        refetch();
        console.log(workData)
        return workData
    } catch (error) {

    }
}


