import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchGetCommentData } from "../fetchedData/fetchCommentData";



const useCommentData = () => {
    const [commentData, setcommentData] = useState([]);
    const { data: getcommentData, refetch } = useQuery("getcommentData", () => fetchGetCommentData());

    useEffect(() => {
        setcommentData(getcommentData)
    }, [getcommentData])

    return [commentData, refetch]
};

export default useCommentData;