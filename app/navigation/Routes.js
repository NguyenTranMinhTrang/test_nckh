import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ShowInfo, Start, Login, Register, ForgetPassword, Code, GetPassword, SendEmail, ChangePassword } from "../screens";
import Tabs from "./tab";

const Stack = createNativeStackNavigator();

export default function Routes() {
    const userData = useSelector((state) => state.auth.userData);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Start'
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                />

                <Stack.Screen
                    name="ShowInfo"
                    component={ShowInfo}
                />

                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                />
                <Stack.Screen
                    name="Start"
                    component={Start}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                />
                <Stack.Screen
                    name="ForgetPassword"
                    component={ForgetPassword}
                />
                <Stack.Screen
                    name="Code"
                    component={Code}
                />
                <Stack.Screen
                    name="GetPassword"
                    component={GetPassword}
                />
                <Stack.Screen
                    name="SendEmail"
                    component={SendEmail}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}