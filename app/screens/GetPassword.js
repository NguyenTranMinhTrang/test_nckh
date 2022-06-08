import React from "react";
import { View, Text, SafeAreaView, TextInput, KeyboardAvoidingView, Pressable, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';
import validator from "../utils/validations";
import { showError, showSuccess } from "../components/showErrorMess";
import { AntDesign } from '@expo/vector-icons';


const GetPassword = ({ navigation }) => {

    const [state, setState] = React.useState({
        password: '',
        confirmPassword: '',
        secureTextEntry: true,
        newSecureTextEntry: true
    });

    const { password, confirmPassword, secureTextEntry, newSecureTextEntry } = state;

    console.log(password);
    console.log(confirmPassword);


    const updateState = (newState) => setState(() => (
        {
            ...state,
            ...newState
        }
    ))

    function updateSecureTextEntry() {
        setState({
            ...state,
            secureTextEntry: !state.secureTextEntry
        })
    }

    function updateNewSecureTextEntry() {
        setState({
            ...state,
            newSecureTextEntry: !state.newSecureTextEntry
        })
    }

    const isValid = () => {
        const error = validator({
            password,
            confirm: confirmPassword
        });

        if (error) {
            showError(error);
            return false;
        }
        return true;
    }

    const onReset = async () => {
        const checkValidData = isValid();
        if (checkValidData) {
            console.log("Ok");
        }
    }

    function renderHeader() {
        return (
            <View style={{ flex: 1, paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: SIZES.padding,
                        top: 30,
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: 'rgba(255,255,255,0.5)'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Đổi Mật Khẩu</Text>
            </View>
        )
    }

    function renderContent() {
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
                    {/* Old password  */}
                    <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Mật Khẩu Mới</Text>
                    <View
                        style={styles.box_text}
                    >
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Your Old Password"
                            secureTextEntry={secureTextEntry ? true : false}
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(password) => updateState({ password: password })}

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
                    {/* New Password */}
                    <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Xác Nhận Mật Khẩu</Text>
                    <View
                        style={styles.box_text}
                    >
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Your New Password"
                            secureTextEntry={newSecureTextEntry ? true : false}
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(confirmPassword) => updateState({ confirmPassword: confirmPassword })}
                        />
                        <TouchableOpacity
                            onPress={updateNewSecureTextEntry}
                        >
                            {
                                newSecureTextEntry ?
                                    <Feather name="eye-off" size={20} color="black" />
                                    :
                                    <Feather name="eye" size={20} color="black" />
                            }

                        </TouchableOpacity>
                    </View>

                    {/* Button reset password */}

                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: 30,
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
                            onPress={onReset}
                        >

                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Đổi Mật Khẩu</Text>

                        </TouchableOpacity>
                    </View>

                </Pressable>
            </KeyboardAvoidingView >
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
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

export default GetPassword;