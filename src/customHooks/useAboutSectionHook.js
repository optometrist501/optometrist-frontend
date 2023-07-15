import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import fetchUpdateAboutData from '../fetchedData/fetchUpdateAboutData';

const useAboutData = () => {
    const [aboutData, setAboutData] = useState([]);
    const { data: getAboutData, refetch } = useQuery("getAboutData", () => fetchUpdateAboutData());
    useEffect(() => {
        setAboutData(getAboutData)
    }, [getAboutData])

    return [aboutData, refetch]
};

export default useAboutData;
