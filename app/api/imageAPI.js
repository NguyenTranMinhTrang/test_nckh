import axios from './axiosClient'
import endpoint from './endpoint';
const imageAPI = {
    upLoad: async (image) => {
        // if (image) {
        //     const formData = new FormData();
        //     formData.append('image', {
        //         name: new Date() + 'img',
        //         uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
        //         type: 'image/jpg',
        //     });
        //     try {
        //         const res = await axios.post(endpoint.IMAGE, formData, {
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'multipart/form-data',
        //             },
        //             transformRequest: formData => formData
        //         });
        //         return res.result
        //     }
        //     catch (err) {
        //         console.log(err)
        //     }
        // } else {
        //     alert('No photo selected');
        // }
        if (image) {
            const data = {
                name: image.filename || Math.floor(Math.random() * Math.floor(999999)),
                base64: image.base64
            }
            try {
                const res = await axios.post(endpoint.IMAGE, data);
                if (res.status == "SUCCESS") {
                    return { status: 1, data: res.result };
                }
                else {
                    return { status: 0, error: res.message };
                }
            }
            catch (err) {
                console.log(err)
            }
        } else {
            alert('No photo selected');
        }
    }
}
export default imageAPI;