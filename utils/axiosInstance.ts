import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://money.tmtradingraj.com", // Replace with your API's base URL
  timeout: 5000,
});

export default axiosInstance;
