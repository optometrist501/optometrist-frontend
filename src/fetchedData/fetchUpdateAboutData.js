import axios from "axios"

const fetchUpdateAboutData = async () => {

    const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/about`);
    const aboutData = response;
    return aboutData
}


export default fetchUpdateAboutData;