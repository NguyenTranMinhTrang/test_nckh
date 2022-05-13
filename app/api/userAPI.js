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

export const uploadProfileImage = async (photo, token) => {
    const formData = new FormData();
    formData.append('profile', {
        name: new Date() + '_profile',
        uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
        type: 'image/jpg',
    });

    try {
        const res = await axios.post(endpoint.UPLOAD_PROFILE, formData, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                authorization: `JWT ${token}`,
            },
            transformRequest: (data, headers) => {
                return formData;
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};





