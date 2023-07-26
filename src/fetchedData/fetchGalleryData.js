import axios from "axios";

export const fetchGetGalleryData = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/gallery`);
    const galleryData = response;
    return galleryData
}

export const fetchPostGalleryData = async (galleryDataContainer, refetch) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/gallery/create-gallery`, galleryDataContainer);
        const galleryData = response;
        refetch();
        console.log(galleryData)
        return galleryData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchUpdateGalleryData = async (idContainer, updategalleryDataContainer, refetch) => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/v1/gallery/${idContainer}`, updategalleryDataContainer);
        const galleryData = response;
        console.log(galleryData)
        refetch();
        return galleryData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDeleteGalleryData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/v1/gallery/${theId}`);
        const galleryData = response;
        console.log(galleryData)
        refetch()
        return galleryData;
    } catch (error) {
        console.log(error);
    }
}




