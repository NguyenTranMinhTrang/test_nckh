const IP = '10.0.129.217'
const localUrl = `http://${IP}:3000`
const herokuUrl = `https://cherry-surprise-85276.herokuapp.com`
const url2024 = 'http://api.rap-ai.asia';
const BASE_URL = url2024;
export default {
    BASE_URL,
    IMAGE: "/api/image",
    ANIMAL_BY_ID: "/api/animal/get",
    LOGIN: "/user/login",
    SIGNUP: "/user/register",
    CHANGE_PASSWORD: "/user/changePassword",
    POST_HISTORY: "/user/postHistory",
    GET_HISTORY: "/user/getHistory",
    DELETE_HISTORY: "/user/deleteHistory",
    UPLOAD_PROFILE: "/user/uploadProfile",
    REQUEST_RESET_PASSWORD: "/user/requestPasswordReset",
    VERIFY_PIN: "/user/verifyOtp",
    RESEND_PIN: "/user/resendOtp",
    RESET_PASSWORD: "/user/resetPassword",
    RESEND_VERIFY_EMAIL: "/user/resendVerificationLink",
    PREDICT_ANIMAL: '/redList/predictAnimal',
    CREATE_REPORT: '/report/createReport',
}