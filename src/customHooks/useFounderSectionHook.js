import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetFounderData } from '../fetchedData/fetchFounderData';

const useFounderData = () => {
    const [founderData, setFounderData] = useState([]);
    const { data: getFounderData, refetch } = useQuery("getFounderData", () => fetchGetFounderData());

    useEffect(() => {
        setFounderData(getFounderData)
    }, [getFounderData])

    return [founderData, refetch]
};

export default useFounderData;