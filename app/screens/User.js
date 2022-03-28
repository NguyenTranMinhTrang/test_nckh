import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, TextInput, Alert } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import actions from "../redux/actions";

const User = ({ navigation }) => {
    const email = React.useRef();
    const password = React.useRef();
    const [isLoading, setLoading] = React.useState(false);

    const userData = useSelector((state) => state.auth.userData);
    console.log("user in profile screen : ", userData);

    const Onlogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure, yout want to logout from this device',
            [{ text: 'Yes', onPress: logout }, { text: 'No', }],
            { cancelable: true }
        )
    }

    const logout = () => {
        setLoading(true)
        setTimeout(() => {
            actions.logout()
            setLoading(false)
        }, 2000);
    }

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
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Profile</Text>
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
                        <FontAwesome name="user" size={120} color={COLORS.lightGray2} />
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
                                flex: 6.5
                            }}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white, padding: 5 }}>Email</Text>
                            <TextInput
                                defaultValue={userData.email}
                                ref={email}
                                style={{
                                    ...FONTS.h3_light,
                                    color: COLORS.white,
                                    padding: 5,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    email.current.focus();
                                }}
                            >
                                <FontAwesome
                                    name="edit"
                                    size={40}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{
                            width: '100%',
                            borderRadius: SIZES.radius,
                            flexDirection: 'row',
                            backgroundColor: COLORS.tabbar,
                            marginVertical: 10
                        }}
                    >
                        <View
                            style={{
                                flex: 2,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <FontAwesome name="lock" size={40} color={COLORS.primary} />
                        </View>
                        <View
                            style={{
                                flex: 6.5
                            }}
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white, padding: 5 }}>Password</Text>
                            <TextInput
                                defaultValue="123456"
                                ref={password}
                                style={{
                                    ...FONTS.h3_light,
                                    color: COLORS.white,
                                    padding: 5,
                                }}
                                secureTextEntry={true}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1.5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    password.current.focus();
                                }}
                            >
                                <FontAwesome
                                    name="edit"
                                    size={40}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

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
                            <Text style={{ ...FONTS.h3, color: COLORS.white, paddingVertical: 25 }}>Log Out</Text>

                        </View>
                        <View
                            style={{
                                flex: 0.1,
                            }}
                        >

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
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,

    },
})

export default User;