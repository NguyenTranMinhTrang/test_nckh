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
        <View
            style={{
                width: 300,
                ...contentStyle
            }}
        >
            <TouchableOpacity
                style={{ flexDirection: "row", ...contentStyle }}
                onPress={onPress}
            >

                {/* Image */}

                <ImageBackground
                    source={{ uri: item.image }}
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

                <View style={{ flexShrink: 1, marginLeft: SIZES.base }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{item.title}</Text>
                    {/* <Text style={{ ...FONTS.h4, color: COLORS.white }}>{item.description}</Text> */}
                </View>
            </TouchableOpacity >
        </View >
    )
}

export default NewsVertical;