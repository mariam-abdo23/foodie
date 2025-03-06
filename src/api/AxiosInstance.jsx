import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'https://food.sidigaber.org/api/',
    headers: {
        "Content-Type": "application/json",
    }
});

export default AxiosInstance;