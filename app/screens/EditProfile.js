import React, { useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Pressable,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import Loading from "../components/Loading";
import DateInputField from "../components/DateInputField";
import axiosClient from "../api/axiosClient";
import endpoint from "../api/endpoint";
import { format } from "date-fns";
import { styleGlobal } from "../styles/stylesGlobal";
import { showError } from "../components";
import { useSelector } from "react-redux";
import { saveUserData } from "../redux/actions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/AppConstant";

// render
const EditProfile = ({ navigation }) => {
    const refLoading = useRef(null);
    const userData = useSelector((state) => state.auth.userData);

    console.log('userData: ', userData);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            dayOfBirth: new Date(userData?.dayOfBirth),
            fullName: userData?.fullName,
            phoneNumber: userData?.phoneNumber,
        },
    })

    const onEditProfile = async (values) => {
        refLoading?.current?.onOpen();
        const formData = new FormData();
        formData.append('dayOfBirth', format(values?.dayOfBirth, 'yyyy-MM-dd'));
        formData.append('fullName', values?.fullName);
        formData.append('phoneNumber', values?.phoneNumber);
        const response = await axiosClient.post(
            endpoint.UPLOAD_PROFILE,
            formData
        );
        if (response?.resultCode === 0) {
            const newUser = {
                ...userData,
                ...response?.data
            };
            saveUserData(newUser);
            await AsyncStorage.setItem(STORAGE_KEY.USER_DATA, JSON.stringify(newUser));
            navigation.goBack();
        } else {
            showError();
        }
        refLoading?.current?.onClose();
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0;

    function renderFooter() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={keyboardVerticalOffset}
                style={{
                    flex: 3,
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }}>
                <Pressable
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: 30,
                    }}
                    onPress={Keyboard.dismiss}>
                    <View style={[styleGlobal.full]}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <InputField
                                control={control}
                                name="fullName"
                                title="Họ & Tên"
                                iconName="user"
                                required={true}
                            />

                            <InputField
                                control={control}
                                name="phoneNumber"
                                title="Số điện thoại"
                                iconName="phone-portrait"
                                iconType="Ion"
                                required={true}
                            />

                            <DateInputField
                                control={control}
                                name="dayOfBirth"
                                title="Ngày sinh"
                                required={true}
                            />
                        </ScrollView>
                    </View>
                    <View
                        style={[
                            styleGlobal.mt2
                        ]}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: 50,
                                backgroundColor: COLORS.primary,
                                borderRadius: SIZES.radius
                            }}
                            onPress={handleSubmit(onEditProfile)}>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </KeyboardAvoidingView>
        )
    }

    return (
        <View style={styles.container}>
            <Header title="Chỉnh sửa thông tin cá nhân !" navigation={navigation} />
            {renderFooter()}
            <Loading ref={refLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    box_text: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        marginTop: Platform.OS === "ios" ? 0 : -12,
    }
})

export default EditProfile;