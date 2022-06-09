const IP = '10.40.236.75'
const localUrl = `http://${IP}:3000`
const herokuUrl = `https://cherry-surprise-85276.herokuapp.com`
const BASE_URL = herokuUrl
export default {
    BASE_URL,
    IMAGE: "/api/image",
    ANIMAL_BY_ID: "/api/animal/get",
    LOGIN: "/user/login",
    SIGNUP: "/user/signup",
    CHANGE_PASSWORD: "/user/changePassword",
    POST_HISTORY: "/user/postHistory",
    GET_HISTORY: "/user/getHistory",
    DELETE_HISTORY: "/user/deleteHistory",
    UPLOAD_PROFILE: "/user/uploadProfile",
    REQUEST_RESET_PASSWORD: "/user/requestPasswordReset",
    VERIFY_PIN: "/user/verifyPinCode",
    RESEND_PIN: "/user/resendPIN",
    RESET_PASSWORD: "/user/resetPassword",
    RESEND_VERIFY_EMAIL: "/user/resendVerificationLink"
}