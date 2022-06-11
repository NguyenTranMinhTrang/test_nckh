import React from "react";
import { View, Text, SafeAreaView, TextInput, KeyboardAvoidingView, Pressable, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';
import validator from "../utils/validations";
import { showError, showSuccess } from "../components/showErrorMess";
import { postChangePassword } from "../api/userAPI";
import Header from "../components/Header";


const ChangePassword = ({ navigation, route }) => {

    let { userData } = route.params

    const [state, setState] = React.useState({
        password: '',
        newPassword: '',
        secureTextEntry: true,
        newSecureTextEntry: true
    });

    const { password, newPassword, secureTextEntry, newSecureTextEntry } = state;

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
            newPassword
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
            try {
                let res = await postChangePassword(userData.id, password, newPassword)
                if (res.status == "SUCCESS") {
                    showSuccess(res.message)
                    navigation.goBack();
                }
                else {
                    showError(res.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
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
                    <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Mật Khẩu Cũ</Text>
                    <View
                        style={styles.box_text}
                    >
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Mật Khẩu Cũ ..."
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
                    <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Mật Khẩu Mới</Text>
                    <View
                        style={styles.box_text}
                    >
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Mật Khẩu Mới ..."
                            secureTextEntry={newSecureTextEntry ? true : false}
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(newPassword) => updateState({ newPassword: newPassword })}
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
            <Header title="Đổi Mật Khẩu" navigation={navigation} />
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

export default ChangePassword;