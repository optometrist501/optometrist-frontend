import axios from "axios";



const fetchGetAdvertiseData = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/advertise`);
    const advertiseData = response;
    return advertiseData;
}

export default fetchGetAdvertiseData;