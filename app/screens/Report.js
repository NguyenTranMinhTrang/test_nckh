import React, { useEffect, useRef } from "react";
import { Alert, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styleGlobal } from "../styles/stylesGlobal";
import { COLORS, SIZES, FONTS } from "../constants";
import Icon from "../components/Icon";
import { Controller, useForm } from "react-hook-form";
import InputField from "../components/InputField";
import * as Location from 'expo-location';
import ModalImagePicker from "../components/ModalImagePicker";
import Loading from '../components/Loading';
import useRequest from "../hook/useRequest";
import endpoint from "../api/endpoint";

const Report = ({ navigation }) => {
    const refModal = useRef(null);
    const refLoading = useRef(null);
    const axiosPrivate = useRequest();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            title: "",
            description: "",
            lat: "",
            lng: "",
            image: "",
            location: ""
        },
    })

    useEffect(() => {
        getPermission();
    }, []);

    const getPermission = async () => {
        const response = await Location.requestForegroundPermissionsAsync();
        if (response?.status !== 'granted') {
            Alert.alert('Xin hãy cho phép truy cập vị trí hiện tại!')
            return;
        }
        const currentLocation = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = currentLocation.coords;
        const reverseToAddress = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        })
        const { district, city, country } = reverseToAddress[0];
        const address = `${district}, ${city}, ${country}`;
        setValue("location", address);
        setValue("lat", latitude);
        setValue("lng", longitude);
    }

    const onOpenPicker = () => {
        refModal?.current?.onOpen();
    }

    const onChange = (img) => {
        console.log('img: ', img);
        if (img) {
            let imagePath = Platform.OS === 'android' ? img.uri : img.uri.replace('file://', '')
            setValue("image", {
                name: new Date() + '_profile',
                uri: imagePath,
                type: 'image/jpg',
                url: img.assets[0].uri
            })
        }
    }

    const onSubmit = async (values) => {
        console.log('values: ', values);
        refLoading?.current?.onOpen();
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("lat", values.lat);
        formData.append("lng", values.lng);
        formData.append("image", values.image);

        const response = await axiosPrivate.post(endpoint.CREATE_REPORT, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        console.log('response: ', response);
    }

    const renderHeader = () => {
        return (
            <View style={[styleGlobal.flexRow, styleGlobal.center]}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: SIZES.padding,
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: 'rgba(255,255,255,0.5)'
                    }}
                    onPress={() => navigation.goBack()}>
                    <Icon
                        name="arrowleft"
                        type="Ant"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>

                <View
                    style={{
                        width: SIZES.width * 0.5,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius * 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                    }}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Report</Text>
                </View>
            </View>
        )
    }

    const renderGetImage = () => {
        return (
            <View style={[
                styleGlobal.mt2,
            ]}>
                <TouchableOpacity
                    style={[
                        styleGlobal.center,
                        styleGlobal.flexRow,
                        styleGlobal.alignCenter,
                        {
                            height: 50,
                            backgroundColor: COLORS.primary,
                            borderRadius: SIZES.radius
                        }
                    ]}
                    onPress={onOpenPicker}>
                    <Text style={[{ ...FONTS.h3, color: COLORS.white }, styleGlobal.mr1]}>Thêm ảnh</Text>
                    <Icon
                        name="camera"
                        type="Ion"
                        color={COLORS.white}
                        size={24}
                    />
                </TouchableOpacity>
                <Controller
                    name="image"
                    control={control}
                    render={({ field: { value } }) => {
                        console.log('value: ', value);
                        return (
                            <View>
                                {
                                    value?.url ?
                                        <View
                                            style={[
                                                styleGlobal.mt2,
                                                styleGlobal.center,
                                                {
                                                    height: 200,
                                                    borderRadius: 12,
                                                }
                                            ]}
                                        >
                                            <Image
                                                source={{ uri: value.url }}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 12
                                                }}
                                            />
                                        </View>
                                        :
                                        null
                                }
                            </View>

                        )
                    }}
                />
            </View>
        )
    }

    const renderBody = () => {
        return (
            <View style={[styleGlobal.full, { padding: 35 }]}>
                <ScrollView>
                    <InputField
                        control={control}
                        name={"location"}
                        iconName="location"
                        iconType="Ion"
                        title={"Vị trí hiện tại"}
                        readOnly
                        required
                        styleTitle={{
                            ...FONTS.h3,
                            color: COLORS.white
                        }}
                        styleIcon={{ color: COLORS.white }}
                        styleTextInput={{ color: COLORS.white, fontSize: 18 }}
                    />
                    <InputField
                        control={control}
                        name={"title"}
                        iconName="edit"
                        iconType="Ant"
                        title={"Tiêu đề"}
                        required
                        styleTitle={{
                            ...FONTS.h3,
                            color: COLORS.white
                        }}
                        styleIcon={{ color: COLORS.white }}
                        styleTextInput={{ color: COLORS.white, fontSize: 18 }}
                    />
                    <InputField
                        control={control}
                        name={"description"}
                        iconName="edit"
                        iconType="Ant"
                        title={"Mô tả"}
                        required
                        styleTitle={{
                            ...FONTS.h3,
                            color: COLORS.white
                        }}
                        styleIcon={{ color: COLORS.white }}
                        styleTextInput={{ color: COLORS.white, fontSize: 18 }}
                    />
                    {renderGetImage()}

                </ScrollView>
                <TouchableOpacity
                    style={[
                        styleGlobal.center,
                        styleGlobal.flexRow,
                        styleGlobal.alignCenter,
                        styleGlobal.mt2,
                        {
                            height: 50,
                            backgroundColor: COLORS.error,
                            borderRadius: SIZES.radius
                        }
                    ]}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={[{ ...FONTS.h3, color: COLORS.white }, styleGlobal.mr1]}>Gửi báo cáo</Text>
                    <Icon
                        name="report-problem"
                        type="Ma"
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={[styleGlobal.full, { backgroundColor: COLORS.black }]}>
            {renderHeader()}
            {renderBody()}
            <ModalImagePicker
                ref={refModal}
                onChange={onChange}
            />
            <Loading ref={refLoading} />
        </SafeAreaView>
    )
}

export default Report;