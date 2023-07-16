import axios from "axios";



const fetchGetBannerData = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/banner`);
    const bannerData = response;
    return bannerData
}

export default fetchGetBannerData;