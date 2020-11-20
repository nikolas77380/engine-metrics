import axios from "axios";

const API =  axios.create({
    baseURL: "http://192.168.3.161/",
});

export const get = (url, params = null) => {
    return API.get(url, params);
}
