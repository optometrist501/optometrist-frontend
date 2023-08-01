import axios from "axios";



const fetchGetAdvertiseData = async () => {
    const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/advertise`);
    const advertiseData = response;
    return advertiseData;
}

export default fetchGetAdvertiseData;