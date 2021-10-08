import axios from "axios";

export default async function api(path, method, body) {
    const response = await axios({
        method: method,
        url: path,
        baseURL: process.env.REACT_APP_API_URL,
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    })
    return response.data;
}

export async function apiFile(path, method, data) {
    const response = await axios({
        method: method,
        url: path,
        baseURL: process.env.REACT_APP_API_URL,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken()
        }
    });
    return response.data;
}

export function getToken() {
    return localStorage.getItem('token');
}

export function saveToken(token) {
    localStorage.setItem('token', 'Bearer ' + token);
}

export function removeToken() {
    localStorage.removeItem('token');
}
