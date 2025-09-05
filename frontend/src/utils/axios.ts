import axios, {AxiosInstance} from 'axios';

const isServer = typeof window === "undefined";

export const API_BASE = isServer
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL;


const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
