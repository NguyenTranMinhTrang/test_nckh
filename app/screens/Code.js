import React from "react";
import { View, Text, SafeAreaView, TextInput, Pressable, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { FontAwesome, Feather } from '@expo/vector-icons';
import { showError, showSuccess } from "../components/showErrorMess";
import { AntDesign } from '@expo/vector-icons';
import ResendTimer from "../components/ResendTimer";
import { resendPIN, verifyPIN } from "../api/userAPI"


const Code = ({ navigation, route }) => {
    const { data } = route.params
    const [code, setCode] = React.useState('');

    const isValid = () => {
        if (!code) {
            showError("Bạn chưa nhập mã pin !");
            return false;
        }
        else {
            return true;
        }
    }

    const handlePin = async (email, code) => {
        const checkValid = isValid();
        if (checkValid) {
            const res = await verifyPIN(email, code)
            if (res.status == "SUCCESS") {
                const data = res.data
                showSuccess(res.message)
                navigation.navigate("GetPassword", {
                    data
                });
            }
            else {
                showError(res.message)
            }
        }
    }

    function renderHeader() {
        return (
            <View style={{ flex: 1, paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: SIZES.padding,
                        top: 15,
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: 'rgba(255,255,255,0.5)'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Nhập Mã Pin</Text>
            </View>
        )
    }

    function renderContent() {
        return (
            <View
                style={{
                    flex: 3,
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }}
            >
                <Pressable
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: 30,
                    }}

                    onPress={Keyboard.dismiss}
                >
                    {/* Mã Pin  */}
                    <Text style={{ ...FONTS.h3_light, marginTop: 35 }}>Pin</Text>
                    <View
                        style={styles.box_text}
                    >
                        <FontAwesome name="lock" size={20} color="black" />
                        <TextInput
                            placeholder="Mã Pin ..."
                            value={code}
                            autoCapitalize="none"
                            style={styles.textInput}
                            keyboardType="number-pad"
                            onChangeText={(code) => setCode(code)}

                        />
                    </View>


                    {/* Button get password */}

                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: SIZES.padding,
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

                            onPress={() => handlePin(data.email, code)}
                        >
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Gửi</Text>
                        </TouchableOpacity>
                    </View>

                </Pressable>
            </View >
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
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

export default Code;