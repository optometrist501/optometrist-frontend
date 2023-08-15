import axios from "axios";

export const fetchPostPaymentData = async (paymentDataContainer) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/payment/create-payment`, paymentDataContainer);
        const paymentData = response?.data?.url;
        window.location.replace(response?.data?.url)
        return paymentData;
    } catch (error) {

    }
}

export const fetchGetPaymentDataForId = async () => {
    try {
        const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/payment`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('oab-access-token')}`
            }
        });
        return response;
    } catch (error) {

    }
}

export const fetchGetPaymentData = async (cus_email, setErrorHolder) => {
    try {
        const response = await axios.get(`https://optometrist-server-46oo.onrender.com/api/v1/payment?cus_email=${cus_email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('oab-access-token')}`
            }
        });
        const paymentData = response;
        setErrorHolder('');

        return paymentData;
    } catch (error) {
        console.log(error?.message);
        setErrorHolder(error?.message);
    }
}




