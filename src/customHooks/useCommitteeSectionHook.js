import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGetCommitteeData } from '../fetchedData/fetchCommitteeData';

const useCommitteeData = () => {
    const [committeeData, setCommitteeData] = useState([]);
    const { data: getCommitteeData, refetch } = useQuery("getCommitteeData", () => fetchGetCommitteeData());

    useEffect(() => {
        setCommitteeData(getCommitteeData)
    }, [getCommitteeData])

    return [committeeData, refetch]
};

export default useCommitteeData;