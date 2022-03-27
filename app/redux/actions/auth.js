import { postUser, setUserData, clearUserData } from "../../utils/utils";
import store from '../stores';
import types from '../types';

const { dispatch } = store;

export const saveUserData = (data) => {
    dispatch({
        type: types.LOGIN,
        payload: data
    })
}

export function login(data) {
    return new Promise((resolve, reject) => {
        return postUser(data).then((res) => {
            if (res) {
                setUserData(res).then(() => {
                    resolve(res)
                    saveUserData(res)
                });
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}