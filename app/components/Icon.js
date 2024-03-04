import React from "react";
import { FontAwesome, Feather, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

const Icon = (props) => {
    const {
        name,
        size = 20,
        color = 'black',
        type = 'Font',
        style
    } = props;

    switch (type) {
        case 'Font':
            return <FontAwesome name={name} size={size} color={color} style={style} />;
        case 'Feat':
            return <Feather name={name} size={size} color={color} style={style} />;
        case 'Ant':
            return <AntDesign name={name} size={size} color={color} style={style} />;
        case 'Ion':
            return <Ionicons name={name} size={size} color={color} style={style} />;
        case 'Ma':
            return <MaterialIcons name={name} size={size} color={color} style={style} />;
        default:
            return <></>;
    }
}

export default Icon;