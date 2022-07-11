import React from "react";
import { Text, View, StyleSheet, Button, SafeAreaView } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { COLORS } from "../constants";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat
} from 'react-native-reanimated';

const SIZE = 40;

const Bounce = () => {

    const opacity = useSharedValue(1);
    const scale = useSharedValue(1.5);
    const rotate = useSharedValue(- Math.PI / 4);

    const styleAnimated = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }, { rotate: `${rotate.value}rad` }],
            borderRadius: opacity.value * SIZE / 2
        }
    }, [])

    React.useEffect(() => {
        opacity.value = withRepeat(withSpring(0.5), -1, true);
        scale.value = withRepeat(withSpring(1), -1, true);
        rotate.value = withRepeat(withSpring(Math.PI / 4), -1, true);
    }, []);

    /* const position = React.useRef(new Animated.Value(25)).current;

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
    }, []); */
    {/* <Animated.View
            style={{
                height: "100%",
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ translateY: position }]
            }}
        >
            <Entypo name="camera" size={40} color={COLORS.white} />
        </Animated.View> */}

    return (


        <Animated.View
            style={[{
                height: SIZE,
                width: SIZE,
                backgroundColor: "#45d279",
                justifyContent: "center",
                alignItems: "center",
            },
                styleAnimated
            ]}
        >
            <Entypo name="camera" size={20} color="white" />
        </Animated.View>
    )
}

export default Bounce;