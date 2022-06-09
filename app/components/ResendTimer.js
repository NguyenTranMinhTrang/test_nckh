import React from "react";
import { View, Text, SafeAreaView, TextInput, Pressable, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";

const ResendTimer = ({ activeResend, timeLeft, targetTime, resendEmail }) => {
    return (
        <View
            style={{
                alignItems: 'center'
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: SIZES.padding,
                }}
            >
                <Text style={{ ...FONTS.h3_light, color: COLORS.white }}>Chưa nhận được mã pin ? </Text>
                {
                    activeResend && (

                        <TouchableOpacity
                            onPress={() => resendEmail()}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white, textDecorationLine: "underline" }}>Gửi Lại !</Text>
                        </TouchableOpacity>

                    )
                }
                {
                    !activeResend && (
                        <TouchableOpacity
                            disabled={true}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white, textDecorationLine: "underline", opacity: 0.5 }}>Gửi Lại !</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
            {
                !activeResend && (
                    <Text style={{ ...FONTS.h3_light, color: COLORS.white }}>in {timeLeft || targetTime} second(s)</Text>
                )
            }

        </View >
    )
}

export default ResendTimer;