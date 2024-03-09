import React, { useRef } from "react";
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
import { COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import actions from "../redux/actions";
import { BlurView } from "expo-blur";
import Camera from "../camera/Camera";
import Library from "../camera/Library";
import { uploadProfileImage } from "../api/userAPI"
import { showError, Alert, showSuccess } from "../components"
import ModalImagePicker from '../components/ModalImagePicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/AppConstant";

const User = ({ navigation }) => {
    const userData = useSelector((state) => state.auth.userData);
    const [showChooseCamera, setShowChooseCamrera] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const refPicker = useRef(null);

    const Onlogout = () => {
        setOpenModal(true);
    }

    const logout = () => {
        actions.logout();
        AsyncStorage.removeItem(STORAGE_KEY.USER_DATA);
        showSuccess("Đăng xuất thành công !");
        navigation.navigate("Start");
    }

    const onChangeImage = async (img) => {
        if (img) {

        }
    }

    const onTakeAvatar = () => {
        refPicker?.current?.onOpen();
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

                        onPress={onTakeAvatar}>
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
                        onPress={() => navigation.navigate('ChangePassword', { userData })}>
                        <View
                            style={{
                                flex: 0.2,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
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
                        onPress={Onlogout}>
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
            <ModalImagePicker
                ref={refPicker}
                onChange={onChangeImage}
            />
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