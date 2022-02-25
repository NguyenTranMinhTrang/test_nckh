import axios from './axiosClient'
import endpoint from './endpoint';
const imageAPI = {
    dummyData: {},
    getAll: (params) => {
        return axios.get(endpoint.ANIMAL, { params });
    },

    upLoad: (image) => {
        if (image) {
            const data = {
                name: image.filename || Math.floor(Math.random() * Math.floor(999999)),
                base64: image.base64
            }
            axios
                .post(endpoint.IMAGE, data)
                .then(res => {
                    dummyData = res.result;
                })
                .catch(err => console.log(err))
        } else {
            alert('No photo selected');
        }
    }
}
export default imageAPI;