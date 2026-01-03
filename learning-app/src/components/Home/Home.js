import * as tf from '@tensorflow/tfjs'
import { useEffect, useState } from 'react'

const useHomeHook = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [dataX, setDataX] = useState(null)
    const [dataY, setDataY] = useState(null)
    const [correctData, setCorrectData] = useState(null)
    const [predictedData, setPredictedData] = useState(null)

    const [model, setModel] = useState(null)
    const [isModelCreated, setIsModelCreated] = useState(false)

    const noOfTimesToTrain = 500
    const trainingDataArray = [0, 1, 2, 3, 4]

    useEffect(() => {
        // Uncomment below function call if model data changes for training
        // clearX10_5Model()
    }, [])

    useEffect(() => {
        const xArr = []
        const yArr = []
        let model_exists = false

        if(localStorage.getItem('tensorflowjs_models/x*10+5-model/info')) {
            model_exists = true
        }

        // Create model if not created already
        if(!isModelCreated && !model_exists) {
            createModel(trainingDataArray, noOfTimesToTrain)
        }

        // Load the model
        const loadModel = async() => {
            try {
                const loadedModel = await tf.loadLayersModel('localstorage://x*10+5-model')
                console.log('Model loaded successfully:', loadedModel)
                setModel(loadedModel)
              } catch (err) {
                console.error('Error loading model:', err)
              }
        }

        // Use the Model
        const makePrediction = () => {
            const xMax = 10
            for (let x = 0; x <= xMax; x++) { 
            let result = model.predict(tf.tensor([Number(x)]))
            result.data().then(y => {
                xArr.push(x)
                yArr.push(Number(y))
                if (x == xMax) {
                        setDataX(xArr)
                        setDataY(yArr)
                        display(xArr, yArr)
                    }
            })
            }
        }

        // Display actual and predicted data in table
        function display(xArr, yArr) {
            const correctData = []
            const predictedData = []
            for (let i = 0; i < xArr.length; i++) { 
                correctData.push((xArr[i]*10+5).toFixed(4))
                predictedData.push(yArr[i].toFixed(4))
    
            }
            //  Set Actual data and predicted data
            setCorrectData(correctData)
            setPredictedData(predictedData)
        }

        // Load model if it is created and not loaded
        if((isModelCreated || model_exists) && model === null) {
            loadModel()
        }

        // Predict result if model is loaded
        if(model !== null) {
            makePrediction()
        }
    }, [isModelCreated, model])

    // Create the model
    const createModel = async(trainingDataArray, noOfTimesToTrain) => {
        // Set the loader
        setIsLoading(true)

        // Create Training Data
        const xs = tf.tensor(trainingDataArray)
        const ys = xs.mul(10).add(5)

        // Define a Linear Regression Model
        const model = tf.sequential()
        model.add(tf.layers.dense({units: 1, inputShape: [1]}))
    
        // Specify Loss and Optimizer
        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'})
    
        // Train the Model
        await model.fit(xs, ys, {epochs:noOfTimesToTrain})

        // Save the model
        try {
            const saveResult = await model.save('localstorage://x*10+5-model')
            console.log('Model saved successfully:', saveResult)
            setIsModelCreated(true)
            setIsLoading(false)
          } catch (err) {
            console.error('Error saving model:', err)
            setIsModelCreated(false)
            setIsLoading(false)
          }
    }

    // Clear localstorage data
    const clearX10_5Model = () => {
        localStorage.removeItem('tensorflowjs_models/x*10+5-model/info')
        localStorage.removeItem('tensorflowjs_models/x*10+5-model/model_metadata')
        localStorage.removeItem('tensorflowjs_models/x*10+5-model/model_topology')
        localStorage.removeItem('tensorflowjs_models/x*10+5-model/weight_data')
        localStorage.removeItem('tensorflowjs_models/x*10+5-model/weight_specs')
    }

    return {
        dataX,
        dataY,
        correctData,
        predictedData,
        isLoading
    }
}

export default useHomeHook
