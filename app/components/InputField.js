import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { FONTS, COLORS } from "../constants";
import Icon from "./Icon";
import { styleGlobal } from "../styles/stylesGlobal";

const InputField = ({
    name,
    placeHolder = "Nhập ...",
    title,
    required = false,
    iconName,
    iconType = 'Font',
    rules,
    control,
    styleTitle,
    styleIcon,
    styleTextInput,
    readOnly = false
}) => {
    return (
        <Controller
            control={control}
            rules={rules || {
                required: required ? 'Trường thông tin không được để trống!' : false
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                    <View style={styleGlobal.mb2}>
                        <View style={[styleGlobal.flexRow]}>
                            <Text style={[{ ...FONTS.h3_light }, styleGlobal.mr1, styleTitle]}>{title}</Text>
                            {
                                required ?
                                    <Text style={{ ...FONTS.h3_light, color: COLORS.error }}>*</Text>
                                    :
                                    null

                            }
                        </View>
                        <View style={styles.box_text}>
                            <Icon name={iconName} type={iconType} style={styleIcon} />
                            <TextInput
                                style={[styles.textInput, styleTextInput]}
                                placeholder={placeHolder}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                autoCapitalize={"none"}
                                editable={!readOnly}
                            />
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
};

const styles = StyleSheet.create({
    box_text: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.lightGray,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        marginTop: Platform.OS === "ios" ? 0 : -12,
    }
})

export default InputField;