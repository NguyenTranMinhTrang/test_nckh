import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';

const Login = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        secureTextEntry: true,
    });

    function handleEmailChange(value) {
        setData({
            ...data,
            email: value
        });
    }

    function handlePasswordChange(value) {
        setData({
            ...data,
            password: value
        });
    }

    function updateSecureTextEntry() {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }


    function renderHeader() {
        return (
            <View style={{ flex: 1, paddingHorizontal: SIZES.padding, paddingBottom: 50, justifyContent: 'flex-end' }}>
                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Welcome!</Text>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    flex: 3,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    paddingVertical: 30
                }}
            >
                <Text style={{ ...FONTS.h3_light }}>Email</Text>
                <View style={styles.box_text}>
                    <FontAwesome name="user" size={20} color="black" />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        onChangeText={(value) => handleEmailChange(value)}
                    />
                </View>
                <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Password</Text>
                <View style={styles.box_text}>
                    <FontAwesome name="lock" size={20} color="black" />
                    <TextInput
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(value) => handlePasswordChange(value)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {
                            data.secureTextEntry ?
                                <Feather name="eye-off" size={20} color="black" />
                                :
                                <Feather name="eye" size={20} color="black" />
                        }
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 50,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: 50,
                            backgroundColor: COLORS.primary,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => navigation.navigate('Tabs')}
                    >
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: SIZES.padding
                    }}
                >
                    <Text
                        style={{ ...FONTS.h3_light }}
                    >
                        Don't have an acount ?
                    </Text>
                    <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={{ ...FONTS.h3 }}> Let's register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderFooter()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    box_text: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        marginTop: Platform.OS === "ios" ? 0 : -12,
    }
})

export default Login;