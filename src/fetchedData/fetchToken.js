import axios from "axios"

export const fetchToken = async (userInfo) => {
    console.log(userInfo);
    const response = await axios.post(`https://optometrist-server.vercel.app/api/v1/jwt/create-jwt`, {
        email: JSON.stringify(userInfo)
    });
    console.log(response);
    const stringifiedData = response.data.token
    localStorage.setItem('oab-access-token', stringifiedData);
};