import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../api/axiosClient";

export async function postUser(url, data) {
    return new Promise(async (resolve, reject) => {
        axios.post(url, {
            "email": data.email,
            "password": data.password
        })
            .then(res => {
                const { status } = res;

                if (status !== 'SUCCESS') {
                    return reject(res);
                }

                return resolve(res);
            })
            .catch(error => {
                console.log("Error from request auth: ", error);
                return reject({ status: "FAILED", message: "Lỗi Mạng !" });
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