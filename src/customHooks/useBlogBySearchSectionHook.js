import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchGetBlogBySearchData, } from "../fetchedData/fetchBlogData";


const useBlogBySearchSectionData = () => {
    const [blogDataBySearch, setBlogDataBySearch] = useState([]);
    const { data: getBlogBySearchData, refetch } = useQuery("getBlogBySearchData", () => fetchGetBlogBySearchData());

    useEffect(() => {
        setBlogDataBySearch(getBlogBySearchData)
    }, [getBlogBySearchData])

    return [blogDataBySearch, refetch]
};

export default useBlogBySearchSectionData;