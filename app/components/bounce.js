import React from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { COLORS } from "../constants";


const Bounce = () => {
    const position = React.useRef(new Animated.Value(25)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.spring(position, {
                toValue: 0,
                duration: 400,
                friction: 1,
                tension: 20,
                useNativeDriver: true
            })
        ).start();
    }, []);

    return (
        <Animated.View
            style={{
                height: "100%",
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ translateY: position }]
            }}
        >
            <Entypo name="camera" size={40} color={COLORS.white} />
        </Animated.View>
    )
}

export default Bounce;