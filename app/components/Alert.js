import React from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View,
    Modal
} from "react-native";
import { COLORS, SIZES, FONTS, images } from "../constants";
import { BlurView } from "expo-blur";

const Alert = ({ number, title }) => {

    const array = [
        {
            type: "success",
            uri: images.successAlert,
            color: COLORS.primary,
            text: "Ok"
        },
        {
            type: "error",
            uri: images.errorAlert,
            color: COLORS.error,
            text: "Ok"
        },
        {
            type: "warning",
            uri: images.errorAlert,
            color: COLORS.warning,
            yes: "Có",
            no: "Không"
        },
    ];


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <BlurView
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                intensity={80}
                tint="dark"
            >
                {/* button to close modal */}
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                //onPress={() => setShowChooseCamrera(false)}
                ></TouchableOpacity>

                {/* Content */}

                <View
                    style={{
                        alignItems: 'center',
                        width: '85%',
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.radius,
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            top: -50,
                            height: 100,
                            width: 100,
                            borderRadius: 100,
                        }}
                    >
                        <Image
                            source={array[0].uri}
                            resizeMode="cover"
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: 100
                            }}
                        />
                    </View>

                    {/* Content Alert */}
                    <View
                        style={{
                            marginTop: 50,
                            width: "100%",
                            flexShrink: 1,
                            paddingHorizontal: SIZES.padding,
                            paddingBottom: SIZES.padding,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ ...FONTS.h2, textAlign: "center" }}>Ảnh đã được dự đoán thành công !</Text>
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 50,
                                backgroundColor: array[0].color,
                                marginTop: SIZES.padding,
                                borderRadius: SIZES.radius,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>{array[0].text}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}

export default Alert;