import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Routes() {
    const userData = useSelector((state) => state.auth.userData);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {!!userData && userData.token ? HomeScreen(Stack)
                    : AuthScreen(Stack)
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}