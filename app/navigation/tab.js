import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User, History, Ask } from "../screens/index";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { images, theme, COLORS, SIZES, FONTS } from "../constants";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const Tabs = () => {

    const userData = useSelector((state) => state.auth.userData);

    const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
        var isSelected = accessibilityState.selected;

        if (isSelected) {
            return (
                <View style={{ flex: 1, alignItems: "center", }}>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                        <View style={{ flex: 1, backgroundColor: COLORS.tabbar }}></View>
                        <Svg
                            width={70}
                            height={58}
                            viewBox="0 0 75 61"
                            style={{ backgroundColor: COLORS.black }}
                        >
                            <Path
                                d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                                fill={COLORS.tabbar}
                            />
                        </Svg>
                        <View style={{ flex: 1, backgroundColor: COLORS.tabbar, }}></View>
                    </View>
                    <TouchableOpacity
                        style={{
                            top: -22.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: COLORS.tabbar,
                            opacity: 0.5,
                        }}
                        onPress={onPress}
                    >
                        {children}
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 60,
                        backgroundColor: COLORS.tabbar
                    }}
                    activeOpacity={1}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            )
        }

    }

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#000000",
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 60,
                },
            }}
        >
            <Tab.Screen
                name="User"
                component={Object.keys(userData).length === 0 ? Ask : User}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome name="user-o" size={25} color={focused ? COLORS.primary : COLORS.lightGray} />
                    ),

                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}

            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="home" size={25} color={focused ? COLORS.primary : COLORS.lightGray} />
                    ),

                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}

            />
            <Tab.Screen
                name="History"
                component={Object.keys(userData).length === 0 ? Ask : History}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5 name="history" size={25} color={focused ? COLORS.primary : COLORS.lightGray} />
                    ),

                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}

            />
        </Tab.Navigator>
    )
}

export default Tabs;
