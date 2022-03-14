import React from "react";
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    Image
} from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';


const History = ({ navigation }) => {
    // Data

    const data = [
        {
            id: 1,
            name: "Tiger",
            image: images.tiger,
        },
        {
            id: 2,
            name: "Crocodile",
            image: images.crocodile,
        },
        {
            id: 3,
            name: "Turtle",
            image: images.turtle,
        },
        {
            id: 4,
            name: "Peafowl",
            image: images.peafowl,
        },
    ]
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    marginTop: SIZES.base
                }}
            >
                <AntDesign
                    name="arrowleft"
                    size={50}
                    color={COLORS.primary}
                    style={{ paddingLeft: SIZES.base }}
                    onPress={() => navigation.navigate('Home')}
                />
                <View
                    style={{
                        width: SIZES.width * 0.5,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius * 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        marginLeft: SIZES.padding * 2
                    }}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>History</Text>
                </View>
            </View>
        )
    }

    function renderHistory() {

        function renderItem({ item }) {
            return (
                <View
                    style={{
                        marginBottom: SIZES.padding,
                        height: SIZES.height * 0.25,
                        flexDirection: 'row',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#606d87',
                    }}
                >
                    <View
                        style={{
                            flex: 0.4,
                            padding: SIZES.base
                        }}
                    >
                        <Image
                            source={item.image}
                            resizeMode="cover"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: SIZES.radius,
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flex: 0.6,
                            paddingLeft: SIZES.padding,
                            paddingVertical: SIZES.base
                        }}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>{item.name}</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.white, marginTop: SIZES.base }}>Search at: 10:32 14/3/2022</Text>
                    </View>
                </View>
            )
        }

        return (
            <View
                style={{
                    marginTop: SIZES.padding * 2,
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Your Animal</Text>
                <View
                    style={{
                        marginVertical: SIZES.padding,
                        height: SIZES.height * 0.6
                    }}
                >
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderHistory()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },

})
export default History;