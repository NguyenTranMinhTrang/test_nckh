import React from "react";
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    Image,
    Alert,
    StatusBar,
    Platform,
    ActivityIndicator
} from "react-native";
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { getHistory } from "../api/userAPI";
import { useFocusEffect } from "@react-navigation/native";


const History = ({ navigation }) => {
    const userData = useSelector((state) => state.auth.userData);
    const [data, setData] = React.useState([]);
    const [isLoad, setIsLoad] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            async function get_history(id) {
                try {
                    let res = await getHistory(id)
                    if (res.data) {
                        setData(res.data)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            get_history(userData.id);
        }, [])
    );

    const deleteHistory = () => {
        console.log("delete");
    }

    // render

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

        const handleLoadMore = () => {
            setIsLoad(true);
        }

        function renderItem({ item }) {
            return (
                <TouchableOpacity
                    style={{
                        marginBottom: SIZES.padding,
                        height: SIZES.height * 0.25,
                        flexDirection: 'row',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#606d87',
                    }}

                    onLongPress={() => Alert.alert(
                        "Confirm",
                        "Do you want to delele ?",
                        [{ text: 'Yes', onPress: deleteHistory }, { text: 'No', }],
                        { cancelable: true }
                    )}
                >
                    <View
                        style={{
                            flex: 0.4,
                            padding: SIZES.base
                        }}
                    >
                        <Image
                            source={{ uri: `${item.img}` }}
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
                        <Text style={{ ...FONTS.body3, color: COLORS.white, marginTop: SIZES.base }}>Search at: {item.time}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        function renderFooter() {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: SIZES.padding }}>
                    <TouchableOpacity
                        onPress={() => handleLoadMore()}
                    >
                        {
                            isLoad ?
                                <ActivityIndicator size="large" />
                                :
                                <Text style={{ ...FONTS.h3, color: COLORS.white }}>Load More ...</Text>

                        }
                    </TouchableOpacity>
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
                        marginTop: SIZES.padding,
                        height: Platform.OS === "android" ? SIZES.height * 0.7 : SIZES.height * 0.6,
                    }}
                >
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${item.animalID} - ${index}`}
                        renderItem={renderItem}
                        ListFooterComponent={renderFooter}
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

})
export default History;