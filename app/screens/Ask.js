import React from "react";
import {
    View,
    Text,
} from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { Alert } from "../components";

const Ask = ({ navigation }) => {

    const [openModal, setOpenModal] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setOpenModal(true);
        });

        return unsubscribe;
    }, [navigation]);

    const yes = () => {
        setOpenModal(false);
        navigation.navigate("Login");
    }

    const no = () => {
        setOpenModal(false);
        navigation.navigate("Home");
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.black }}>
            <Alert
                number={2}
                title={`Bạn cần đăng nhập để sử dụng chức năng này. Bạn có muốn đăng nhập ?`}
                openModal={openModal}
                onPress={() => { }}
                yes={yes}
                no={no}
            />
        </View>
    )
}

export default Ask;