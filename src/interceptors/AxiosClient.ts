import axios from "axios";
import { config } from "../configs";

export const AxiosClient = axios.create({
    baseURL: config.API_URL
});