import { postUser, setUserData, clearUserData } from "../../utils/utils";
import store from '../stores';
import types from '../types';
import endpoint from "../../api/endpoint";

const { dispatch } = store;

export const saveUserData = (data) => {
    dispatch({
        type: types.LOGIN,
        payload: data
    })
}

export function login(data) {
    return new Promise((resolve, reject) => {
        return postUser(endpoint.LOGIN, data).then((res) => {
            if (res.status == "SUCCESS") {
                setUserData(res.data).then(() => {
                    resolve(res.data);
                    saveUserData(res.data);
                });
                return;
            }
            resolve(res.data);
        })
            .catch((error) => {
                reject(error)
            })
    })
}

export function signup(data) {
    return postUser(endpoint.SIGNUP, data);
}

export function logout() {
    dispatch({ type: types.CLEAR_REDUX_STATE });
    clearUserData();
}