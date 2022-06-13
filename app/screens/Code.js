import React from "react";
import { View, Text, SafeAreaView, TextInput, Pressable, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';
import { showError, showSuccess } from "../components/showErrorMess";
import ResendTimer from "../components/ResendTimer";
import Header from "../components/Header";
import { resendPIN, verifyPIN } from "../api/userAPI"


const Code = ({ navigation, route }) => {
    const { data } = route.params
    const [code, setCode] = React.useState('');

    const [timeLeft, setTimeLeft] = React.useState(null);
    const [targetTime, setTargetTime] = React.useState(null);
    const [activeResend, setActiveResend] = React.useState(false);
    let resendTimerInterval;

    const caculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if (difference >= 0) {
            setTimeLeft(Math.round(difference / 1000));
        }
        else {
            setTimeLeft(null);
            clearInterval(resendTimerInterval);
            setActiveResend(true);
        }
    }

    const triggerTime = (targetTime = 20) => {
        setTargetTime(targetTime);
        setActiveResend(false);
        const finalTime = +(new Date()) + targetTime * 1000;
        resendTimerInterval = setInterval(() => {
            caculateTimeLeft(finalTime);
        }, 1000);
    }

    const resendPin = async (email) => {
        const res = await resendPIN(email);
        if (res.status == "PENDING") {
            showSuccess(res.message);
            triggerTime();
        }
        else {
            showError(res.message)
        }
    }

    React.useEffect(() => {
        triggerTime();

        return () => {
            clearInterval(resendTimerInterval);
        }
    }, []);

    const isValid = () => {
        if (!code) {
            showError("Bạn chưa nhập mã pin !");
            return false;
        }
        else {
            return true;
        }
    }

    const resendPIN = async (email) => {
        const res = await resendPIN(email)
        if (res.status == "PENDING") {
            showSuccess(res.message)
        }
        else {
            showError(res.message)
        }
    }

    const handlePin = async (email, code) => {
        const checkValid = isValid();
        if (checkValid) {
            const res = await verifyPIN(email, code)
            if (res.status == "SUCCESS") {
                const data = res.data
                showSuccess(res.message)
                navigation.navigate("GetPassword", {
                    data
                });
            }
            else {
                showError(res.message)
            }
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
                    <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Pin</Text>
                    <View
                        style={styles.box_text}
                    >
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Mã Pin ..."
                            value={code}
                            autoCapitalize="none"
                            style={styles.textInput}
                            keyboardType="number-pad"
                            onChangeText={(code) => setCode(code)}

                        />
                    </View>


                    {/* Button get password */}

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

                            onPress={() => handlePin(data.email, code)}
                        >
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Gửi</Text>
                        </TouchableOpacity>
                    </View>
                    <ResendTimer
                        activeResend={activeResend}
                        timeLeft={timeLeft}
                        targetTime={targetTime}
                        resendEmail={() => resendPin(data.email)}
                        color="black"
                    />
                </Pressable>
            </View >
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Nhập Mã Pin" navigation={navigation} />
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

export default Code;