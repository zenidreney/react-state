import React from "react";

function Canvas() {
    //console.log("Main Rendering");

    /*States and Refs*/

    const [imgUrl, setImgUrl] = React.useState("https://picsum.photos/200/300");
    const [isLoading, setIsLoading] = React.useState(false);
    const [clickCount, setClickCount] = React.useState(0);
    const [getText, setGetText] = React.useState("What you type is what you get!");
    const [startDraw, setStartDraw] = React.useState(false);
    const [drawColor, setDrawColor] = React.useState("#272727")

    const canvasRef = React.useRef(null);
    const canvasContainerRef = React.useRef(null);
    //console.log(canvasContainerRef);

    
    function getBrushPosition(e) {
        const canvasContainer = canvasContainerRef.current.getBoundingClientRect();
        return {
            x: e.clientX - canvasContainer.left,
            y: e.clientY - canvasContainer.top
        }
    }
    
    
    /*Handlers*/

    function handleMouseDown(e) {
        setStartDraw(true);
        
        const brushPosition = getBrushPosition(e);
        //console.log(brushPosition)
        
        
        const pointer = canvasRef.current.getContext("2d");
        pointer.strokeStyle = drawColor;

        pointer.beginPath();
        pointer.moveTo(brushPosition.x, brushPosition.y);
    }

    function handleMouseMove(e) {
        if (!startDraw) return;
        
        const brushPosition = getBrushPosition(e);
        //console.log(brushPosition);
        const pointer = canvasRef.current.getContext("2d");
        pointer.strokeStyle = drawColor;
        pointer.lineTo(brushPosition.x, brushPosition.y);
        //console.log(startDraw, pointer);
        pointer.stroke();
    }
    
    function clearCanvas() {
        const currentCanvas = canvasRef.current.getContext("2d")
        //console.log(currentCanvas)
        currentCanvas.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    function handleImageBtn() {
        setClickCount((clickCount) => clickCount + 1);
    }

    function handleTextInput(e) {
        setGetText(e.target.value);
    }

    /*Side Effects*/

    React.useEffect(
        function () {
            setIsLoading(true);

            fetch("https://picsum.photos/v2/list?page=2&limit=100")
                .then((res) => res.json())
                .then((data) => {
                    const rI = Math.floor(Math.random() * data.length);
                    setImgUrl(data[rI].download_url);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to get image!", err);
                });
        },
        [clickCount]
    );

    /*To render*/

    return (
        <article>
            <p>{getText} </p>
            <input type="text" name="text" placeholder="Type something..." onChange={handleTextInput} />

            <input type="color" value={drawColor} onChange={(e) => setDrawColor(e.target.value)} />
            <button onClick={handleImageBtn}>Change Image</button>
            <div ref={canvasContainerRef} className="canvas-container">
                <canvas
                    ref={canvasRef}
                    width={250}
                    height={350}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={() => setStartDraw(false)}
                />
                
                
                {isLoading && <p>LOADING</p>}
                
                <img className="canvas-img" src={imgUrl} />
            </div>
            <button onClick={clearCanvas}>Clear Drawing</button>
        </article>
    );
}

export default Canvas;
