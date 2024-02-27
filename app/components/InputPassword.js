import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FONTS, COLORS } from "../constants";
import { styleGlobal } from "../styles/stylesGlobal";
import Icon from "./Icon";

const InputPassword = (props) => {
    const {
        name,
        placeHolder = "Nhập ...",
        title,
        required = false,
        iconName,
        iconType = 'Font',
        rules,
        control
    } = props;

    const [isVisible, setIsVisible] = useState(false);

    const onPress = () => {
        setIsVisible(!isVisible);
    }

    console.log('rules: ', rules);

    return (
        <Controller
            control={control}
            rules={rules || {
                required: required ? 'Field can not be empty!' : false
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                console.log('error: ', error);
                return (
                    <View style={styleGlobal.mb2}>
                        <View style={[styleGlobal.flexRow]}>
                            <Text style={[{ ...FONTS.h3_light }, styleGlobal.mr1]}>{title}</Text>
                            {
                                required ?
                                    <Text style={{ ...FONTS.h3_light, color: COLORS.error }}>*</Text>
                                    :
                                    null

                            }
                        </View>
                        <View style={styles.box_text}>
                            <Icon name={iconName} type={iconType} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={placeHolder}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                secureTextEntry={!isVisible}
                            />
                            <TouchableOpacity onPress={onPress}>
                                {
                                    isVisible ?
                                        <Icon type="Feat" name="eye" />
                                        :
                                        <Icon type="Feat" name="eye-off" />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            error ?
                                <Text style={{ ...FONTS.h4, marginTop: 5, color: COLORS.error }}>{error?.message || ''}</Text>
                                :
                                null
                        }
                    </View>
                )
            }}
            name={name}
        />
    )
}

const styles = StyleSheet.create({
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

export default InputPassword;