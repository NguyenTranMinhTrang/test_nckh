import React from "react";
import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";


const ShowInfo = () => {

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
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Cá Sấu Nước Mặn</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>Crocodylus porosus</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.white, paddingTop: SIZES.base * 2 }}>Tình trạng bảo tồn</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, paddingTop: SIZES.base }}>Ít quan tâm (LC)</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.white, paddingTop: SIZES.base * 2 }}>Mô tả</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, paddingTop: SIZES.base }}>Chúng có một cái đầu khá lớn đặc trưng bởi hai gờ nổi xuất phát từ mắt và kéo dài đến giữa mũi. Vảy loài này hình trái xoan. Cá sấu con có màu vàng nhạt, chúng mang những sọc, chấm trên thân và đuôi</Text>

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