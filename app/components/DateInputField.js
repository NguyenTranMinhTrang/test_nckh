import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styleGlobal } from "../styles/stylesGlobal";
import { FONTS, COLORS } from "../constants";
import Icon from "./Icon";
import DatePickerModal from "./DatePickerModal";
import { Controller } from "react-hook-form";
import { format } from "date-fns";

const DateInputField = (props) => {
    const {
        name,
        title,
        required = false,
        placeHolder = "Nhập ...",
        rules,
        control
    } = props;

    const refPicker = useRef(null);

    const onOpen = () => {
        refPicker?.current?.onOpen();
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules || {
                required: required ? 'Field can not be empty!' : false
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                    <View style={[styleGlobal.mb2]}>
                        <View style={[styleGlobal.flexRow]}>
                            <Text style={[{ ...FONTS.h3_light }, styleGlobal.mr1]}>{title}</Text>
                            {
                                required ?
                                    <Text style={{ ...FONTS.h3_light, color: COLORS.error }}>*</Text>
                                    :
                                    null

                            }
                        </View>
                        <TouchableOpacity
                            style={[
                                styleGlobal.flexRow,
                                styleGlobal.alignCenter,
                                styleGlobal.radius,
                                styleGlobal.mv1,
                                {
                                    height: 30,
                                    borderBottomWidth: 1,
                                    borderBottomColor: COLORS.lightGray,
                                }
                            ]}
                            onPress={onOpen}>
                            <Icon
                                name="calendar"
                                type="Ion"
                            />
                            <View style={[styleGlobal.full, styleGlobal.ml1, { height: '100%', justifyContent: 'flex-end', paddingBottom: 5 }]}>
                                {
                                    value ?
                                        <Text>
                                            {format(value, 'dd-MM-yyyy')}
                                        </Text>
                                        :
                                        <Text style={{ color: COLORS.lightGray3, fontSize: 14 }}>{placeHolder}</Text>
                                }
                            </View>
                        </TouchableOpacity>
                        {
                            error ?
                                <Text style={{ ...FONTS.h4, color: COLORS.error }}>{error?.message || ''}</Text>
                                :
                                null
                        }
                        <DatePickerModal
                            ref={refPicker}
                            onChange={onChange}
                        />
                    </View>
                )
            }}
        />
    )
}

export default DateInputField;