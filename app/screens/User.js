import React, { useRef } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
    Image
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import actions from "../redux/actions";
import { showError, Alert, showSuccess } from "../components"
import ModalImagePicker from '../components/ModalImagePicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/AppConstant";
import Loading from "../components/Loading";
import useRequest from "../hook/useRequest";
import endpoint from "../api/endpoint";
import { saveUserData } from "../redux/actions/auth";

const User = ({ navigation }) => {
    const userData = useSelector((state) => state.auth.userData);
    const axiosPrivate = useRequest();
    const [openModal, setOpenModal] = React.useState(false);
    const refPicker = useRef(null);
    const refLoading = useRef(null);

    const onLogout = () => {
        setOpenModal(true);
    }

    const logout = async () => {
        setOpenModal(false);
        const formData = new FormData();
        const response = await axiosPrivate.post(endpoint.LOGOUT, formData);
        console.log('response: ', response);
        if (response?.resultCode === 0) {
            await AsyncStorage.removeItem(STORAGE_KEY.USER_DATA);
            actions.logout();
            showSuccess("Đăng xuất thành công !");
            navigation.navigate("Start");
        } else {
            showError('Thao tác thất bại! Vui lòng thử lại !')
        }

    }

    const onChangeImage = async (img) => {
        if (img) {
            refLoading?.current?.onOpen();
            const formData = new FormData();
            let imagePath = Platform.OS === 'android' ? img.uri : img.uri.replace('file://', '')
            formData.append('image', {
                name: new Date() + '_profile',
                uri: imagePath,
                type: 'image/jpg',
            })
            const response = await axiosPrivate.post(endpoint.UPLOAD_AVATAR, formData);
            if (response?.resultCode == 0) {
                const newUrl = response?.data?.img;
                const newUserData = {
                    ...userData,
                    avt: newUrl
                }
                saveUserData(newUserData);
                await AsyncStorage.setItem(STORAGE_KEY.USER_DATA, JSON.stringify(newUserData));
            } else {
                showError();
            }
            refLoading?.current?.onClose();
        }
    }

    const onTakeAvatar = () => {
        refPicker?.current?.onOpen();
    }

    const onEditProfile = () => {
        navigation.navigate('EditProfile');
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
                    }}>
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

                }}>
                <View
                    style={{
                        padding: SIZES.padding,
                        alignItems: 'center'
                    }}>
                    <View
                        style={{
                            height: 150,
                            width: 150,
                            borderRadius: 150,
                            backgroundColor: COLORS.white,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                        {
                            userData.avt ?
                                <Image
                                    source={{ uri: userData.avt }}
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
                }}>
                <View
                    style={{
                        width: '90%'
                    }}>
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            borderRadius: SIZES.radius,
                            flexDirection: 'row',
                            backgroundColor: COLORS.tabbar
                        }}
                        onPress={onEditProfile}>
                        <View
                            style={{
                                flex: 0.2,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <FontAwesome name="edit" size={35} color={COLORS.primary} />
                        </View>
                        <View
                            style={{
                                flex: 0.8
                            }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.white, paddingVertical: 25 }}>Thông tin cá nhân</Text>
                        </View>
                    </TouchableOpacity>

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
                        onPress={onLogout}>
                        <View
                            style={{
                                flex: 0.2,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Entypo name="log-out" size={35} color={COLORS.primary} />
                        </View>
                        <View
                            style={{
                                flex: 0.7
                            }}>
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
            <Loading ref={refLoading} />
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