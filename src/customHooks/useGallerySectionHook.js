import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchGetGalleryData } from "../fetchedData/fetchGalleryData";


const useGalleryData = () => {
    const [galleryData, setGalleryData] = useState([]);
    const { data: getGalleryData, refetch } = useQuery("getGalleryData", () => fetchGetGalleryData());

    useEffect(() => {
        setGalleryData(getGalleryData)
    }, [getGalleryData])

    return [galleryData, refetch]
};

export default useGalleryData;