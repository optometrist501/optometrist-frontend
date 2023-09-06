import axios from "axios";

export const fetchGetCommentData = async () => {
    const response = await axios.get(`https://optometrist-server.vercel.app/api/v1/comment`);
    const commentData = response;
    return commentData
}

export const fetchPostCommentData = async (commentDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server.vercel.app/api/v1/comment/create-comment`, commentDataContainer);
        const commentData = response;
        refetch();

        return commentData;
    } catch (error) {

    }
}

export const fetchUpdateCommentData = async (idContainer, updatecommentDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometrist-server.vercel.app/api/v1/comment/${idContainer}`, updatecommentDataContainer);
        const commentData = response;

        refetch();
        return commentData;
    } catch (error) {

    }
}
export const fetchDeleteCommentData = async (idForDelete, refetch) => {
    try {
        const response = await axios.delete(`https://optometrist-server.vercel.app/api/v1/comment/${idForDelete}`);
        const commentData = response;

        refetch()
        return commentData;
    } catch (error) {

    }
}

export const fetchBulkDeleteCommentData = async (idsComment, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server.vercel.app/api/v1/comment/bulk-delete`, { idsComment });
        const commentData = response;

        refetch()
        return commentData;
    } catch (error) {

    }
}




