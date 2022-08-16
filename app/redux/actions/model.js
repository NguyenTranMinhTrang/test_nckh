import stores from "../stores";
import types from "../types";

const { dispatch } = stores;

export const loadModel = (tflite) => {
    dispatch({
        type: types.MODEL,
        payload: tflite
    });
}