import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosWithConfig = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
});

axiosWithConfig.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error:", error);
    return Promise.reject(error);
  }
);

export default axiosWithConfig;
