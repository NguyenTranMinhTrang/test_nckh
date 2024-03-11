import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ShowInfo, Start, Login, Register, ForgetPassword, Code, GetPassword, SendEmail, ChangePassword, RealtimeCamera } from "../screens";
import Tabs from "./tab";
import Report from '../screens/Report';
import EditProfile from '../screens/EditProfile';

const Stack = createNativeStackNavigator();

export default function Routes({ tflite }) {
    const userData = useSelector((state) => state.auth.userData);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Start'
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name="Tabs"
                >
                    {props => < Tabs {...props} tflite={tflite} />}
                </Stack.Screen>

                <Stack.Screen
                    name="ShowInfo"
                    component={ShowInfo}
                />

                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                />
                {/* <Stack.Screen
                    name="RealtimeCamera"
                    component={RealtimeCamera}
                /> */}
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
                    name="EditProfile"
                    component={EditProfile}
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

                <Stack.Screen
                    name="Report"
                    component={Report}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}