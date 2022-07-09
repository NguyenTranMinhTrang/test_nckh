import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs"
//Loading model from models folder
const modelJSON = require("./tfjs_files/model.json");
const modelWeights = require("./tfjs_files/group1-shard1of1.bin");


// Load the model from the models folder
const loadModel = async () => {
    const model = await tf
        .loadGraphModel(bundleResourceIO(modelJSON, modelWeights))
        .catch(e => console.log(e));
    console.log("Model loaded!");
    return model;
};

const predict = async (buffer) => {

    const model = await loadModel();

    const tensor = tf.io
        .decodeImage(buffer, 3)
        .resizeNearestNeighbor([150, 150])
        .toFloat()
        .expandDims();

    const prediction = model.predict(tensor)
    const result = prediction.as1D().argMax().dataSync()[0];
    return result + 1;
}

export default predict;