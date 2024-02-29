import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { styleGlobal } from "../styles/stylesGlobal";
import { COLORS } from "../constants";

const Loading = forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);

    const onOpen = () => {
        setLoading(true);
    }

    const onClose = () => {
        setLoading(false);
    }

    useImperativeHandle(ref, () => ({
        onOpen,
        onClose
    }))

    if (loading) {
        return (
            <View
                style={[styleGlobal.center, {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(234,233,238,0.5)',
                    zIndex: 9999
                }]}
            >
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        )
    }

    return null;
})

export default Loading;