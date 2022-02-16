import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";

const Start = () => {

    function renderImage() {
        return (
            <View
                style={{ width: SIZES.width, flexDirection: 'row' }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        width: SIZES.width * 0.5
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: SIZES.padding,
                        }}
                    >
                        <Image
                            source={images.tiger}
                            resizeMode='cover'
                            style={{
                                width: SIZES.width * 0.4,
                                height: SIZES.height * 0.3,
                                borderRadius: SIZES.radius
                            }}
                        />
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={images.turtle}
                            resizeMode='cover'
                            style={{
                                width: SIZES.width * 0.4,
                                height: SIZES.height * 0.2,
                                borderRadius: SIZES.radius
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        width: SIZES.width * 0.5
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: SIZES.padding,
                        }}
                    >
                        <Image
                            source={images.crocodile}
                            resizeMode='cover'
                            style={{
                                width: SIZES.width * 0.4,
                                height: SIZES.height * 0.2,
                                borderRadius: SIZES.radius
                            }}
                        />
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={images.peafowl}
                            resizeMode='cover'
                            style={{
                                width: SIZES.width * 0.4,
                                height: SIZES.height * 0.3,
                                borderRadius: SIZES.radius
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            {renderImage()}
        </SafeAreaView>
    )
}

export default Start;