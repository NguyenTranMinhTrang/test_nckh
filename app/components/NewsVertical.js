import React from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View,
    ImageBackground
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';

const NewsVertical = ({ item, contentStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{ flexDirection: "row", ...contentStyle }}
            onPress={onPress}
        >

            {/* Image */}

            <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={{
                    height: 130,
                    width: 130,
                    marginBottom: SIZES.radius
                }}

                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            />

            {/* Details */}

            <View style={{ flex: 1, marginLeft: SIZES.base }}>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default NewsVertical;