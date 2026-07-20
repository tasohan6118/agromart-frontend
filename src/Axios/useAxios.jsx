import axios from "axios";


const axiosInstance=axios.create({
    // baseURL:`http://localhost:5000/`
    baseURL: import.meta.env.VITE_API_URL,
})

const useAxios = () => {
    return axiosInstance
};

export default useAxios;