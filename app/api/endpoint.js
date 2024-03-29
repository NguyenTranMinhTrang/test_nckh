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
    GET_HISTORY: "/history/getHistory",
    DELETE_HISTORY: "/history/deleteHistory",
    UPLOAD_PROFILE: "/user/updateProfile",
    REQUEST_RESET_PASSWORD: "/user/requestPasswordReset",
    VERIFY_PIN: "/user/verifyOtp",
    RESEND_PIN: "/user/resendOtp",
    RESET_PASSWORD: "/user/resetPassword",
    RESEND_VERIFY_EMAIL: "/user/resendVerificationLink",
    PREDICT_ANIMAL: '/redList/predictAnimal',
    PREDICT_AFTERLOGIN: 'redList/predictAnimalAfterLogin',
    CREATE_REPORT: '/report/createReport',
    GET_ANIMAL: '/redList/getAnimalRedList',
    GET_ANIMAL_AFTER_LOGIN: '/redList/getAnimalRedListAfterLogin',
    UPLOAD_AVATAR: '/user/updateAvt',
    LOGOUT: '/user/logout',
    REFRESH_TOKEN: '/user/expand',
}