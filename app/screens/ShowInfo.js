import React from "react";
import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";


const ShowInfo = ({ route }) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        let { data } = route.params;
        setData(data);
    })

    function renderImage() {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={images.crocodile}
                    resizeMode='cover'
                    style={{
                        height: SIZES.height / 2,
                        width: SIZES.width,
                    }}
                />
            </View>
        )
    }

    function renderInfo() {
        return (
            <ScrollView
                style={{
                    position: 'absolute',
                    top: SIZES.height * 0.4,
                    backgroundColor: COLORS.black,
                    width: SIZES.width,
                    borderRadius: SIZES.radius,
                }}
            >
                <View
                    style={{
                        padding: SIZES.padding,
                    }}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>{data.name}</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>{data.sciencename}</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.white, paddingTop: SIZES.base * 2 }}>Tình trạng bảo tồn</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, paddingTop: SIZES.base }}>{data.conservation}</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.white, paddingTop: SIZES.base * 2 }}>Mô tả</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, paddingTop: SIZES.base }}>{data.description}</Text>

                </View>
            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            {renderImage()}
            {renderInfo()}
        </SafeAreaView>
    )
}

export default ShowInfo;