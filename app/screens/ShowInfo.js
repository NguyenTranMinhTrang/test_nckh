import React from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import {
    PinchGestureHandler,
    State
} from "react-native-gesture-handler";
import Animated, {
    Value,
    block,
    cond,
    eq,
    set,
    useCode,
} from "react-native-reanimated";

import {
    vec,
    onGestureEvent,
    timing,
    pinchActive,
    pinchBegan,
    transformOrigin,
    translate,
} from "react-native-redash";

const ShowInfo = ({ navigation, route }) => {
    const [data, setData] = React.useState(null);
    const state = new Value(State.UNDETERMINED);
    const scale = new Value(1);
    const focal = vec.createValue(0, 0);
    const origin = vec.createValue(0, 0);
    const translation = vec.createValue(0, 0);
    const adjustedFocal = vec.add(
        {
            x: - (SIZES.width) / 2,
            y: - (SIZES.height * 0.4) / 2,
        },
        focal
    );
    const zIndex = cond(eq(state, State.ACTIVE), 3, 0);

    React.useEffect(() => {
        let { data } = route.params;
        setData(data);
    })

    const handlePinch = onGestureEvent({
        state,
        scale,
        focalX: focal.x,
        focalY: focal.y
    });

    useCode(() => block([
        cond(eq(state, State.BEGAN), vec.set(origin, adjustedFocal)),
        cond(eq(state, State.ACTIVE), vec.set(translation, vec.minus(vec.sub(origin, adjustedFocal)))),
        cond(eq(state, State.END), [
            set(translation.x, timing({ from: translation.x, to: 0 })),
            set(translation.y, timing({ from: translation.y, to: 0 })),
            set(scale, timing({ from: scale, to: 1 }))
        ]),
    ]), [focal, origin, state]);

    function renderImage() {


        return (
            <View
                style={{
                    height: '40%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <PinchGestureHandler {...handlePinch}>
                    <Animated.View
                        style={{
                            height: '100%',
                            width: '100%',
                            zIndex
                        }}
                    >
                        <Animated.Image
                            source={{ uri: `${data.img}` }}
                            resizeMode='cover'
                            style={{
                                height: '100%',
                                width: '100%',
                                transform: [
                                    ...translate(translation),
                                    ...transformOrigin(origin, { scale })
                                ]
                            }}
                        />
                    </Animated.View>
                </PinchGestureHandler>


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