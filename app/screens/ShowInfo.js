import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
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
    transformOrigin,
    translate,
} from "react-native-redash";
import { useImmer } from "use-immer";
import { styleGlobal } from "../styles/stylesGlobal";
import Loading from "../components/Loading";
import endpoint from "../api/endpoint";
import { useSelector } from "react-redux";
import useRequest from "../hook/useRequest";
import { showError } from "../components";
import Carousel from "react-native-snap-carousel";

const ShowInfo = ({ navigation, route }) => {
    const userData = useSelector((state) => state.auth.userData);
    const axiosPrivate = useRequest();
    const [stateData, setState] = useImmer({
        loading: true
    })
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

    const handlePinch = onGestureEvent({
        state,
        scale,
        focalX: focal.x,
        focalY: focal.y
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let api = userData ? endpoint.GET_ANIMAL_AFTER_LOGIN : endpoint.GET_ANIMAL;
        const formData = new FormData();
        formData.append('animalRedListId', route.params.id);
        formData.append('status', '');
        const response = await axiosPrivate.post(api, formData);
        if (response?.resultCode === 0) {
            setState(draft => {
                draft.loading = false;
                draft.data = response?.data;
            })
        } else {
            showError('Không tải được dữ liệu động vật !');
            navigation.goBack();
        }
    }

    useCode(() => block([
        cond(eq(state, State.BEGAN), vec.set(origin, adjustedFocal)),
        cond(eq(state, State.ACTIVE), vec.set(translation, vec.minus(vec.sub(origin, adjustedFocal)))),
        cond(eq(state, State.END), [
            set(translation.x, timing({ from: translation.x, to: 0 })),
            set(translation.y, timing({ from: translation.y, to: 0 })),
            set(scale, timing({ from: scale, to: 1 }))
        ]),
    ]), [focal, origin, state]);

    const renderItem = ({ item, index }) => {
        return (
            <View style={[
                styleGlobal.center,
                { width: '100%', height: '100%' }
            ]}>
                <Image
                    source={{ uri: item?.image_local_path }}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </View>
        )
    }

    function renderImage() {
        const { data } = stateData;
        return (
            <View
                style={{
                    height: '40%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View
                    style={[{
                        height: '100%',
                        width: '100%'
                    }]}>
                    <View style={[styleGlobal.full]}>
                        <Carousel
                            data={data.images || []}
                            renderItem={renderItem}
                            sliderWidth={SIZES.width}
                            itemWidth={SIZES.width}
                            autoplay
                        />
                    </View>
                </View>

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
        const { data } = stateData;
        return (
            <ScrollView
                style={{
                    marginTop: -40,
                    backgroundColor: COLORS.black,
                    width: SIZES.width,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50
                }}>
                <View
                    style={{
                        padding: SIZES.padding,
                    }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>{data.vn_name}</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>{data.sc_name}</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.white, paddingTop: SIZES.base * 2 }}>Tình trạng bảo tồn</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, paddingTop: SIZES.base }}>{data.conservation_status}</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.white, paddingTop: SIZES.base * 2 }}>Mô tả</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, paddingTop: SIZES.base }}>{data.animal_infor}</Text>
                </View>
            </ScrollView>
        )
    }

    if (stateData.loading) {
        return (
            <View style={[styleGlobal.full, { backgroundColor: COLORS.black }]}>
                <Loading initalState={true} style={{ backgroundColor: 'transparent' }} />
            </View>
        )
    }

    return (
        <>
            {stateData?.data &&
                <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                    {renderImage()}
                    {renderInfo()}
                </View>
            }
        </>
    )
}

export default ShowInfo;