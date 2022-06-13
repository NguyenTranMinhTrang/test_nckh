import React from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';

const VideoVertical = ({ item, contentStyle, onPress }) => {
    return (
        <View
            style={{
                width: 270,
                ...contentStyle
            }}
        >
            {/* Image */}
            <TouchableOpacity
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.radius
                }}
                onPress={onPress}
            >
                <Image
                    source={item.image}
                    resizeMode='cover'
                    style={{
                        width: "100%",
                        height: 150,
                        borderRadius: SIZES.radius
                    }}
                />
            </TouchableOpacity>
            {/* Details */}
            <View style={{ flexDirection: "row", paddingTop: SIZES.radius, alignItems: "center" }}>
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        backgroundColor: COLORS.primary,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={onPress}
                >
                    <AntDesign name="caretright" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <View style={{ flexShrink: 1, padding: SIZES.radius }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{item.title}</Text>
                </View>
            </View>
        </View>
    )
}

export default VideoVertical;