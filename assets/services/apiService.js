import Axios from "axios";

const STARTING_URL = "/api";

export const apiService = {
    get(url, data = {}) {
        return Axios({
            method: 'get',
            url: STARTING_URL + url,
            params: data,
            headers: headers()

        })
    },
    post(url, data = {}) {
        return Axios({
            method: 'post',
            url: STARTING_URL + url,
            data: data,
            headers: headers()
        })
    },
    put(url, data = {}) {
        return Axios({
            method: 'put',
            url: STARTING_URL + url,
            data: data,
            headers: headers()
        })
    },
    delete(url, data = {}) {
        return Axios({
            method: 'delete',
            url: STARTING_URL + url,
            params: data,
            headers: headers()

        })
    },
}

function headers() {
    const authHeader = localStorage.getItem('token')
        ? { Authorization: "Bearer " + localStorage.getItem('token') }
        : {};
    return {
        ...authHeader,
        "Content-Type": "application/json"
    }
}