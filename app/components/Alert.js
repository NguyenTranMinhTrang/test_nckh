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

const Alert = ({ number, title, openModal, onPress, yes, no = null }) => {

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
            uri: images.warningAlert,
            color: COLORS.warning,
        },
    ];


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={openModal}
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
                    onPress={onPress}
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
                            height: 90,
                            width: 90,
                            borderRadius: 100,
                        }}
                    >
                        <Image
                            source={array[number].uri}
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
                        <Text style={{ ...FONTS.h2, textAlign: "center" }}>{title}</Text>
                        {
                            number == 2 ?
                                <View
                                    style={{
                                        width: "100%",
                                        flexDirection: "row",
                                    }}
                                >
                                    {/* Không */}
                                    <TouchableOpacity
                                        style={{
                                            flex: 0.45,
                                            paddingVertical: SIZES.base,
                                            marginTop: SIZES.padding,
                                            borderRadius: SIZES.radius,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: array[number].color
                                        }}
                                        onPress={no ? no : onPress}
                                    >
                                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Không</Text>
                                    </TouchableOpacity>

                                    <View style={{ flex: 0.1 }}></View>


                                    {/* Có */}
                                    <TouchableOpacity
                                        style={{
                                            flex: 0.45,
                                            paddingVertical: SIZES.base,
                                            backgroundColor: array[number].color,
                                            marginTop: SIZES.padding,
                                            borderRadius: SIZES.radius,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        onPress={yes}
                                    >
                                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Có</Text>
                                    </TouchableOpacity>

                                </View>
                                :
                                <TouchableOpacity
                                    style={{
                                        width: 100,
                                        height: 50,
                                        backgroundColor: array[number].color,
                                        marginTop: SIZES.padding,
                                        borderRadius: SIZES.radius,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    onPress={onPress}
                                >
                                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>{array[number].text}</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}

export default Alert;