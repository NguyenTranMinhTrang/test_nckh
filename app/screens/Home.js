import React, { useEffect, useRef, useState } from "react";
import { Linking, LogBox, ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, StatusBar, Platform, FlatList } from "react-native";
import { COLORS, SIZES, FONTS, dummyData } from "../constants";
import { useSelector } from "react-redux";
import { VideoVertical, NewsVertical, AnimalVertical, Bounce, Alert, showError } from "../components";
import { AnimalInfo } from '../database/db'
// Camera
import axiosClient from "../api/axiosClient";
import endpoint from "../api/endpoint";
import ButtonReportFloat from "../components/ButtonReportFloat";
import Loading from '../components/Loading';
import ModalImagePicker from "../components/ModalImagePicker";
import useRequest from '../hook/useRequest';
import { useImmer } from "use-immer";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const Home = ({ navigation, tflite }) => {
    const userData = useSelector((state) => state.auth.userData);
    const axiosPrivate = useRequest();
    const [state, setState] = useImmer({
        loading: true,
    })
    const [openModal, setOpenModal] = React.useState({
        status: false,
        title: "",
        number: 0,
        yes: null
    });

    const refLoading = useRef(null);
    const refPicker = useRef(null);

    const closeModal = () => {
        setOpenModal({
            status: false,
            title: "",
            number: 0,
            yes: null
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let api = userData ? endpoint.GET_ANIMAL_AFTER_LOGIN : endpoint.GET_ANIMAL;
        console.log('api: ', api);
        const formData = new FormData();
        formData.append('animalRedListId', '');
        formData.append('status', '');
        const response = await axiosPrivate.post(api, formData);
        if (response?.resultCode === 0) {
            setState(draft => {
                draft.loading = false;
                draft.data = response?.data?.sort(() => Math.random() - 0.5) || [];
            })
        } else {
            showError('Dữ liệu động vật lỗi!');
            setState(draft => {
                draft.loading = false;
                draft.data = [];
            })
        }
        console.log('response: ', response);
    }

    // Data

    const data = dummyData.animals.sort(() => Math.random() - 0.5);

    const getInfo = async (data) => {
        navigation.navigate("ShowInfo", {
            id: data.animal_red_list_id
        });
    }

    const requestOpenLink = async (url) => {
        closeModal();
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
        else {
            setOpenModal({
                status: true,
                title: `Hệ thống không thể mở được url này : ${url}`,
                number: 1
            });
        }
    }

    const openLink = (url) => {
        setOpenModal({
            status: true,
            number: 2,
            title: "Bạn có muốn mở video / tin tức này không ?",
            yes: () => requestOpenLink(url)
        });
    }

    const onPredictImage = async (image) => {
        const formData = new FormData();
        let imagePath = Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '')
        formData.append('image', {
            name: new Date() + '_profile',
            uri: imagePath,
            type: 'image/jpg',
        });
        let response;
        if (userData) {
            response = await axiosPrivate.post(endpoint.PREDICT_AFTERLOGIN, formData);
        } else {
            response = await axiosPrivate.post(endpoint.PREDICT_ANIMAL, formData);
        }
        return response;
    }

    const onChangeImage = async (img) => {
        if (img) {
            refPicker?.current?.onClose();
            setTimeout(async () => {
                refLoading?.current?.onOpen();
                const response = await onPredictImage(img);
                refLoading?.current?.onClose();
                if (response?.resultCode == 0) {
                    if (response?.data) {
                        navigation.navigate('ShowInfo', {
                            id: response?.data?.animal_red_list_id
                        })
                    } else {
                        setOpenModal({
                            status: true,
                            title: "Dự đoán ảnh không thành công !",
                            number: 1
                        });
                    }
                } else {
                    setOpenModal({
                        status: true,
                        title: "Dự đoán ảnh không thành công !",
                        number: 1
                    });
                }
            }, 200);
        }
    }

    const onOpenPicker = () => {
        refPicker?.current?.onOpen();
    }

    // Render
    function renderHeader() {
        const avatar = userData?.avt;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: avatar ? "space-between" : "space-around",
                    paddingHorizontal: SIZES.padding,
                    marginBottom: SIZES.padding
                }}
            >

                {
                    avatar ?
                        <>
                            <View
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 60,
                                    backgroundColor: "white"
                                }}
                            >
                                <Image
                                    source={{ uri: avatar }}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 60
                                    }}
                                />

                            </View>

                            <View
                                style={{
                                    height: 15,
                                    width: 15,
                                    borderRadius: 15,
                                    backgroundColor: COLORS.primary,
                                    position: 'absolute',
                                    left: SIZES.padding + 40,
                                    bottom: 0
                                }}
                            ></View>
                        </>
                        :
                        <></>
                }

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
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Trang chủ</Text>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={onOpenPicker}>
                        <Bounce />
                    </TouchableOpacity>
                </View>
                <Alert
                    number={openModal.number}
                    title={openModal.title}
                    openModal={openModal.status}
                    onPress={closeModal}
                    yes={openModal.yes}
                />
            </View>
        )
    }

    function renderImage() {
        return (
            <View style={{ paddingVertical: Platform.OS === 'ios' ? SIZES.padding : SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>Động Vật Hoang Dã</Text>
                <FlatList
                    data={state.data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    listKey="Animals"
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => (
                        <AnimalVertical
                            item={item}
                            contentStyle={{
                                marginLeft: index == 0 ? 0 : SIZES.padding,
                                marginRight: index == data.length - 1 ? 0 : SIZES.padding
                            }}
                            onPress={getInfo}
                        />
                    )}
                />
            </View>
        )
    }

    const renderVideo = () => {
        return (
            <View style={{ paddingBottom: SIZES.padding }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>Video</Text>
                <FlatList
                    data={dummyData.video}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    listKey="Videos"
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => (
                        <VideoVertical
                            item={item}
                            contentStyle={{
                                marginLeft: index == 0 ? 0 : SIZES.padding,
                                marginRight: index == dummyData.video.length - 1 ? 0 : SIZES.padding
                            }}
                            onPress={() => openLink(item.link)}
                        />
                    )}
                />
            </View>
        )
    }

    const renderNews = () => {
        return (
            <View>
                <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>Tin Tức</Text>
                <FlatList
                    data={dummyData.news}
                    showsVerticalScrollIndicator={false}
                    listKey="News"
                    scrollEnabled={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => (
                        <NewsVertical
                            item={item}
                            contentStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index == 0 ? SIZES.radius : SIZES.padding
                            }}
                            onPress={() => openLink(item.link)}
                        />
                    )}
                />
            </View>
        )
    }

    const renderBody = () => {
        if (state.loading) {
            return (
                <Loading initalState={true} />
            )
        }

        return (
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 60 + SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
                showsVerticalScrollIndicator={false}>
                {renderImage()}
                {renderVideo()}
                {renderNews()}
            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderBody()}
            <ModalImagePicker ref={refPicker} onChange={onChangeImage} />
            <Loading ref={refLoading} />
            <ButtonReportFloat onPress={() => navigation.navigate('Report')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});

export default Home;