import * as ImagePicker from 'expo-image-picker';

const AskForPermission = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
        alert('No permissions to access media library! Please set the permission in your device.', [{ text: 'ok' }]);
        return false;
    }
    return true;
}


const Library = async () => {
    const hasPermission = await AskForPermission();
    if (!hasPermission) {
        return;
    }

    let img = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
    });


    if (!img.cancelled) {
        return img;
    }
    return false;
};

export default Library;