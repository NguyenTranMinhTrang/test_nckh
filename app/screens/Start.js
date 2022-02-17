import React from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { Feather } from '@expo/vector-icons';

const Start = ({ navigation }) => {

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

    function renderText() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    width: SIZES.width,
                    alignItems: 'center'
                }}
            >
                <Text style={{ ...FONTS.h1, color: COLORS.white, textAlign: 'center' }}>Welcome</Text>
                <Text style={{ ...FONTS.h1, color: COLORS.white, textAlign: 'center' }}>to animal world !</Text>
                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, textAlign: 'center' }}>Recognize wild animal and protect them with our app</Text>
                <TouchableOpacity
                    style={[{
                        marginTop: SIZES.padding,
                        backgroundColor: COLORS.primary,
                        width: SIZES.width * 0.8,
                        flexDirection: 'row',
                        borderRadius: SIZES.radius * 2,
                        alignItems: 'center',
                        height: 55
                    }, styles.shadow]}

                    onPress={() => navigation.navigate('Tabs')}
                >
                    <Feather name="arrow-right-circle" size={50} color="white" iconStyle={{ paddingLeft: 5 }} />
                    <Text style={{ ...FONTS.h2, color: COLORS.white, paddingLeft: 30 }} >Get Started</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderImage()}
            {renderText()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
});

export default Start;