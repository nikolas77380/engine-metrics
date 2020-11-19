const API_URL = 'http://192.168.3.1/';

export const get = (url) => {
    return fetch(API_URL + url, {
        method: 'GET',
        mode: 'no-cors'
    })
}
