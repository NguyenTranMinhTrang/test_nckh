import { BlurView } from "expo-blur";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styleGlobal } from "../styles/stylesGlobal";
import { COLORS, FONTS } from "../constants";
import Library from "../camera/Library";
import { Camera } from "expo-camera";

const ModalImagePicker = forwardRef(({ onChange }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const onOpen = () => {
        setIsVisible(true);
    }

    const onClose = () => {
        setIsVisible(false);
    }

    useImperativeHandle(ref, () => ({
        onOpen,
        onClose
    }))

    const onOpenLibrary = async () => {
        let img = await Library();
        onClose();
        onChange(img);
    }

    const onOpenCamera = async () => {
        let img = await Camera();
        onClose();
        onChange(img);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}>
            <BlurView
                style={{ flex: 1 }}
                intensity={70}
                tint="dark">
                <SafeAreaView style={styleGlobal.full}>
                    <Pressable style={[styleGlobal.full, { justifyContent: 'flex-end' }]} onPress={onClose}>
                        <View style={[styleGlobal.ph2]}>
                            <TouchableOpacity
                                style={[
                                    styleGlobal.center,
                                    styleGlobal.mb1,
                                    styles.button
                                ]}
                                onPress={onOpenCamera}>
                                <Text style={{ ...FONTS.h2, color: COLORS.blue }}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styleGlobal.center,
                                    styleGlobal.mb2,
                                    styles.button
                                ]}
                                onPress={onOpenLibrary}>
                                <Text style={{ ...FONTS.h2, color: COLORS.blue }}>Thư viện</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styleGlobal.center,
                                    styleGlobal.mb2,
                                    styles.button
                                ]}
                                onPress={onClose}>
                                <Text style={{ ...FONTS.h2, color: COLORS.error }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </SafeAreaView>
            </BlurView>
        </Modal>
    )
})

const styles = StyleSheet.create({
    button: {
        height: 55,
        backgroundColor: COLORS.white,
        borderRadius: 12
    }
})

export default ModalImagePicker;