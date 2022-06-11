import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Platform,
    Pressable,
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';
import Header from "../components/Header";

import validator from "../utils/validations";
import { showError, showSuccess } from "../components/showErrorMess";
import actions from "../redux/actions";


// render
const Register = ({ navigation }) => {
    const [data, setData] = React.useState({
        isLoading: false,
        email: '',
        password: '',
        confirm: '',
        avatar: '',
        token: '',
        secureTextEntry: true,
        confirmSecureTextEntry: true
    });

    const { isLoading, email, password, confirm, secureTextEntry, confirmSecureTextEntry } = data;


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

    function updateConfirmSecureTextEntry() {
        setData({
            ...data,
            confirmSecureTextEntry: !data.confirmSecureTextEntry
        })
    }

    const isValid = () => {
        const error = validator({
            email,
            password,
            confirm
        });

        if (error) {
            showError(error);
            return false;
        }
        return true;
    }

    const onRegister = async () => {
        const checkValidData = isValid();
        if (checkValidData) {
            updateState({
                isLoading: true
            })
            try {
                const res = await actions.signup({
                    email,
                    password
                });

                if (res.status == "PENDING") {
                    showSuccess(res.message);
                    const data = res.data
                    navigation.navigate("SendEmail", {
                        data
                    });
                }
                else {
                    showError(res.message)
                }
                updateState({
                    isLoading: false
                })
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

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
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
                }}
            >
                <Pressable
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: 30,
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
                    <View style={styles.box_text}>
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Nhập Mật Khẩu ..."
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
                    <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Xác Nhận Mật Khẩu</Text>
                    <View
                        style={styles.box_text}
                    >
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Xác Nhận Mật Khẩu ..."
                            secureTextEntry={confirmSecureTextEntry ? true : false}
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(confirm) => updateState({ confirm })}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {
                                confirmSecureTextEntry ?
                                    <Feather name="eye-off" size={20} color="black" />
                                    :
                                    <Feather name="eye" size={20} color="black" />
                            }
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: 50,
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
                            onPress={onRegister}
                        >
                            {!!isLoading ? <ActivityIndicator size="large" color={COLORS.white} /> :
                                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Đăng Ký</Text>
                            }
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