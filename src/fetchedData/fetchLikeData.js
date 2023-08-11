import axios from "axios";

export const fetchGetLikeData = async () => {
    const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/like`);
    const likeData = response;
    return likeData
}

export const fetchPostLikeData = async (likeDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/like/create-like`, likeDataContainer);
        const likeData = response;
        refetch();

        return likeData;
    } catch (error) {

    }
}

export const fetchUpdateLikeData = async (idContainer, updatelikeDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometrist-server-46oo.onrender.com/api/v1/like/${idContainer}`, updatelikeDataContainer);
        const likeData = response;

        refetch();
        return likeData;
    } catch (error) {

    }
}

export const fetchDeleteLikeData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`https://optometrist-server-46oo.onrender.com/api/v1/like/${theId}`);
        const likeData = response;

        refetch()
        return likeData;
    } catch (error) {

    }
}


export const fetchBulkDeleteLikeData = async (idsLike, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/like/bulk-delete`, { idsLike });
        const likeData = response;

        refetch()
        return likeData;
    } catch (error) {

    }
}




