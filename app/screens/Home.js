import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Image, Modal } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
// Camera
import imageAPI from "../api/imageAPI";
import * as ImagePicker from 'expo-image-picker';


const Home = ({ navigation }) => {
    const [showChooseCamera, setShowChooseCamre] = React.useState(false);
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
    ]
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
            return;
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
                const data = await cb(img);
                navigation.navigate('ShowInfo', {
                    data
                })
            }

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
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });


        if (!result.cancelled) {
            const data = await cb(result);
            navigation.navigate('ShowInfo', {
                data
            })
        }
    };


    // Render

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    marginTop: SIZES.base
                }}
            >
                <AntDesign
                    name="arrowleft"
                    size={50}
                    color={COLORS.primary}
                    style={{ paddingLeft: SIZES.base }}
                    onPress={() => navigation.popToTop()}
                />
                <View
                    style={{
                        width: SIZES.width * 0.5,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius * 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        marginLeft: SIZES.padding * 2
                    }}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Home</Text>
                </View>
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

                            onPress={() => setShowChooseCamre(true)}
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
                            onPress={() => setShowChooseCamre(false)}
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
                                onPress={() => Camera(imageAPI.upLoad)}
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
                                onPress={() => Library(imageAPI.upLoad)}
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

                                onPress={() => setShowChooseCamre(false)}
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
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: SIZES.radius,
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
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
                </View>
            )
        }

        return (
            <View style={{ padding: SIZES.padding }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Wild Animals</Text>
                <FlatList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: SIZES.padding, paddingBottom: SIZES.padding * 2 }}
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
        paddingTop: 20
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