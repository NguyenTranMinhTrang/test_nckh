import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import { Header } from "../components";
import InputField from "../components/InputField";
import Icon from "../components/Icon";
import EmptyView from "../components/EmptyView";
import ModalImagePicker from "../components/ModalImagePicker";

const Contribute = ({ navigation }) => {

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

    const refPicker = useRef(null);

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            name: "minhtrang",
            description: "123456",
            images: []
        },
    })

    const onOpenCamera = () => {
        refPicker?.current?.onOpen();
    }

    const onChangeImage = (images) => {
        console.log('images: ', images);
        if (images && images?.assets?.length > 0) {
            const currentValues = getValues()?.images || [];
            setValue('images', [...currentValues, ...(images?.assets || [])]);
        }
    }

    const renderHeader = () => {
        return (
            <Header title="Đóng góp !" navigation={navigation} />
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={keyboardVerticalOffset}
                style={{
                    flex: 3,
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }}>
                <Pressable
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: 30
                    }}
                    onPress={Keyboard.dismiss}>
                    <InputField
                        control={control}
                        name="name"
                        title="Tên"
                        iconName="user"
                        required={true}
                    />

                    <InputField
                        control={control}
                        name="description"
                        title="Mô tả"
                        iconName="edit"
                        iconType="Feat"
                        required={true}
                    />

                    <TouchableOpacity onPress={onOpenCamera} style={styles.buttonImage}>
                        <Icon type="Ant" name="plus" color={COLORS.white} />
                        <Text style={{ color: COLORS.white, fontSize: 17, marginLeft: 5 }}>Thêm ảnh</Text>
                    </TouchableOpacity>
                    <Controller
                        name="images"
                        control={control}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                            console.log('value: ', value);
                            if (!value || value.length === 0) {
                                return (
                                    <View style={{ minHeight: 200 }}>
                                        <EmptyView />
                                    </View>
                                )
                            }
                            return (
                                <View>

                                </View>
                            )
                        }}
                    />
                </Pressable>
            </KeyboardAvoidingView>
            <ModalImagePicker
                ref={refPicker}
                config={{
                    allowsEditing: false,
                    allowsMultipleSelection: true
                }}
                onChange={onChangeImage}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    buttonImage: {
        height: 45,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.padding,
        flexDirection: 'row'
    }
});

export default Contribute;