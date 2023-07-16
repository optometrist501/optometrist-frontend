import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import fetchGetBannerData from "../fetchedData/fetchGetBannerData";

const useBannerData = () => {
    const [bannerData, setBannerData] = useState([]);
    const { data: getBannerData, refetch } = useQuery("getBannerData", () => fetchGetBannerData());
    useEffect(() => {
        setBannerData(getBannerData)
    }, [getBannerData])

    return [bannerData, refetch]
};

export default useBannerData;