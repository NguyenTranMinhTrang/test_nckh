import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SIZES, FONTS } from "../constants";

const ResendTimer = ({ timeLeft, resendEmail, color, activeResend }) => {
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
                <Text style={{ ...FONTS.h3_light, color: color }}>Chưa nhận được mã pin ? </Text>
                {
                    activeResend && (

                        <TouchableOpacity
                            onPress={() => resendEmail()}
                        >
                            <Text style={{ ...FONTS.h3, color: color, textDecorationLine: "underline" }}>Gửi Lại !</Text>
                        </TouchableOpacity>

                    )
                }
                {
                    !activeResend && (
                        <TouchableOpacity
                            disabled={true}
                        >
                            <Text style={{ ...FONTS.h3, color: color, textDecorationLine: "underline", opacity: 0.5 }}>Gửi Lại !</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
            {
                !activeResend && (
                    <Text style={{ ...FONTS.h3_light, color: color }}>in {timeLeft} second(s)</Text>
                )
            }

        </View >
    )
}

export default ResendTimer;