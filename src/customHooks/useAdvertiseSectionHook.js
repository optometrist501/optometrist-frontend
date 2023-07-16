import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import fetchGetAdvertiseData from "../fetchedData/fetchGetAdevertiseData";

const useAdvertiseData = () => {
    const [advertiseData, setAdvertiseData] = useState([]);
    const { data: getAdvertiseData, refetch } = useQuery("getAdvertiseData", () => fetchGetAdvertiseData());
    useEffect(() => {
        setAdvertiseData(getAdvertiseData)
    }, [getAdvertiseData])

    return [advertiseData, refetch]
};

export default useAdvertiseData;