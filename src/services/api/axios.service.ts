import Axios from "axios";
console.log(import.meta.env.VITE_BASE_URL)
export const AxiosService = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
})