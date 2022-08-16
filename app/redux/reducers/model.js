import types from "../types";

const initialState = {
    tflite: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.MODEL:
            const data = action.payload;
            return { tflite: data };

        default:
            return { ...state };
    }
}