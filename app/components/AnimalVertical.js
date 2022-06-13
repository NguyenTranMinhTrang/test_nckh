import React from "react";
import {
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";

const AnimalVertical = ({ item, contentStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
                ...contentStyle
            }}

            onPress={onPress}
        >
            <Image
                source={item.image}
                resizeMode='cover'
                style={{
                    width: SIZES.width * 0.45,
                    height: SIZES.height * 0.35,
                    borderRadius: SIZES.radius
                }}
            />

            <Text style={{
                position: 'absolute',
                ...FONTS.h2,
                color: COLORS.white,
                bottom: SIZES.padding * 2
            }}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    )
}

export default AnimalVertical;