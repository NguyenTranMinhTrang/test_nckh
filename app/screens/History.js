import React from "react";
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    Image,
    StatusBar,
    Platform,
} from "react-native";
import { deleteHistory } from "../api/userAPI";
import { COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { getHistory } from "../api/userAPI";
import { getByID } from "../api/imageAPI";
import { useFocusEffect } from "@react-navigation/native";
import { showError, showSuccess, Alert } from "../components";
import { useImmer } from "use-immer";
import Loading from "../components/Loading";
import { styleGlobal } from "../styles/stylesGlobal";
import useRequest from "../hook/useRequest";
import endpoint from "../api/endpoint";


const History = ({ navigation }) => {
    const userData = useSelector((state) => state.auth.userData);
    const axiosPrivate = useRequest();
    const [state, setState] = useImmer({
        loading: true,
        data: []
    })
    const [openModal, setOpenModal] = React.useState({
        status: false,
        yes: null
    });

    const getHistory = async () => {
        let res = await axiosPrivate.post(endpoint.GET_HISTORY);
        if (res?.resultCode === 0) {
            setState(draft => {
                draft.loading = false;
                draft.data = res?.data || [];
            })
        } else {
            showError();
        }
        console.log('res: ', res);
    }

    useFocusEffect(
        React.useCallback(() => {
            getHistory();
        }, [])
    );

    const delete_history = async (id, animalID, time) => {
        let res = await deleteHistory(id, animalID, time)
        if (res.status == "SUCCESS") {
            showSuccess(res.message)
        }
        else {
            showError(res.message)
        }
        //Reset history after deleted
        getHistory(id)
    }

    const showInfo = async (id) => {
        navigation.navigate('ShowInfo', {
            id
        })
    }

    const onLongPress = () => {
        setOpenModal({
            status: true,
            yes: async () => {
                await delete_history(userData.id, item.animalID, item.time);
                setOpenModal({
                    status: false,
                    yes: null
                });
            }
        })
    }

    // render
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
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
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Lịch Sử</Text>
                </View>
                <Alert
                    number={2}
                    title={"Bạn có chắc muốn xóa dòng lịch sử này ?"}
                    openModal={openModal.status}
                    yes={openModal.yes}
                    onPress={() => setOpenModal({ status: false, yes: null })}
                />
            </View>
        )
    }

    const renderItem = ({ item }) => {
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

                onLongPress={onLongPress}
                onPress={() => showInfo(item.animal_red_list_id)}>
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
                        paddingVertical: SIZES.base * 2
                    }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.vn_name}</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.white, marginTop: SIZES.base }}>Thời gian: {item.watch_time}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderBody = () => {
        if (state.loading) {
            return (
                <View style={[styleGlobal.full, styleGlobal.center]}>
                    <Loading initalState={true} style={{ backgroundColor: 'transparent' }} />
                </View>
            )
        }

        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    height: Platform.OS === "android" ? SIZES.height * 0.7 : SIZES.height * 0.6,
                }}>
                <FlatList
                    data={state.data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `${item.animal_red_list_id} - ${index}`}
                    renderItem={renderItem}
                />
            </View>
        )
    }

    function renderHistory() {
        return (
            <View
                style={[styleGlobal.full, {
                    marginTop: SIZES.padding * 2,
                    paddingHorizontal: SIZES.padding,
                }]}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Động Vật Của Bạn</Text>
                {renderBody()}
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