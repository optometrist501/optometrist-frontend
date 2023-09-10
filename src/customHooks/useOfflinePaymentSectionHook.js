import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetOfflinePaymentData } from '../fetchedData/fetchOfflinePaymentData';

const useOfflinePaymentSectionHook = () => {
    const [offlinePaymentData, setOfflinePaymentData] = useState([]);
    const { data: getOfflinePaymentData, refetch } = useQuery("getOfflinePaymentData", () => fetchGetOfflinePaymentData());

    useEffect(() => {
        setOfflinePaymentData(getOfflinePaymentData)
    }, [getOfflinePaymentData])

    return [offlinePaymentData, refetch]
};

export default useOfflinePaymentSectionHook;