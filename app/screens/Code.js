import React, { useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Pressable, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { showError, showSuccess } from "../components/showErrorMess";
import Header from "../components/Header";
import { resendPIN, verifyPIN } from "../api/userAPI"
import CountOtp from "../components/CountOtp";
import OTPTextView from "react-native-otp-textinput";
import { styleGlobal } from "../styles/stylesGlobal";
import Loading from "../components/Loading";

const COUNT = 4;

const Code = ({ navigation, route }) => {
    const { email, userName } = route.params;

    const refCountDown = useRef();
    const refCode = useRef();
    const refLoading = useRef();

    const onResend = async () => {
        refLoading?.current?.onOpen();
        const res = await resendPIN(email, userName);
        refLoading?.current?.onClose();
        if (res.resultCode == 0) {
            showSuccess('Đã gửi mã OTP thành công!');
            refCountDown?.current?.onCountDown();
        }
        else {
            showError(res.message)
        }
    }

    useEffect(() => {
        refCountDown?.current?.onCountDown();
    }, []);


    const handleTextChange = (text) => {
        console.log('text: ', text);
        refCode.current = text;
        if (text && text.length === COUNT) {
            Keyboard.dismiss();
        }
    }

    const handlePin = async () => {
        refLoading?.current?.onOpen();
        const res = await verifyPIN(userName, email, refCode.current);
        refLoading?.current?.onClose();
        if (res.resultCode == 0) {
            showSuccess();
            navigation.navigate("Login");
        }
        else {
            showError(res.message);
        }
    }

    function renderContent() {
        return (
            <View
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
                    {/* Mã Pin  */}
                    <Text style={[{ ...FONTS.h3, textAlign: 'center' }, styleGlobal.mb2]}>Mã pin đã được gửi đến tài khoản: {email}</Text>

                    <OTPTextView
                        inputCount={COUNT}
                        handleTextChange={handleTextChange}
                    />

                    {/* Button get password */}

                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: SIZES.padding,
                        }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: 50,
                                backgroundColor: COLORS.primary,
                                borderRadius: SIZES.radius
                            }}

                            onPress={handlePin}>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Gửi</Text>
                        </TouchableOpacity>
                    </View>
                    <CountOtp
                        ref={refCountDown}
                        onResend={onResend}
                    />
                </Pressable>
            </View >
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Nhập Mã Pin" navigation={navigation} />
            {renderContent()}
            <Loading ref={refLoading} />
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

export default Code;