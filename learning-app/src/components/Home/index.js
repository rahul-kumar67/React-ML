import Plot from 'react-plotly.js'
import Loader from '../Common/Loader'
import useHomeHook from './Home'

const Home = () => {
    const {
        dataX,
        dataY,
        correctData,
        predictedData,
        isLoading
    } = useHomeHook()

    return(
        <div>
            <Loader loading = {isLoading} />
            <h1>
                Welcome to the world of Artificial Intelligence
            </h1>
            <h2>
                & Gen-AI using Machine Learning with Tensorflow
            </h2>
            {isLoading && (
                <div style={{color: "#565656"}}>
                    Please wait while we train the AI Model...
                </div>
            )}
            {dataX &&(
                <div style={{marginBottom: "15px"}}>
                    <div><b>Formula:</b></div>
                    <div>X*10+5</div>
                </div>
            )}
            {dataX && dataY && (<Plot
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
                                    <div key = {cRecord.toString()}>
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
                                    <div  key = {pRecord.toString()}>
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