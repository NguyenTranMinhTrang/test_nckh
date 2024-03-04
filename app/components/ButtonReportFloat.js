import React from "react";
import { TouchableOpacity } from "react-native";
import { styleGlobal } from "../styles/stylesGlobal";
import { COLORS, SIZES } from "../constants";
import Icon from "./Icon";

const ButtonReportFloat = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styleGlobal.center,
                {
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    backgroundColor: COLORS.error,
                    position: 'absolute',
                    bottom: SIZES.base * 3,
                    right: SIZES.base * 3,
                }
            ]}
            onPress={onPress}>
            <Icon
                name='addfile'
                type="Ant"
                size={30}
                color={COLORS.white}
            />
        </TouchableOpacity>
    )
}

export default ButtonReportFloat;