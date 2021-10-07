import axios from "axios";

export default async function api(path, method, body) {
    const response = await axios({
        method: method,
        url: path,
        baseURL: process.env.REACT_APP_API_URL,
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }
    })
    return response.data;
}

export function getToken() {
    return localStorage.getItem('token');
}

export function saveToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}
