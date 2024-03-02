import { showMessage } from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        duration: 10000,
        message: message || 'Thao tác thất bại! Vui lòng thử lại.'
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        duration: 10000,
        message: message || 'Thao tác thành công!'
    })
}

export {
    showError,
    showSuccess
}