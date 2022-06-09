import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';

const Header = ({ navigation, title }) => {
    return (
        <View style={{ flex: 1, paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding, justifyContent: 'flex-end' }}>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    left: SIZES.padding,
                    top: 15,
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 25,
                    backgroundColor: 'rgba(255,255,255,0.5)'
                }}
                onPress={() => navigation.goBack()}
            >
                <AntDesign
                    name="arrowleft"
                    size={30}
                    color={COLORS.white}
                />
            </TouchableOpacity>
            <Text style={{ ...FONTS.h1, color: COLORS.white }}>{title}</Text>
        </View>
    )
}

export default Header;