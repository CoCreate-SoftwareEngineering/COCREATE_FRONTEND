import './Canvas.js'

const IconButton = ( {image, alt, clicked} ) => {
    return (
        <div className = "icon-button-container">
            <button className = "icon-button" onClick = {clicked}>
                <img src = {image} alt = {alt}/>
            </button>
            <div className = "icon-button-label">{alt}</div>
        </div>
    );
}

export default IconButton;