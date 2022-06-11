import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Pressable,
    Keyboard,
    ActivityIndicator
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';

import validator from "../utils/validations";
import { showError, showSuccess } from "../components/showErrorMess";
import actions from '../redux/actions';
// render
const Login = ({ navigation }) => {

    const isUnmounted = React.useRef(false);

    const [data, setData] = React.useState({
        isLoading: false,
        id: '',
        email: '',
        password: '',
        avatar: '',
        token: '',
        secureTextEntry: true,
    });

    React.useEffect(
        () => () => {
            isUnmounted.current = true;
        },
        [],
    );


    const { isLoading, email, password, secureTextEntry } = data;

    const updateState = (newState) => setData(() => (
        {
            ...data,
            ...newState
        }
    ))

    function updateSecureTextEntry() {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const isValid = () => {
        const error = validator({
            email,
            password
        });

        if (error) {
            showError(error);
            return false;
        }
        return true;
    }


    const onLogin = async () => {
        const checkValidData = isValid();

        if (checkValidData) {
            updateState({
                isLoading: true
            })
            try {
                const res = await actions.login({
                    email,
                    password
                });
                console.log("Login: ", res);

                if (res) {
                    showSuccess("Đăng nhập thành công!")
                }

                if (!isUnmounted.current) {
                    updateState({
                        isLoading: false
                    })
                }

            } catch (error) {
                if (error && error.status) {
                    if (error.status == "FAILED") {
                        showError(error.message);
                    }
                }
                else {
                    showError("There is an error occurd!");
                    console.log(error);
                }
                updateState({
                    isLoading: false
                })
            }
        }

    }


    function renderHeader() {
        return (
            <View style={{ flex: 1, paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding, justifyContent: 'flex-end' }}>
                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Xin Chào !</Text>
            </View>
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

                    onPress={Keyboard.dismiss}
                >
                    <Text style={{ ...FONTS.h3_light }}>Email</Text>
                    <View style={styles.box_text}>
                        <FontAwesome name="user" size={20} color="black" />
                        <TextInput
                            placeholder="Nhập Email ..."
                            style={styles.textInput}
                            onChangeText={(email) => updateState({ email })}
                        />
                    </View>
                    <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Mật Khẩu</Text>
                    <View
                        style={styles.box_text}
                    >
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Nhập Password ..."
                            secureTextEntry={secureTextEntry ? true : false}
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(password) => updateState({ password })}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {
                                secureTextEntry ?
                                    <Feather name="eye-off" size={20} color="black" />
                                    :
                                    <Feather name="eye" size={20} color="black" />
                            }
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base,
                            justifyContent: "flex-end"
                        }}
                    >
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
                            onPress={onLogin}
                        >
                            {!!isLoading ? <ActivityIndicator size="large" color={COLORS.white} /> :
                                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Đăng Nhập</Text>
                            }
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