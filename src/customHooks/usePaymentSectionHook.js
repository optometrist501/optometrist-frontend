import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetPaymentData } from '../fetchedData/fetchPaymentData';

const usePaymentSectionHook = () => {
    // const [paymentData, setPaymentData] = useState([]);
    // const { data: getPaymentData, refetch } = useQuery("getPaymentData", () => fetchGetPaymentData());
    // useEffect(() => {
    //     setPaymentData(getPaymentData)
    // }, [getPaymentData])

    return []
};

export default usePaymentSectionHook;