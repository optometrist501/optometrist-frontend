import axios from "axios"

const fetchUpdateAboutData = async () => {

    const response = await axios.get(`http://localhost:5000/api/v1/about`);
    const aboutData = response;
    return aboutData
}


export default fetchUpdateAboutData;