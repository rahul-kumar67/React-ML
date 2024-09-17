import {DotLoader, CircleSpinnerOverlay} from 'react-spinner-overlay'

const Loader = (props) => {
    const {loading} = props
    return(
        <CircleSpinnerOverlay
        loading = {loading}
        overlayColor = "rgb(134,134,134,0.2)"
        color = "#272727"
      />
    )
}

export default Loader