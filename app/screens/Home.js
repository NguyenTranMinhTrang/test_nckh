import React, { useEffect } from "react";
import { ActivityIndicator, NativeModules, Linking, LogBox, ScrollView, View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, Modal, StatusBar, Platform } from "react-native";
import { COLORS, SIZES, FONTS, dummyData } from "../constants";
import { BlurView } from 'expo-blur';
import { useSelector } from "react-redux";
import { VideoVertical, NewsVertical, AnimalVertical, Bounce, Alert, showError, showSuccess } from "../components";
import { AnimalInfo } from '../database/db'

// Camera
import Camera from "../camera/Camera";
import Library from "../camera/Library";
import { postHistory } from "../api/userAPI";
import { FlatList } from "react-native-gesture-handler";
import { getNews } from '../api/imageAPI'
import * as cheerio from "cheerio";


const Home = ({ navigation }) => {

    const userData = useSelector((state) => state.auth.userData);
    const tflite = useSelector((state) => state.model.tflite);
    const [showChooseCamera, setShowChooseCamrera] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [openModal, setOpenModal] = React.useState({
        status: false,
        title: "",
        number: 0,
        yes: null
    });

    const [news, setNews] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            await getNewsFromAPI()
        })();
    }, []);

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
        const data = AnimalInfo[id - 1]

        if (data) {
            navigation.navigate("ShowInfo", {
                data
            });
        }
        else {
            showError("Xảy ra lỗi khi tìm kiếm thông tin con vật");
        }


    }

    const requestOpenLink = async (url) => {
        closeModal();
        await Linking.openURL(url);
    }

    const openLink = (url) => {
        setOpenModal({
            status: true,
            number: 2,
            title: "Bạn có muốn mở video / tin tức này không ?",
            yes: () => requestOpenLink(url)
        });
    }

    const getNewsFromAPI = async () => {
        let data = await getNews()
        const $ = cheerio.load(data)
        const article = []
        $('.item-news.item-news-common ', data).each((index, element) => {
            const title = $(element).find('h3.title-news > a').text().trim()
            const url = $(element).find('h3.title-news > a').attr('href')
            const source = $(element).find('img').attr('data-src')
            const description = $(element).find('p.description > a').text().trim()
            if (title && url && source) {
                description ?
                    article.push({
                        id: index,
                        title: title,
                        link: url,
                        image: source,
                        description: description
                    }) :
                    article.push({
                        id: index,
                        title: title,
                        link: url,
                        image: source,
                    })
            }
        })
        if (article) {
            setNews(article)
        }
    }

    //Camera
    const handleCamera = async () => {
        setLoading(true);
        let img = await Camera();
        let imagePath = Platform.OS === 'android' ? img.uri : img.uri.replace('file://', '')
        if (img) {
            tflite.runModelOnImage({
                path: imagePath,  // required
                imageMean: 0, // defaults to 127.5
                imageStd: 1,  // defaults to 127.5
                numResults: 3,    // defaults to 5
                threshold: 0.6   // defaults to 0.1
            },
                async (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(res)
                        if (res.length !== 0) {
                            //Get data from database
                            if (res[0].index === 30) {
                                setOpenModal({
                                    status: true,
                                    title: "Dự đoán không thành công",
                                    number: 1
                                });
                            }
                            else {
                                const data = AnimalInfo[res[0].index]
                                //Check if user logged in
                                if (Object.keys(userData).length !== 0) {
                                    const res = await postHistory(userData.id, data.id);
                                    if (res.status == "SUCCESS") {
                                        showSuccess(res.message);
                                    }
                                    else if (res.status == "FAILED") {
                                        showError(res.message);
                                    }
                                }

                                setShowChooseCamrera(false);
                                navigation.navigate('ShowInfo', {
                                    data
                                })
                            }
                        }
                        else {
                            setOpenModal({
                                status: true,
                                title: "Dự đoán không thành công",
                                number: 1
                            });
                        }
                    }
                });
        }
        setLoading(false);
    }

    //Library
    const handleLibrary = async () => {
        setLoading(true);
        let img = await Library();
        let imagePath = Platform.OS === 'android' ? img.uri : img.uri.replace('file://', '')
        if (img) {
            tflite.runModelOnImage({
                path: imagePath,  // required
                imageMean: 0, // defaults to 127.5
                imageStd: 1,  // defaults to 127.5
                numResults: 3,    // defaults to 5
                threshold: 0.5   // defaults to 0.1
            },
                async (err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(res)
                        if (res.length !== 0) {
                            //Get data from database
                            if (res[0].index === 30) {
                                setOpenModal({
                                    status: true,
                                    title: "Dự đoán không thành công",
                                    number: 1
                                });
                            }
                            else {
                                const data = AnimalInfo[res[0].index]
                                //Check if user logged in
                                if (Object.keys(userData).length !== 0) {
                                    const res = await postHistory(userData.id, data.id);
                                    if (res.status == "SUCCESS") {
                                        showSuccess(res.message);
                                    }
                                    else if (res.status == "FAILED") {
                                        showError(res.message);
                                    }
                                }

                                setShowChooseCamrera(false);
                                navigation.navigate('ShowInfo', {
                                    data
                                })
                            }
                        }
                        else {
                            setOpenModal({
                                status: true,
                                title: "Dự đoán không thành công",
                                number: 1
                            });
                        }
                    }
                });
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
                    statusBarTranslucent={true}
                >
                    <BlurView
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
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
                                onPress={handleCamera}
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

                                onPress={handleLibrary}
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
                                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Hủy</Text>
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
            <ScrollView
                horizontal={true}
                scrollEnabled={false}
            >
                {
                    news ?
                        <View>
                            <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>Tin Tức</Text>
                            <FlatList
                                data={news}
                                showsVerticalScrollIndicator={false}
                                listKey="News"
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
                        </View> : null
                }
            </ScrollView>
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