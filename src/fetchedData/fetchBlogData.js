import axios from "axios";



export const fetchGetBlogData = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/blog`);
    const blogData = response;
    return blogData
}

export const fetchPostBlogData = async (blogDataContainer, refetch) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/blog/create-blog`, blogDataContainer);
        const blogData = response;
        refetch();
        console.log(blogData)
        return blogData;
    } catch (error) {

        console.log(error);
    }
}

export const fetchUpdateBlogData = async (idContainer, updateBlogDataContainer, refetch) => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/v1/blog/${idContainer}`, updateBlogDataContainer);
        const blogData = response;
        console.log(blogData)
        refetch();
        return blogData;
    } catch (error) {
        console.log(error);
    }
}
export const fetchDeleteBlogData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/v1/blog/${theId}`);
        const blogData = response;
        console.log(blogData)
        refetch()
        return blogData;
    } catch (error) {
        console.log(error);
    }
}




