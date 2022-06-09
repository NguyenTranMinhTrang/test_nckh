import { setUserData, clearUserData } from "../../utils/utils";
import { postUser, singUp } from "../../api/userAPI"
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
            else {
                reject(res);
            }
        })
            .catch((error) => {
                reject(error)
            })
    })
}

export function signup(data) {
    return singUp(data.email, data.password);
}

export function logout() {
    dispatch({ type: types.CLEAR_REDUX_STATE });
    clearUserData();
}