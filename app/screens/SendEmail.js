import React from "react";
import { View, Text, SafeAreaView, TextInput, Pressable, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import ResendTimer from "../components/ResendTimer";
import { resendVerification } from "../api/userAPI";
import { showSuccess, showError } from "../components/showErrorMess";
const SendEmail = ({ navigation, route }) => {
    const { data } = route.params
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

    const triggerTime = (targetTime = 30) => {
        setTargetTime(targetTime);
        setActiveResend(false);
        const finalTime = +(new Date()) + targetTime * 1000;
        resendTimerInterval = setInterval(() => {
            caculateTimeLeft(finalTime);
        }, 1000);
    }

    const resendEmail = async (id, email) => {
        const res = await resendVerification(id, email)
        if (res.status == "PENDING") {
            showSuccess(res.message)
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

    const renderHeader = () => {
        return (
            <View
                style={{
                    height: SIZES.height * 0.45
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'center',
                        marginTop: SIZES.base + 25
                    }}
                >
                    <AntDesign
                        name="arrowleft"
                        size={50}
                        color={COLORS.primary}
                        style={{ paddingLeft: SIZES.base }}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <View
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 200,
                            backgroundColor: COLORS.primary,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <MaterialIcons name="mark-email-read" size={150} color={COLORS.white} />
                    </View>
                </View>
            </View>
        )
    }

    const renderContent = () => {
        return (
            <View
                style={{
                    padding: SIZES.padding,
                }}
            >
                <View
                    style={{ alignItems: "center" }}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>X??c Nh???n T??i Kho???n</Text>
                </View>
                <View
                    style={{ marginVertical: SIZES.padding, alignItems: "center" }}
                >
                    <Text style={{ ...FONTS.h3_light, color: COLORS.white, textAlign: "center" }}>Vui l??ng x??c nh???n email c???a b???n b???ng c??ch click v??o ???????ng link ???? ???????c g???i ?????n mail</Text>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 50,
                        marginBottom: SIZES.padding
                    }}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Ti???p T???c</Text>
                </TouchableOpacity>

                <ResendTimer
                    activeResend={activeResend}
                    timeLeft={timeLeft}
                    targetTime={targetTime}
                    resendEmail={() => resendEmail(data.id, data.email)}
                    color="white"
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
        >
            {renderHeader()}
            {renderContent()}
        </View>
    )
}

export default SendEmail;