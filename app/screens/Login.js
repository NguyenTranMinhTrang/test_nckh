import React, { useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    Pressable,
    Keyboard
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { showError, showSuccess, Header } from "../components";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import InputPassword from "../components/InputPassword";
import Loading from "../components/Loading";
import { postUser } from "../api/userAPI";
import { saveUserData } from "../redux/actions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/AppConstant";
// render
const Login = ({ navigation }) => {
    const refLoading = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            userName: "minhtrang",
            password: "123456",
        },
    })

    const onLogin = async (values) => {
        refLoading?.current?.onOpen();
        try {
            const res = await postUser(values.userName, values.password);
            console.log('res login; ', res);
            if (res?.resultCode === 0) {
                console.log(res);
                saveUserData(res?.data);
                await AsyncStorage.setItem(STORAGE_KEY.USER_DATA, JSON.stringify(res?.data));
                showSuccess();
                navigation.navigate("Home");
            } else {
                showError();
            }
        } catch (error) {
            showError();
        }
        refLoading?.current?.onClose();
    }

    function renderHeader() {
        return (
            <Header title="Xin chào !" navigation={navigation} />
        )
    }

    function renderFooter() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={keyboardVerticalOffset}
                style={{
                    flex: 3,
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }}
            >
                <Pressable
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: 30
                    }}
                    onPress={Keyboard.dismiss}>
                    <InputField
                        control={control}
                        name="userName"
                        title="Tên đăng nhập"
                        iconName="user"
                        required={true}
                    />

                    <InputPassword
                        control={control}
                        name="password"
                        title="Mật khẩu"
                        iconName="lock"
                        required={true}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base,
                            justifyContent: "flex-end"
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgetPassword')}
                        >
                            <Text style={{ ...FONTS.h4 }}>Quên Mật Khẩu ?</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: SIZES.padding,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: 50,
                                backgroundColor: COLORS.primary,
                                borderRadius: SIZES.radius
                            }}
                            onPress={handleSubmit(onLogin)}>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Đăng Nhập</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: SIZES.padding
                        }}
                    >
                        <Text
                            style={{ ...FONTS.h3_light }}
                        >
                            Bạn chưa có tài khoản ?
                        </Text>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={{ ...FONTS.h3 }}> Đăng ký ngay !</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </KeyboardAvoidingView>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
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

export default Login;