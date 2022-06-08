import validator from "is_js";

const checkEmpty = (value, key) => {
    if (validator.empty(value.trim())) {
        return `${key}`;
    } else {
        return '';
    }
}

const checkMinLength = (value, minlength, key) => {
    if (value.trim().length < minlength) {
        return `${key}`;
    }
    else {
        return '';
    }
}

export default function (data) {
    const { email, password, confirm, newPassword } = data;

    if (email !== undefined) {
        let emptyValidationText = checkEmpty(email, 'Vui lòng nhập email !');
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            if (!validator.email(email)) {
                return "Vui lòng nhập email hợp lệ !";
            }
        }
    }

    if (password !== undefined) {
        let emptyValidationText = checkEmpty(password, 'Vui lòng nhập mật khẩu !');
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let checkLength = checkMinLength(password, 8, "Mật khẩu ít nhất phải gồm 8 kí tự !");
            if (checkLength !== '') {
                return checkLength;
            }
        }
    }

    if (newPassword !== undefined) {
        let emptyValidationText = checkEmpty(newPassword, 'Vui lòng nhập mật khẩu mới !');
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let checkLength = checkMinLength(newPassword, 8, "Mật khẩu mới ít nhất phải gồm 8 kí tự !");
            if (checkLength !== '') {
                return checkLength;
            }
        }
    }

    if (confirm !== undefined) {
        let emptyValidationText = checkEmpty(confirm, 'Vui lòng nhập xác nhận mật khẩu !');
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            if (password !== confirm) {
                return "Mật khẩu xác nhận không khớp !";
            }
            else {
                return '';
            }
        }
    }
}