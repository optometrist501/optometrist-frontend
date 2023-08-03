import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchGetLikeData } from "../fetchedData/fetchLikeData";


const useLikeData = () => {
    const [likeData, setLikeData] = useState([]);
    const { data: getLikeData, refetch } = useQuery("getLikeData", () => fetchGetLikeData());

    useEffect(() => {
        setLikeData(getLikeData)
    }, [getLikeData])

    return [likeData, refetch]
};

export default useLikeData;