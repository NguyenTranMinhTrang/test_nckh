import { useEffect } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../api/axiosClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from "../constants/AppConstant";
import { showError } from "../components";
import { useNavigation } from "@react-navigation/native";
import endpoint from "../api/endpoint";
import { saveUserData } from "../redux/actions/auth";

const useRequest = () => {
    const navigation = useNavigation();
    const userData = useSelector((state) => state.auth.userData);

    const handleOutRefresh = () => {
        AsyncStorage.removeItem(STORAGE_KEY.USER_DATA);
        showError('Đã hết phiên đăng nhập, vui lòng đăng nhập lại !');
        navigation.navigate('Login');
    }

    const onRefresh = async () => {
        const response = await axiosClient.post(endpoint.REFRESH_TOKEN, {}, {
            headers: {
                Authorization: `${userData?.accessToken}`,
            }
        });

        if (response?.resultCode === 0) {
            return response?.data?.newToken;
        } else {
            return '';
        }
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
                if (error?.request?.status === 403) {
                    const prevRequest = error?.config;
                    try {
                        const resToken = await onRefresh();
                        if (resToken) {
                            const newData = {
                                ...userData,
                                accessToken: resToken
                            }
                            saveUserData(newData);
                            AsyncStorage.setItem(STORAGE_KEY.USER_DATA, JSON.stringify(newData));
                            prevRequest.headers['Authorization'] = `${resToken}`;
                            return axiosClient(prevRequest);
                        } else {
                            handleOutRefresh();
                        }
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