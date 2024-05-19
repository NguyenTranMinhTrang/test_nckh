import React from "react";
import { Image, Text, View } from "react-native";

const EmptyView = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                source={require('../assets/images/empty.png')}
                style={{
                    height: 160,
                    width: 160
                }}
            />
            <Text style={{ fontSize: 18 }}>Không có dữ liệu !</Text>
        </View>
    )
}

export default EmptyView;