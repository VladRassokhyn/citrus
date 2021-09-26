import axios from "axios";
import { TranslateResponse } from "../lib/types";

const API_KEY = 'AIzaSyBDPfc_HEF6h0up4F49nLBFTm4ONBkPX14'

const axiosInstance = axios.create({
    baseURL: `https://translation.googleapis.com/language/translate/`
})

export const googleApi = {
    async getTranslate(word: string, type: string): Promise<TranslateResponse>{
        if (type === 'en-ru') {
            return axiosInstance.get(`v2?key=${API_KEY}&q=${word}&source=en&target=ru`)
        } else {
            return axiosInstance.get(`v2?key=${API_KEY}&q=${word}&source=ru&target=en`)
        }
    },
}