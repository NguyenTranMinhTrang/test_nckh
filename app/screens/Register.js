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
import InputPassword from "../components/InputPassword";
import Loading from "../components/Loading";
import DateInputField from "../components/DateInputField";
import axiosClient from "../api/axiosClient";
import endpoint from "../api/endpoint";
import { format } from "date-fns";
import { styleGlobal } from "../styles/stylesGlobal";
import { showError } from "../components";

// render
const Register = ({ navigation }) => {
    const refLoading = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            dayOfBirth: "",
            fullName: "",
            phoneNumber: "",
        },
    })

    const onRegister = async (values) => {
        console.log('values form: ', values);
        refLoading?.current?.onOpen();
        const response = await axiosClient.post(
            endpoint.SIGNUP,
            {
                ...values,
                dayOfBirth: format(values?.dayOfBirth, 'yyyy-MM-dd')
            }
        );
        console.log('response: ', response);
        if (response?.resultCode === 0) {
            navigation.navigate('Code', { email: values?.email, userName: values?.userName })
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
                    onPress={Keyboard.dismiss}
                >
                    <View style={[styleGlobal.full]}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <InputField
                                control={control}
                                name="userName"
                                title="Username"
                                iconName="user"
                                required={true}
                            />

                            <InputField
                                control={control}
                                name="fullName"
                                title="Họ & Tên"
                                iconName="user"
                                required={true}
                            />

                            <InputField
                                control={control}
                                name="email"
                                title="Email"
                                iconName="mail-sharp"
                                iconType="Ion"
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

                            <InputPassword
                                control={control}
                                name="password"
                                title="Mật khẩu"
                                iconName="lock"
                                required={true}
                            />

                            <InputPassword
                                control={control}
                                name="confirmPassword"
                                title="Xác Nhận Mật Khẩu"
                                iconName="lock"
                                required={true}
                                rules={{
                                    validate: (value) => {
                                        if (!value) {
                                            return "Trường thông tin không được bỏ trống!"
                                        }
                                    }
                                }}
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
                            onPress={handleSubmit(onRegister)}>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Đăng Ký</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </KeyboardAvoidingView>
        )
    }

    return (
        <View style={styles.container}>
            <Header title="Đăng Ký Ngay !" navigation={navigation} />
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

export default Register;