import axios from './axiosClient'
import endpoint from './endpoint';
export const getByID = async (id) => {
    //-----Use this-----
    //import { getByID } from "../api/imageAPI";
    // let res = await getByID(animalID)
    // if (res.status == "SUCCESS") {
    //     console.log(res.data)
    // }
    // else {
    //     console.log(res.error)
    // }
    try {
        const res = await axios.get(endpoint.ANIMAL_BY_ID, { params: { id: id } });
        if (res)
            return res
        else
            throw Error("Không nhận được phản hồi")
    } catch (error) {
        return { status: "FAILED", message: error.message };
    }

}
export const upLoad = async (image) => {
    try {
        if (image) {
            const data = {
                name: image.filename || Math.floor(Math.random() * Math.floor(999999)),
                base64: image.base64
            }

            const res = await axios.post(endpoint.IMAGE, data);
            if (res) {
                return res;
            }
            else {
                throw Error("Không nhận được phản hồi")
            }

        } else {
            throw Error('Không có ảnh nào được chọn !');
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

export const getNews = async () => {
    try {
        const vnexpress = "https://timkiem.vnexpress.net/?search_q=%C4%91%E1%BB%99ng%20v%E1%BA%ADt%20hoang%20d%C3%A3&cate_code=khoa-hoc&media_type=all&latest=&fromdate=&todate=&date_format=all&"
        let res = await axios.get(vnexpress)
        if (res)
            return res
        else {
            throw Error("Không nhận được phản hồi từ trang tin tức")
        }
    } catch (error) {
        let message = error.message;
        if (error.code === 'ECONNABORTED') {
            message = messageError;
        }
        return { status: "FAILED", message: message };
    }
}
