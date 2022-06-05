const IP = '192.168.1.109'
const BASE_URL = `http://${IP}:3000`
// const BASE_URL = `https://cherry-surprise-85276.herokuapp.com/`;
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
    UPLOAD_PROFILE: "/user/uploadProfile"
}