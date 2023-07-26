import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchGetBlogData } from "../fetchedData/fetchBlogData";


const useBlogData = () => {
    const [blogData, setBlogData] = useState([]);
    const { data: getBlogData, refetch } = useQuery("getBlogData", () => fetchGetBlogData());

    useEffect(() => {
        setBlogData(getBlogData)
    }, [getBlogData])

    return [blogData, refetch]
};

export default useBlogData;