import React, { forwardRef, useImperativeHandle } from "react";
import { Modal, Pressable, View } from "react-native";
import { useImmer } from "use-immer";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { COLORS, SIZES } from "../constants";
import { styleGlobal } from "../styles/stylesGlobal";

const DatePickerModal = forwardRef((props, ref) => {
    const { onChange } = props;
    const [state, setState] = useImmer({
        open: false,
        date: new Date()
    })

    const onOpen = () => {
        setState(draft => {
            draft.open = true;
        })
    }

    const onClose = () => {
        setState(draft => {
            draft.open = false;
        })
    }

    const onChangeDate = (event, date) => {
        console.log('onDateChange: ', date);
        setState(draft => {
            draft.date = date;
            draft.open = false;
        })
        onChange?.(date);
    }

    useImperativeHandle(ref, () => ({
        onOpen,
        onClose
    }))

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={state.open}>
            <BlurView
                style={{ flex: 1 }}
                intensity={30}
                tint="dark"
            >
                <Pressable
                    style={[styleGlobal.full, { justifyContent: 'flex-end' }]}
                    onPress={onClose}>
                    <View style={[
                        styleGlobal.center,
                        styleGlobal.p1,
                        {
                            backgroundColor: COLORS.white,
                            height: 0.4 * SIZES.height,
                            borderTopRightRadius: SIZES.base,
                            borderTopLeftRadius: SIZES.base,
                        }
                    ]}>
                        <RNDateTimePicker
                            style={{ flex: 1, width: '100%' }}
                            mode="date"
                            value={state.date}
                            onChange={onChangeDate}
                            display="inline"
                        />
                    </View>
                </Pressable>
            </BlurView>
        </Modal>

    )
})

export default DatePickerModal;