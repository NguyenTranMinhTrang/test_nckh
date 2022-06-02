import React from "react";
import { Linking, View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Image, Modal, StatusBar, Platform } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSelector } from "react-redux";
// Camera
import imageAPI from "../api/imageAPI";
import { postHistory } from "../api/userAPI"
import * as ImagePicker from 'expo-image-picker';
import { showError } from "../components/showErrorMess";

const Home = ({ navigation }) => {
    const userData = useSelector((state) => state.auth.userData);
    const [showChooseCamera, setShowChooseCamrera] = React.useState(false);

    // Data

    const data = [
        {
            id: 1,
            name: "Tiger",
            image: images.tiger,
        },
        {
            id: 2,
            name: "Crocodile",
            image: images.crocodile,
        },
        {
            id: 3,
            name: "Turtle",
            image: images.turtle,
        },
        {
            id: 4,
            name: "Peafowl",
            image: images.peafowl,
        },
        {
            id: 5,
            name: "Elephant",
            image: images.elephant,
        },
        {
            id: 6,
            name: "Eagle",
            image: images.eagle,
        },
        {
            id: 7,
            name: "Fox",
            image: images.fox,
        },
        {
            id: 8,
            name: "Lizard",
            image: images.lizard,
        },
        {
            id: 9,
            name: "Monkey",
            image: images.monkey,
        }
    ];
    // Camera 

    const Camera = async (cb) => {
        const AskForPermission = async () => {
            const result = await ImagePicker.requestCameraPermissionsAsync();
            if (result.granted === false) {
                alert('no permissions to access camera!', [{ text: 'ok' }]);
                return false;
            }

            return true;
        }
        const hasPermission = await AskForPermission();
        if (!hasPermission) {
            return false;
        }
        else {
            let img = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [3, 3],
                quality: 1,
                base64: true,
            })

            if (!img.cancelled) {
                const response = await cb(img);

                if (response.status == 0) {
                    showError(response.error);
                }
                else {
                    const data = response.data;
                    await postHistory(userData.id, data.id)

                    navigation.navigate('ShowInfo', {
                        data
                    })
                }

                return true;
            }

            return false;
        }
    }
    // Library
    const Library = async (cb) => {
        const AskForPermission = async () => {
            const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (result.granted === false) {
                alert('no permissions to access media library! Please set the permission in your device.', [{ text: 'ok' }]);
                return false;
            }
            return true;
        }
        const hasPermission = await AskForPermission();
        if (!hasPermission) {
            return false;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });


        if (!result.cancelled) {
            const response = await cb(result);

            if (response.status == 0) {
                showError(response.error);
            }
            else {
                const data = response.data;
                await postHistory(userData.id, data.id)

                navigation.navigate('ShowInfo', {
                    data
                })
            }

            return true;
        }

        return false;
    };

    const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        }
        else {
            showError("We can't open this url!");
        }
    }


    // Render

    function renderHeader() {
        const avatar = userData?.avatar;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: avatar ? "space-between" : "center",
                    marginTop: SIZES.base,
                    paddingHorizontal: SIZES.padding
                }}
            >
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
                                    right: SIZES.padding,
                                    bottom: 0
                                }}
                            ></View>
                        </>
                        :
                        <></>
                }
            </View>
        )
    }

    function renderCamera() {
        return (
            <View
                style={{
                    width: SIZES.width,
                    paddingHorizontal: SIZES.base * 2,
                    paddingTop: SIZES.padding * 2
                }}
            >
                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Discover</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{
                            flex: 0.75,
                        }}
                    >
                        <Text style={{ ...FONTS.h1, color: COLORS.white }}>Animal World</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>Take photo to recognise wild animals with our app!</Text>
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <TouchableOpacity
                            style={{
                                height: 70,
                                width: 70,
                                borderRadius: SIZES.radius * 2,
                                backgroundColor: COLORS.primary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}

                            onPress={() => setShowChooseCamrera(true)}
                        >
                            <Entypo name="camera" size={50} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
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
                                <Text style={{ ...FONTS.body1, padding: SIZES.base }}>Choose a photo</Text>
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
                                onPress={async () => {
                                    let isClosed = await Camera(imageAPI.upLoad);
                                    if (isClosed) {
                                        setShowChooseCamrera(false);
                                    }
                                }}
                            >
                                <Text style={{ ...FONTS.h2_light, color: COLORS.lightGray }}>Use Camera</Text>
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
                                onPress={async () => {
                                    let isClosed = await Library(imageAPI.upLoad);
                                    if (isClosed) {
                                        setShowChooseCamrera(false);
                                    }
                                }}
                            >
                                <Text style={{ ...FONTS.h2_light, color: COLORS.lightGray }}>Use Library</Text>
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
                                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </BlurView>
                </Modal>
            </View>
        )
    }

    function renderImage() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: SIZES.radius,
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}

                    onPress={() => openUrl(`https://en.wikipedia.org/wiki/${item.name}`)}
                >
                    <Image
                        source={item.image}
                        resizeMode='cover'
                        style={{
                            width: SIZES.width * 0.45,
                            height: SIZES.height * 0.35,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <Text style={{
                        position: 'absolute',
                        ...FONTS.h2,
                        color: COLORS.white,
                        bottom: SIZES.padding * 2
                    }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ paddingVertical: Platform.OS === 'ios' ? SIZES.padding : SIZES.padding * 2, paddingHorizontal: SIZES.padding }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Wild Animals</Text>
                <FlatList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: SIZES.padding }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderCamera()}
            {renderImage()}
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