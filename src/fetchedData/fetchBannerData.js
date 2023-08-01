import axios from "axios";



export const fetchGetBannerData = async () => {
    const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/banner`);
    const bannerData = response;
    return bannerData
}

export const fetchPostBannerData = async (bannerDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/banner/create-banner`, bannerDataContainer);
        const bannerData = response;
        refetch();
        console.log(bannerData)
        return bannerData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchUpdateBannerData = async (idContainer, updateBannerDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometrist-server-46oo.onrender.com/api/v1/banner/${idContainer}`, updateBannerDataContainer);
        const bannerData = response;
        console.log(bannerData)
        refetch();
        return bannerData;
    } catch (error) {
        console.log(error);
    }
}
export const fetchDeleteBannerData = async (idForDelete, refetch) => {
    try {
        const response = await axios.delete(`https://optometrist-server-46oo.onrender.com/api/v1/banner/${idForDelete}`);
        const bannerData = response;
        console.log(bannerData)
        refetch()
        return bannerData;
    } catch (error) {
        console.log(error);
    }
}




