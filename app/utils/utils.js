import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api/axiosClient";

export async function postUser(url, data) {
    return new Promise(async (resolve, reject) => {
        axios.post(url, {
            "email": data.email,
            "password": data.password
        })
            .then(res => {
                const { status, data } = res;

                if (status !== 'SUCCESS') {
                    return reject(data);
                }

                return resolve(data);
            })
            .catch(error => {
                console.log(error)
                console.log(error && error.response, 'the error respne')
                if (error && error.response && error.response.status === 401) {
                    clearUserData();
                    dispatch({
                        type: types.CLEAR_REDUX_STATE,
                        payload: {}
                    });
                    dispatch({
                        type: types.NO_INTERNET,
                        payload: { internetConnection: true },
                    });


                }
                if (error && error.response && error.response.data) {
                    if (!error.response.data.message) {
                        return reject({ ...error.response.data, msg: error.response.data.message || "Network Error" })
                    }
                    return reject(error.response.data)
                } else {
                    return reject({ message: "Network Error", msg: "Network Error" });
                }

                return reject(error);
            })
    })
}

export function setItem(key, data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then(data => {
            resolve(JSON.parse(data));
        });
    });
}

export function clearAsyncStorate(key) {
    return AsyncStorage.clear();
}

export async function clearUserData() {
    return AsyncStorage.removeItem('userData');
}

export function setUserData(data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem('userData', data);
}

export async function getUserData() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('userData').then(data => {
            resolve(JSON.parse(data));
        });
    });
}