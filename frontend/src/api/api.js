import axios from "axios";

export default async function api(path, method, body) {
    const response = await axios({
        method: method,
        url: path,
        baseURL: 'http://localhost:3000/',
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }
    })
    return response.data;
}

function getToken() {
    return localStorage.getItem('api_token');
}

export function saveToken(token) {
    localStorage.setItem('api_token', token);
}
