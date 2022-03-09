import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';
import endpoint from "../api/endpoint"
import axios from "../api/axiosClient"
const Register = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirm: '',
        secureTextEntry: true,
        confirmSecureTextEntry: true
    });

    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();

    function handleEmailChange(value) {
        if (value == '') {
            handleMessage("Email is empty!!")
        }
        else {
            setData({
                ...data,
                email: value
            });
        }

    }

    function handlePasswordChange(value) {
        if (value == '') {
            handleMessage("Password is empty!!")
        }
        else {
            setData({
                ...data,
                password: value
            });
        }
    }

    function handleConfirmPasswordChange(value) {
        if (value == '') {
            handleMessage("Confirm password is empty!!")
        }
        else {
            setData({
                ...data,
                confirm: value
            });
        }
    }

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

    const handleRegister = (data) => {
        const { email, password, confirm } = data
        if (password != confirm) {
            handleMessage("Password and confirm password do not match!!")
        }
        else {
            axios.post(endpoint.SIGNUP, {
                "email": email,
                "password": password
            })
                .then(res => {
                    const result = res.data
                    const { message, status, data } = result

                    if (status !== 'SUCCESS') {
                        handleMessage(message, status)
                    }
                    else {
                        navigation.navigate('', { ...data[0] }) // handle navigate
                    }
                })
                .catch(err => {
                    console.log(err.JSON())
                    handleMessage("An error occurred. Check your network and try again")
                })
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }


    function renderHeader() {
        return (
            <View style={{ flex: 1, paddingHorizontal: SIZES.padding, paddingBottom: 50, justifyContent: 'flex-end' }}>
                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Register Now!</Text>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    flex: 3,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    paddingVertical: 30
                }}
            >
                <Text style={{ ...FONTS.h3_light }}>Email</Text>
                <View style={styles.box_text}>
                    <FontAwesome name="user" size={20} color="black" />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        onChangeText={(value) => handleEmailChange(value)}
                    />
                </View>
                <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Password</Text>
                <View style={styles.box_text}>
                    <FontAwesome name="lock" size={20} color="black" />
                    <TextInput
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(value) => handlePasswordChange(value)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {
                            data.secureTextEntry ?
                                <Feather name="eye-off" size={20} color="black" />
                                :
                                <Feather name="eye" size={20} color="black" />
                        }
                    </TouchableOpacity>
                </View>
                <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Confirm Password</Text>
                <View style={styles.box_text}>
                    <FontAwesome name="lock" size={20} color="black" />
                    <TextInput
                        placeholder="Your Confirm Password"
                        secureTextEntry={data.confirmSecureTextEntry ? true : false}
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(value) => handleConfirmPasswordChange(value)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureTextEntry}
                    >
                        {
                            data.confirmSecureTextEntry ?
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
                        onPress={() => navigation.navigate('Tabs')}
                    >
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

export default Register;