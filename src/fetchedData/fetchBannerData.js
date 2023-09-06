import axios from "axios";



export const fetchGetBannerData = async () => {
    const response = await axios.get(`https://optometrist-server.vercel.app/api/v1/banner`);
    const bannerData = response;
    return bannerData
}

export const fetchPostBannerData = async (bannerDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server.vercel.app/api/v1/banner/create-banner`, bannerDataContainer);
        const bannerData = response;
        refetch();

        return bannerData;
    } catch (error) {

    }
}

export const fetchUpdateBannerData = async (idContainer, updateBannerDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometrist-server.vercel.app/api/v1/banner/${idContainer}`, updateBannerDataContainer);
        const bannerData = response;

        refetch();
        return bannerData;
    } catch (error) {

    }
}
export const fetchDeleteBannerData = async (idForDelete, refetch) => {
    try {
        const response = await axios.delete(`https://optometrist-server.vercel.app/api/v1/banner/${idForDelete}`);
        const bannerData = response;

        refetch()
        return bannerData;
    } catch (error) {

    }
}




