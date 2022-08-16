import { showMessage } from "react-native-flash-message";
import { StatusBar, Platform } from "react-native";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        duration: 10000,
        statusBarHeight: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        message
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        duration: 10000,
        statusBarHeight: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        message
    })
}

export {
    showError,
    showSuccess
}