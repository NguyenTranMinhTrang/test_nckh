import React, { useEffect } from 'react';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import store from "./app/redux/stores";
import { useFonts } from 'expo-font';
import Routes from './app/navigation/Routes';
import { getUserData } from './app/utils/utils';
import { saveUserData } from './app/redux/actions/auth';
import Tflite from 'tflite-react-native';
let tflite = new Tflite();

// screen for stack & tabs
const App = () => {

  useEffect(() => {
    (() => {
      tflite.loadModel({
        model: 'model.tflite',// required
        labels: 'model.txt',  // required
        numThreads: 1,                              // defaults to 1  
      },
        (err, res) => {
          if (err)
            console.log(err);
          else
            console.log("Load model success");
        });
    })();
    (async () => {
      const userData = await getUserData();
      if (!!userData) {
        saveUserData(userData)
      }
    })();
  }, [])
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
    <Provider store={store}>
      <Routes tflite={tflite} />
      <FlashMessage
        position="top"
      />
    </Provider>
  );
};

export default () => {
  return <App />;
};