import axios from "axios"

export const fetchGetHeroData = async () => {

    try {
        const response = await axios.get(`https://optometrist-server.vercel.app/api/v1/hero`);
        const aboutData = response;
        return aboutData
    } catch (error) {

    }
}


export const fetchUpdateHeroData = async (updatedData, udpatedId, refetch) => {

    try {
        const response = await axios.patch(`https://optometrist-server.vercel.app/api/v1/hero/${udpatedId}`, updatedData);
        const aboutData = response;
        refetch()
        return aboutData
    } catch (error) {

    }
}

