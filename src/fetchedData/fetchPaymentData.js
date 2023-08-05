import axios from "axios";

export const fetchPostPaymentData = async (paymentDataContainer) => {
    try {
        const response = await axios.post(`https://optometrist-server-46oo.onrender.com/api/v1/payment/create-payment`, paymentDataContainer);
        const paymentData = response?.data?.url;
        window.location.replace(response?.data?.url)
        return paymentData;
    } catch (error) {

        console.log(error);
    }
}


