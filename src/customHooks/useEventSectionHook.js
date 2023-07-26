import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchGetEventData } from "../fetchedData/fetchEventData";


const useEventData = () => {
    const [eventData, setEventData] = useState([]);
    const { data: getEventData, refetch } = useQuery("getEventData", () => fetchGetEventData());

    useEffect(() => {
        setEventData(getEventData)
    }, [getEventData])

    return [eventData, refetch]
};

export default useEventData;