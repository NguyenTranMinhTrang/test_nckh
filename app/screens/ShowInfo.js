import React from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';



const ShowInfo = ({ navigation, route }) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        let { data } = route.params;
        setData(data);
    })

    function renderImage() {
        return (
            <View
                style={{
                    height: '40%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={{ uri: `${data.img}` }}
                    resizeMode='cover'
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: 7,
                        top: 15,
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: 'rgba(255,255,255,0.5)'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderInfo() {
        return (
            <ScrollView
                style={{
                    marginTop: -40,
                    backgroundColor: COLORS.black,
                    width: SIZES.width,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50
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
        <>
            {data &&
                <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
                    {renderImage()}
                    {renderInfo()}
                </SafeAreaView>
            }
        </>
    )
}

export default ShowInfo;