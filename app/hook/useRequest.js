import { useEffect } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../api/axiosClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from "../constants/AppConstant";
import { showError } from "../components";
import { useNavigation } from "@react-navigation/native";

const useRequest = () => {
    const navigation = useNavigation();
    const userData = useSelector((state) => state.auth.userData);

    const handleOutRefresh = () => {
        AsyncStorage.removeItem(STORAGE_KEY.USER_DATA);
        showError('Đã hết phiên đăng nhập, vui lòng đăng nhập lại !');
        navigation.navigate('Login');
    }

    const refresh = async () => {

    }

    useEffect(() => {
        const requestIntercept = axiosClient.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `${userData?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosClient.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        console.log('Out access token');
                        // const newAccessToken = await refresh();
                        // if (newAccessToken) {
                        //     AsyncStorage.setItem(STORAGE_KEY.TOKEN, JSON.stringify(newAccessToken));
                        //     prevRequest.headers['Authorization'] = `${newAccessToken}`;
                        //     return axiosPrivate(prevRequest);
                        // }
                    } catch (error) {
                        handleOutRefresh();
                    }
                }
                return;
            }
        )

        return () => {
            axiosClient.interceptors.response.eject(responseIntercept);
            axiosClient.interceptors.request.eject(requestIntercept);
        }

    }, [userData]);

    return axiosClient;
};

export default useRequest;