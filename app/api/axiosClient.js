import axios from 'axios';
import queryString from 'query-string';
import endpoint from './endpoint';

const timeoutInSecond = 20;

const axiosClient = axios.create({
    baseURL: endpoint.BASE_URL,
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;

}, (error) => {
    throw error;
});

export default axiosClient;