import axios from "axios";



export const fetchGetPublicationData = async () => {
    const response = await axios.get(`https://optometrist-server.vercel.app/api/v1/publication`
    );
    const publicationData = response;
    return publicationData
}

export const fetchGetPublicationBySearchData = async (searchValue) => {
    const response = await axios.get(`https://optometrist-server.vercel.app/api/v1/publication?searchTerm=${searchValue}`);
    const publicationData = response;
    return publicationData
}

export const fetchPostPublicationData = async (PublicationDataContainer, refetch) => {
    try {
        const response = await axios.post(`https://optometrist-server.vercel.app/api/v1/publication/create-publication`, PublicationDataContainer);
        const publicationData = response;
        refetch();

        return publicationData;
    } catch (error) {


    }
}

export const fetchUpdatePublicationData = async (idContainer, updatePublicationDataContainer, refetch) => {
    try {
        const response = await axios.patch(`https://optometrist-server.vercel.app/api/v1/publication/${idContainer}`, updatePublicationDataContainer);
        const publicationData = response;

        refetch();
        return publicationData;
    } catch (error) {

    }
}
export const fetchDeletePublicationData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`https://optometrist-server.vercel.app/api/v1/publication/${theId}`);
        const publicationData = response;

        refetch()
        return publicationData;
    } catch (error) {

    }
}




