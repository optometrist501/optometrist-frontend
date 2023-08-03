import axios from "axios";

export const fetchGetCommentData = async () => {
    const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/comment`);
    const commentData = response;
    return commentData
}

export const fetchPostCommentData = async (commentDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/comment/create-comment`, commentDataContainer);
        const commentData = response;
        refetch();
        console.log(commentData)
        return commentData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchUpdateCommentData = async (idContainer, updatecommentDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometrist-server-46oo.onrender.com/api/v1/comment/${idContainer}`, updatecommentDataContainer);
        const commentData = response;
        console.log(commentData)
        refetch();
        return commentData;
    } catch (error) {
        console.log(error);
    }
}
export const fetchDeleteCommentData = async (idForDelete, refetch) => {
    try {
        const response = await axios.delete(`https://optometrist-server-46oo.onrender.com/api/v1/comment/${idForDelete}`);
        const commentData = response;
        console.log(commentData)
        refetch()
        return commentData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchBulkDeleteCommentData = async (idsComment, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/comment/bulk-delete`, { idsComment });
        const commentData = response;
        console.log(commentData)
        refetch()
        return commentData;
    } catch (error) {
        console.log(error);
    }
}




