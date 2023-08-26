import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetPublicationData } from '../fetchedData/fetchPublicationData';

const usePublicationHook = () => {
    const [publicationData, setPublicationData] = useState([]);
    const { data: getPublicationData, refetch } = useQuery("getPublicationData", () => fetchGetPublicationData());

    useEffect(() => {
        setPublicationData(getPublicationData)
    }, [getPublicationData])

    return [publicationData, refetch]
};

export default usePublicationHook;