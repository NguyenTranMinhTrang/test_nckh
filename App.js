import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// screens
import { Login, ShowInfo, Start, Register } from './app/screens';
import Tabs from './app/navigation/tab';

import { useFonts } from 'expo-font';

// screen for stack & tabs
const Stack = createNativeStackNavigator();
const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require('./app/assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('./app/assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular": require('./app/assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Light": require('./app/assets/fonts/Roboto-Light.ttf'),
  })

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Start"

      >
        <Stack.Screen name="ShowInfo" component={ShowInfo} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return <App />;
};