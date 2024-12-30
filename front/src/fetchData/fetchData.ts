import axios from 'axios';

const BASE_URL = "http://localhost:3000";


export const getVideo = async (url: string, socketId: string) => {
    const { data } = await axios.get(`${BASE_URL}/download/?url=${url} &&socketId=${socketId}`);
    return data
}