import types from "../types";

const initialState = {
    userData: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            const data = action.payload;
            return { userData: data };

        default:
            return { ...state };
    }
}