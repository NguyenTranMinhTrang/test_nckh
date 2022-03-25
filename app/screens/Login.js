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
    Keyboard
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';

import validator from "../utils/validations";
import { showError } from "../components/showErrorMess";
// render
const Login = ({ navigation }) => {
    const [data, setData] = React.useState({
        isLoading: false,
        email: '',
        password: '',
        secureTextEntry: true,
    });

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

    const onLogin = () => {
        const checkValidData = isValid();

        if (checkValidData) {
            navigation.navigate('Register');

        }

    }


    function renderHeader() {
        return (
            <View style={{ flex: 1, paddingHorizontal: SIZES.padding, paddingBottom: 50, justifyContent: 'flex-end' }}>
                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Welcome!</Text>
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
                    {/*  {
                        message && <View
                            style={{
                                marginBottom: SIZES.base
                            }}
                        >
                            <Text style={{ ...FONTS.h3_light, color: 'red' }}>{message.message}</Text>
                        </View>
                    } */}
                    <Text style={{ ...FONTS.h3_light }}>Email</Text>
                    <View style={styles.box_text}>
                        <FontAwesome name="user" size={20} color="black" />
                        <TextInput
                            placeholder="Your Email"
                            style={styles.textInput}
                            onChangeText={(email) => updateState({ email })}
                        />
                    </View>
                    <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Password</Text>
                    <View
                        style={styles.box_text}
                    >
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Your Password"
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
                            onPress={() => onLogin()   /*  {
                                if (data.email !== '' && data.password !== '') {
                                    handleLogin(data);
                                }
                                else {
                                    handleMessage({ message: 'Empty input fileds ', status: 'FAILED' });
                                }
                            } */ }
                        >
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Login</Text>
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
                            Don't have an acount ?
                        </Text>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={{ ...FONTS.h3 }}> Let's register</Text>
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