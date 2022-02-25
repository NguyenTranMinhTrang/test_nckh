import axios from './axiosClient'
import endpoint from './endpoint';
const imageAPI = {
    getAll: (params) => {
        return axios.get(endpoint.ANIMAL, { params });
    },

    upLoad: async (image) => {
        if (image) {
            const data = {
                name: image.filename || Math.floor(Math.random() * Math.floor(999999)),
                base64: image.base64
            }
            try {
                const res = await axios.post(endpoint.IMAGE, data)
                return res.result
            }
            catch (err) {
                console.log(err)
            }

            // .then(res => {
            //     result = res.result
            //     console.log('OK')
            // })
            // .catch(err => console.log(err))
        } else {
            alert('No photo selected');
        }
    }
}
export default imageAPI;