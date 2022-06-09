import { setUserData, clearUserData } from "../../utils/utils";
import { postUser } from "../../api/userAPI"
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
        return postUser(data.email, data.password).then((res) => {
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
    return postUser(data.email, data.password);
}

export function logout() {
    dispatch({ type: types.CLEAR_REDUX_STATE });
    clearUserData();
}