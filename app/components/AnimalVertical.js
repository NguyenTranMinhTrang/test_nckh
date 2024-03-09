import React from "react";
import {
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";

const AnimalVertical = ({ item, contentStyle, onPress }) => {

    const onDetail = () => {
        onPress?.(item);
    }

    return (
        <TouchableOpacity
            style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
                ...contentStyle
            }}
            onPress={onDetail}>
            <Image
                source={{ uri: item.images[0].image_local_path }}
                resizeMode='cover'
                style={{
                    width: SIZES.width * 0.45,
                    height: SIZES.height * 0.3,
                    borderRadius: SIZES.radius
                }}
            />

            <Text style={{
                position: 'absolute',
                ...FONTS.h2,
                color: COLORS.white,
                bottom: SIZES.padding * 2
            }}>
                {item.vn_name || ''}
            </Text>
        </TouchableOpacity>
    )
}

export default AnimalVertical;