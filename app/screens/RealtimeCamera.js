import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera-tflite';
import { useRef } from 'react';
import outputs from '../../Output1.json';
import _ from 'lodash';
let _currentInstant = 0;

const RealtimeCamera = ({ navigation }) => {
    const [output, setOutput] = React.useState("Hi");

    const [cameraRef, setCameraRef] = React.useState(null)
    const modelParams = {
        file: "mobilenet_v1_1.0_224.tflite",
        inputDimX: 224,
        inputDimY: 224,
        outputDim: 1001,
        freqms: 0
    };

    function processOutput({ data }) {
        const probs = _.map(data, item => _.round(item / 255.0, 0.02));
        const orderedData = _.chain(data).zip(outputs).orderBy(0, 'desc').map(item => [_.round(item[0] / 255.0, 2), item[1]]).value();
        const outputData = _.chain(orderedData).take(3).map(item => `${item[1]}: ${item[0]}`).join('\n').value();
        const time = Date.now() - (_currentInstant || Date.now());
        const output = `Guesses:\n${outputData}\nTime:${time} ms`;
        setOutput(output);
        _currentInstant = Date.now();
        // console.log(data)
    }

    return (
        <View style={styles.container}>
            <RNCamera
                ref={(ref) => {
                    setCameraRef(ref)
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                onModelProcessed={data => processOutput(data)}
                modelParams={modelParams}
            >
                <Text style={styles.cameraText}>{output}</Text>
            </RNCamera>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default RealtimeCamera;