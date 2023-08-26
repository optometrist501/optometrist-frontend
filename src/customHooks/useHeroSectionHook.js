import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetHeroData } from '../fetchedData/fetchHeroData';

const useHeroData = () => {
    const [heroData, setHeroData] = useState([]);
    const { data: getHeroData, refetch } = useQuery("getHeroData", () => fetchGetHeroData());

    useEffect(() => {
        setHeroData(getHeroData)
    }, [getHeroData])

    return [heroData, refetch]
};

export default useHeroData;