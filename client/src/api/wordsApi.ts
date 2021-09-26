import axios from "axios"
import { Word } from "../lib/types"

const axiosInstance = axios.create({
    baseURL: "http://dictionary.us-east-2.elasticbeanstalk.com/api/",
})

export const wordsApi = {
    async getWords(): Promise<{data: Word[]}>{
        return await axiosInstance.get('/words')
    },
    async postWord(dto: {ru: string, eng: string}): Promise<any>{
        return await axiosInstance.post('words', {ru: dto.ru, eng: dto.eng})
    },
    async deleteWord(id: string): Promise<any>{
        return await axiosInstance.delete('words/'+id)
    },
    async getBook(page: number): Promise<any>{
        return await axiosInstance.get(`words/book?page=${page}`)
    }
}