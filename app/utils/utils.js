import AsyncStorage from "@react-native-async-storage/async-storage";
import endpoint from "../api/endpoint";
import axios from "../api/axiosClient";

export function postUser(data) {
    axios.post(endpoint.LOGIN, {
        "email": data.email,
        "password": data.password
    })
        .then(res => {
            const result = res
            const { message, status, data } = result

            if (status !== 'SUCCESS') {
                handleMessage({ message: message, status: status })
            }
            else {
                navigation.navigate('Tabs', { ...data[0] }) // handle navigate
            }
        })
        .catch(err => {
            console.log(err)
            handleMessage("An error occurred. Check your network and try again")
        })
}