import axios from './axiosClient'
import endpoint from './endpoint';
import { getDateByDMYStringFormat } from "../utils/dateUtils"

const messageError = "Không nhận được phản hồi. Hãy kiểm tra đường truyền của bạn và thử lại !";

export const postHistory = async (id, animalID) => {
    try {
        var date = getDateByDMYStringFormat();

        const res = await axios.post(endpoint.POST_HISTORY, {
            "id": id,
            "animalID": animalID,
            "time": date
        });
        if (res) {
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi")
        }

    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }

}
export const postChangePassword = async (id, password, newPassword) => {
    try {
        const res = await axios.post(endpoint.CHANGE_PASSWORD, {
            "id": id,
            "password": password,
            "newPassword": newPassword
        })
        if (res) {
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi")
        }
    }
    catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }

}
export const getHistory = async (id) => {
    try {
        const res = await axios.post(endpoint.GET_HISTORY, {
            "id": id
        })
        if (res) {
            return res
        }
        else {
            throw Error("Không nhận được phản hồi")
        }
    }
    catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
}

export const deleteHistory = async (id, animalID, time) => {
    try {
        const res = await axios.post(endpoint.DELETE_HISTORY, {
            "id": id,
            "animalID": animalID,
            "time": time
        })
        if (res) {
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi")
        }
    }
    catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }

}

export const uploadProfileImage = async (photo, token) => {
    try {
        const formData = new FormData();
        formData.append('profile', {
            name: new Date() + '_profile',
            uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
            type: 'image/jpg',
        });


        const res = await axios.post(endpoint.UPLOAD_PROFILE, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                authorization: `JWT ${token}`,
            },
            transformRequest: formData => formData
        });
        if (res) {
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi")
        }
    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
};

export const requestPasswordReset = async (email) => {
    try {
        const res = await axios.post(endpoint.REQUEST_RESET_PASSWORD, {
            "email": email
        })
        if (res) {
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi");
        }
    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
}

export const resendVerification = async (id, email) => {
    try {
        const res = await axios.post(endpoint.RESEND_VERIFY_EMAIL, {
            "id": id,
            "email": email
        })
        if (res) {
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi");
        }
    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
}

export const resendPIN = async (email, userName) => {
    try {
        const res = await axios.post(endpoint.RESEND_PIN, {
            email,
            userName
        })
        if (res) {
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi");
        }
    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
}

export const verifyPIN = async (userName, email, otp) => {
    try {
        const res = await axios.post(endpoint.VERIFY_PIN, {
            userName,
            email,
            otp
        })
        if (res) {
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi");
        }
    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
}

export const resetPassword = async (newPassword, token) => {
    try {
        const res = await axios.post(endpoint.RESET_PASSWORD, {
            "newPassword": newPassword
        }, {
            headers: {
                Accept: 'application/json',
                authorization: `JWT ${token}`
            }
        })
        if (res) {
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi");
        }
    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
}

export const postUser = async (email, password) => {
    try {
        const res = await axios.post(endpoint.LOGIN, {
            "email": email,
            "password": password
        })
        if (res) {
            console.log(res);
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi");
        }
    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
}

export const singUp = async (email, password) => {
    try {
        const res = await axios.post(endpoint.SIGNUP, {
            "email": email,
            "password": password
        })
        if (res) {
            console.log(res);
            return res;
        }
        else {
            throw Error("Không nhận được phản hồi");
        }
    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
}