import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Modal,
    StatusBar,
    Platform,
    Image,
    ActivityIndicator
} from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import actions from "../redux/actions";
import { BlurView } from "expo-blur";
import Camera from "../camera/Camera";
import Library from "../camera/Library";
import { uploadProfileImage } from "../api/userAPI"
import { showError, Alert, showSuccess } from "../components"


const User = ({ navigation }) => {
    const userData = useSelector((state) => state.auth.userData);
    const [showChooseCamera, setShowChooseCamrera] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    const Onlogout = () => {
        setOpenModal(true);
    }

    const logout = () => {
        actions.logout();
        showSuccess("Đăng xuất thành công !");
        navigation.navigate("Start");
    }

    const takeAvatar = () => {
        setShowChooseCamrera(true);
    }

    const handleCamera = async () => {
        let img = await Camera();
        if (img) {
            setLoading(true);
            let response = await uploadProfileImage(img, userData.token)
            if (response.status == "SUCCESS") {
                const oldUserData = { ...userData };
                oldUserData.avatar = img.uri;
                actions.saveUserData(oldUserData);
            }
            else {
                showError(response.message);
            }
            setShowChooseCamrera(false);
        }
        setLoading(false);
    }

    const handleLibrary = async () => {
        let img = await Library();
        if (img) {
            setLoading(true);
            let response = await uploadProfileImage(img, userData.token);
            if (response.status == "SUCCESS") {
                const oldUserData = { ...userData };
                oldUserData.avatar = img.uri;
                actions.saveUserData(oldUserData);
            }
            else {
                showError(response.message);
            }
            setShowChooseCamrera(false);
        }
        setLoading(false);
    }

    // render
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
                }}
            >
                {/* Modal */}
                <Alert
                    openModal={openModal}
                    number={2}
                    title={"Bạn có chắc muốn đăng xuất ra khỏi thiết bị này ?"}
                    yes={logout}
                    onPress={() => setOpenModal(false)}
                />

                {/* Render */}
                <AntDesign
                    name="arrowleft"
                    size={50}
                    color={COLORS.primary}
                    style={{ paddingLeft: SIZES.base }}
                    onPress={() => navigation.navigate('Home')}
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
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Cá Nhân</Text>
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
                                    isLoading ?
                                        <ActivityIndicator size="large" color={COLORS.white} />
                                        :
                                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Hủy</Text>
                                }
                            </TouchableOpacity>
                        </View>

                    </BlurView>
                </Modal>
            </View>
        )
    }

    function renderImage() {
        return (
            <View
                style={{
                    width: '100%',
                    marginTop: SIZES.base,
                    height: SIZES.height * 0.3,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <View
                    style={{
                        padding: SIZES.padding,
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: 150,
                            backgroundColor: COLORS.white,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >
                        {
                            userData.avatar ?
                                <Image
                                    source={{ uri: userData.avatar }}
                                    resizeMode="cover"
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 150
                                    }}

                                />
                                :
                                <FontAwesome name="user" size={120} color={COLORS.lightGray2} />

                        }
                    </View>
                    <TouchableOpacity
                        style={{
                            height: 60,
                            width: 60,
                            backgroundColor: COLORS.primary,
                            borderRadius: 60,
                            position: 'absolute',
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}

                        onPress={() => takeAvatar()}
                    >
                        <Entypo name="camera" size={35} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderInfo() {
        return (
            <View
                style={{
                    width: '100%',
                    marginTop: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        width: '90%'
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            borderRadius: SIZES.radius,
                            flexDirection: 'row',
                            backgroundColor: COLORS.tabbar
                        }}
                    >
                        <View
                            style={{
                                flex: 2,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <FontAwesome name="user" size={40} color={COLORS.primary} />
                        </View>
                        <View
                            style={{
                                flex: 8
                            }}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white, padding: 5 }}>Email</Text>
                            <Text
                                style={{
                                    ...FONTS.h3_light,
                                    color: COLORS.white,
                                    padding: 5,
                                }}
                            >
                                {userData.email}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={{
                            width: '100%',
                            borderRadius: SIZES.radius,
                            flexDirection: 'row',
                            backgroundColor: COLORS.tabbar,
                            marginVertical: 10
                        }}

                        onPress={() => navigation.navigate('ChangePassword', { userData })}
                    >
                        <View
                            style={{
                                flex: 0.2,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <FontAwesome name="lock" size={40} color={COLORS.primary} />
                        </View>
                        <View
                            style={{
                                flex: 0.8
                            }}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white, paddingVertical: 25 }}>Đổi Mật Khẩu</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: '100%',
                            borderRadius: SIZES.radius,
                            flexDirection: 'row',
                            backgroundColor: COLORS.tabbar,
                        }}

                        onPress={Onlogout}
                    >
                        <View
                            style={{
                                flex: 0.2,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Entypo name="log-out" size={40} color={COLORS.primary} />
                        </View>
                        <View
                            style={{
                                flex: 0.7
                            }}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white, paddingVertical: 25 }}>Đăng Xuất</Text>

                        </View>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderImage()}
            {renderInfo()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})

export default User;