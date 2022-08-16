import React from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import {
    PinchGestureHandler,
    GestureHandlerRootView
} from "react-native-gesture-handler";

import Animated, {
    useAnimatedStyle,
    useAnimatedGestureHandler,
    useSharedValue,
    withTiming
} from "react-native-reanimated";

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Easing']); // Ignore log notification by message

const ShowInfo = ({ navigation, route }) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        let { data } = route.params;
        setData(data);
    });

    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const pinchHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            scale.value = event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        },
        onEnd: () => {
            scale.value = withTiming(1);
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateX: - SIZES.width / 2 },
                { translateY: - (SIZES.height * 0.4) / 2 },
                { scale: scale.value },
                { translateX: - focalX.value },
                { translateY: - focalY.value },
                { translateX: SIZES.width / 2 },
                { translateY: (SIZES.height * 0.4) / 2 },
            ]
        }
    })

    function renderImage() {
        return (
            <View
                style={{
                    height: SIZES.height * 0.4,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <GestureHandlerRootView
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <PinchGestureHandler onGestureEvent={pinchHandler}>
                        <Animated.View
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <Animated.Image
                                source={data.img}
                                resizeMode='cover'
                                style={[{
                                    height: '100%',
                                    width: '100%',
                                }, animatedStyle]}
                            />
                        </Animated.View>
                    </PinchGestureHandler>
                </GestureHandlerRootView>


                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: SIZES.padding,
                        top: 30,
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: 'rgba(255,255,255,0.5)'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderInfo() {
        return (
            <ScrollView
                style={{
                    marginTop: -40,
                    backgroundColor: COLORS.black,
                    width: SIZES.width,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50
                }}
            >
                <View
                    style={{
                        padding: SIZES.padding,
                    }}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>{data.name}</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>{data.sciencename}</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.white, paddingTop: SIZES.base * 2 }}>Tình trạng bảo tồn</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, paddingTop: SIZES.base }}>{data.conservation}</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.white, paddingTop: SIZES.base * 2 }}>Mô tả</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, paddingTop: SIZES.base }}>{data.description}</Text>
                </View>
            </ScrollView>
        )
    }

    return (
        <>
            {data &&
                <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
                    {renderImage()}
                    {renderInfo()}
                </SafeAreaView>
            }
        </>
    )
}

export default ShowInfo;