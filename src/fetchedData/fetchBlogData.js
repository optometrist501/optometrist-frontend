import axios from "axios";



export const fetchGetBlogData = async () => {
    const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/blog`);
    const blogData = response;
    return blogData
}

export const fetchPostBlogData = async (blogDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/blog/create-blog`, blogDataContainer);
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
        const response = await axios.patch(`https://optometrist-server-46oo.onrender.com/api/v1/blog/${idContainer}`, updateBlogDataContainer);
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
        const response = await axios.delete(`https://optometrist-server-46oo.onrender.com/api/v1/blog/${theId}`);
        const blogData = response;
        console.log(blogData)
        refetch()
        return blogData;
    } catch (error) {
        console.log(error);
    }
}




