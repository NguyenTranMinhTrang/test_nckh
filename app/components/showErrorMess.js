import { showMessage } from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        duration: 10000,
        message
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        duration: 10000,
        message
    })
}

export {
    showError,
    showSuccess
}