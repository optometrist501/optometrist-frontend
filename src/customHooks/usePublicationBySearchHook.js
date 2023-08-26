import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetPublicationBySearchData } from '../fetchedData/fetchPublicationData';

const usePublicationBySearchHook = () => {
    const [publicationDataBySearch, setPublicationDataBySearch] = useState([]);
    const { data: getPublicationDataBySearch, refetch } = useQuery("getPublicationDataBySearch", () => fetchGetPublicationBySearchData());

    useEffect(() => {
        setPublicationDataBySearch(getPublicationDataBySearch)
    }, [getPublicationDataBySearch])

    return [publicationDataBySearch, refetch]
};

export default usePublicationBySearchHook;