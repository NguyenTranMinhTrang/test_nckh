import axios from './axiosClient'
import endpoint from './endpoint';

export const postHistory = async (id, animalID) => {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    axios.post(endpoint.POST_HISTORY, {
        "id": id,
        "animalID": animalID,
        "time": date
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
export const postChangePassword = async (email, password, newPassword) => {
    try {
        const res = await axios.post(endpoint.CHANGE_PASSWORD, {
            "email": email,
            "password": password,
            "newPassword": newPassword
        })
        return res
    }
    catch (err) {
        console.log(err)
    }

}
export const getHistory = async (id) => {
    try {
        const res = await axios.post(endpoint.GET_HISTORY, {
            "id": id
        })
        return res
    }
    catch (err) {
        console.log(err)
    }
}




