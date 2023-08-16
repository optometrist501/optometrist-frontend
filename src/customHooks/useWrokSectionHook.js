import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetWorkData } from '../fetchedData/fetchWorkData';

const useWrokSectionHook = () => {
    const [workData, setWorkData] = useState([]);
    const { data: getWorkData, refetch } = useQuery("getWorkData", () => fetchGetWorkData());

    useEffect(() => {
        setWorkData(getWorkData)
    }, [getWorkData])

    return [workData, refetch]
};

export default useWrokSectionHook;