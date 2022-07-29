import * as ImagePicker from 'expo-image-picker';

const AskForPermission = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.granted === false) {
        alert('No permissions to access camera!', [{ text: 'ok' }]);
        return false;
    }

    return true;
}

const Camera = async () => {
    const hasPermission = await AskForPermission();
    if (!hasPermission) {
        return;
    }
    else {
        let img = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [3, 3],
            quality: 1,
            base64: true,
        })
        if (!img.cancelled) {
            return img;
        }
        return false;

    }
}

export default Camera;