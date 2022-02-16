import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';

const Home = () => {

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    marginTop: SIZES.base
                }}
            >
                <AntDesign name="arrowleft" size={50} color={COLORS.primary} style={{ paddingLeft: SIZES.base }} />
                <View
                    style={{
                        width: SIZES.width * 0.5,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius * 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        marginLeft: SIZES.padding * 2
                    }}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Home</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#222222' }}>
            {renderHeader()}
        </SafeAreaView>
    )
}

export default Home;