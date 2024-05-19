import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Icon from "./Icon";
import { COLORS, FONTS } from "../constants/theme";

const ImageFileItem = ({ item, onDelete, index }) => {

    const onPressDelete = () => {
        onDelete?.(index);
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                borderBottomWidth: 0.4,
                borderBottomColor: COLORS.lightGray
            }}
        >
            <Image
                source={{ uri: item?.uri }}
                style={{
                    height: 50,
                    width: 50,
                    borderRadius: 15
                }}
                resizeMode="cover"
            />

            <View style={{ height: '100%', marginLeft: 15, paddingVertical: 7.5, flex: 1 }}>
                <Text style={FONTS.h3}>{item?.fileName || ''}</Text>
                {/* <Text>{item?.}</Text> */}
            </View>

            <TouchableOpacity
                onPress={onPressDelete}
            >
                <Icon
                    name="trash"
                    type="Font"
                    color={COLORS.error}
                />
            </TouchableOpacity>
        </View>
    )
}

export default ImageFileItem;