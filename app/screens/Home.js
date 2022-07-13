import React from "react";
import { ActivityIndicator, Linking, LogBox, ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, Modal, StatusBar, Platform } from "react-native";
import { COLORS, SIZES, FONTS, dummyData } from "../constants";
import { BlurView } from 'expo-blur';
import { useSelector } from "react-redux";
import { VideoVertical, NewsVertical, AnimalVertical, Bounce, Alert, showError, showSuccess } from "../components";
// Camera
import Camera from "../camera/Camera";
import Library from "../camera/Library";
import { upLoad } from "../api/imageAPI";
import { postHistory } from "../api/userAPI";
import { getByID } from "../api/imageAPI";
import { FlatList } from "react-native-gesture-handler";


LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const Home = ({ navigation }) => {
    const userData = useSelector((state) => state.auth.userData);
    const [showChooseCamera, setShowChooseCamrera] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [openModal, setOpenModal] = React.useState({
        status: false,
        title: "",
        number: 0,
        yes: null
    });

    const closeModal = () => {
        setOpenModal({
            status: false,
            title: "",
            number: 0,
            yes: null
        });
    }

    // Data

    const data = dummyData.animals.sort(() => Math.random() - 0.5);

    const getInfo = async (id) => {
        let res = await getByID(id);

        if (res.status == "SUCCESS") {
            navigation.navigate("ShowInfo", {
                data: res.data
            });
        }
        else {
            showError(res.message);
        }


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

    //Camera
    const handleCamera = async () => {
        let img = await Camera();
        if (img) {
            setLoading(true);
            let response = await upLoad(img);
            if (response.status == "FAILED") {
                console.log(response.message);
                setOpenModal({
                    status: true,
                    title: response.message,
                    number: 1
                });
            }
            else {
                const data = response.data;
                if (Object.keys(userData).length !== 0) {
                    const res = await postHistory(userData.id, data.id);
                    if (res.status == "SUCCESS") {
                        showSuccess(res.message);
                    }
                    else if (res.status == "FAILED") {
                        showError(res.message);
                    }
                }

                navigation.navigate('ShowInfo', {
                    data
                });
            }
        }
        setLoading(false);
    }

    //Library
    const handleLibrary = async () => {
        let img = await Library();
        if (img) {
            setLoading(true);
            let response = await upLoad(img);
            //const fileBuffer = Buffer.from(img.base64, 'base64');
            if (response.status == "FAILED") {
                showError(response.message);
            }
            else {
                const data = response.data;
                if (Object.keys(userData).length !== 0) {
                    const res = await postHistory(userData.id, data.id);
                    if (res.status == "SUCCESS") {
                        showSuccess(res.message);
                    }
                    else if (res.status == "FAILED") {
                        showError(res.message);
                    }
                }

                navigation.navigate('ShowInfo', {
                    data
                })
            }
        }
        setLoading(false);
    }

    // Render

    function renderHeader() {
        const avatar = userData?.avatar;
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
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Home</Text>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={() => setShowChooseCamrera(true)}
                    >
                        <Bounce />
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showChooseCamera}
                >
                    <BlurView
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        intensity={80}
                        tint="dark"
                    >
                        {/* button to close modal */}
                        <TouchableOpacity
                            style={styles.absolute}
                            onPress={() => setShowChooseCamrera(false)}
                        >

                        </TouchableOpacity>

                        {/* Content */}
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '85%',
                                backgroundColor: COLORS.lightGray2,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: COLORS.lightGray2,
                                    paddingBottom: SIZES.padding,
                                    height: 90,
                                    width: '100%',
                                    alignItems: 'center',
                                    borderTopLeftRadius: SIZES.radius,
                                    borderTopRightRadius: SIZES.radius,
                                }}
                            >
                                <Text style={{ ...FONTS.body1, padding: SIZES.base }}>Chọn 1 tấm ảnh</Text>
                            </View>
                            {/* Camera */}
                            <TouchableOpacity
                                style={{
                                    height: 70,
                                    width: '91%',
                                    backgroundColor: COLORS.white,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: SIZES.radius * 2,
                                    marginBottom: SIZES.base,
                                }}
                                onPress={() => handleCamera()}
                            >
                                <Text style={{ ...FONTS.h2_light, color: COLORS.lightGray }}>Dùng camera</Text>
                            </TouchableOpacity>

                            {/* Library */}
                            <TouchableOpacity
                                style={{
                                    height: 70,
                                    width: '91%',
                                    backgroundColor: COLORS.white,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: SIZES.radius * 2,
                                    marginBottom: SIZES.padding,
                                }}

                                onPress={() => handleLibrary()}
                            >
                                <Text style={{ ...FONTS.h2_light, color: COLORS.lightGray }}>Dùng thư viện ảnh</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height: 70,
                                    width: '91%',
                                    backgroundColor: COLORS.primary,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: SIZES.padding * 2,
                                    borderRadius: SIZES.radius
                                }}

                                onPress={() => setShowChooseCamrera(false)}
                            >

                                {
                                    isLoading ? <ActivityIndicator size="large" color={COLORS.white} /> :
                                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Cancel</Text>
                                }
                            </TouchableOpacity>
                        </View>

                    </BlurView>
                </Modal>
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
                    data={data}
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
                            onPress={() => getInfo(item.id)}
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

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 60 + SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
                showsVerticalScrollIndicator={false}
            >
                {renderImage()}
                {renderVideo()}
                {renderNews()}
            </ScrollView>
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