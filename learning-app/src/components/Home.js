import * as tf from '@tensorflow/tfjs'
import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

const Home = () => {
    const [dataX, setDataX] = useState(null)
    const [dataY, setDataY] = useState(null)
    const [correctData, setCorrectData] = useState(null)
    const [predictedData, setPredictedData] = useState(null)

    useEffect(() => {
        const xArr = []
        const yArr = []
    
        // Create Training Data
        const xs = tf.tensor([0, 1, 2, 3, 4])
        const ys = xs.mul(10).add(5)
    
        // Define a Linear Regression Model
        const model = tf.sequential()
        model.add(tf.layers.dense({units: 1, inputShape: [1]}))
    
        // Specify Loss and Optimizer
        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'})
    
        // Train the Model
        model.fit(xs, ys, {epochs:500}).then(() => {myFunction()})
    
        // Use the Model
        const myFunction = () => {
            const xMax = 10
            for (let x = 0; x <= xMax; x++) { 
            let result = model.predict(tf.tensor([Number(x)]))
            result.data().then(y => {
                xArr.push(x)
                yArr.push(Number(y));
                if (x == xMax) {
                        setDataX(xArr)
                        setDataY(yArr)
                        display(xArr, yArr)
                    }
            })
            }
        }
    
        function display(xArr, yArr) {
            const correctData = []
            const predictedData = []
            for (let i = 0; i < xArr.length; i++) { 
                correctData.push((xArr[i]*10+5).toFixed(4))
                predictedData.push(yArr[i].toFixed(4))
    
            }
            setCorrectData(correctData)
            setPredictedData(predictedData)
        }
    }, [])

    return(
        <div>
            <h1>
                Welcome to the world of Artificial Intelligence
            </h1>
            <h2>
                & Gen-AI using Machine Learning with Tensorflow
            </h2>
            {dataX &&(
                <div style={{marginBottom: "15px"}}>
                    <div><b>Formula:</b></div>
                    <div>X*10+5</div>
                </div>
            )}
            {dataX && (<Plot
                data={[
                {
                    x: dataX,
                    y: dataY,
                    type: 'scatter',
                    mode: 'markers'
                }
                ]}
                layout = { {xaxis: {range: [0, 10]}, yaxis: {range: [0, 100]} } }
            />)}
            <div style={{width: "100%", display: "table"}}>
                <div style={{display: "table=row"}}>
                    <div style={{width: "650px", display: "table-cell"}}>
                        {correctData && (
                            <p>Correct Data</p>
                        )}
                        {correctData && (
                            correctData.map((cRecord) => {
                                return(
                                    <div>
                                        { cRecord }
                                    </div>
                                )
                            })
                        )}
                    </div>

                    <div style={{display: "table-cell"}}>
                        {predictedData && (
                            <p>Predicted Data</p>
                        )}
                        {predictedData && (
                            predictedData.map((pRecord) => {
                                return(
                                    <div>
                                        {pRecord}
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home