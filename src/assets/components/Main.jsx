import React from "react";

function Main() {
    console.log("Main Rendering");

    /*States and Refs*/

    const [imgUrl, setImgUrl] = React.useState("https://picsum.photos/200/300");
    const [isLoading, setIsLoading] = React.useState(false);
    const [clickCount, setClickCount] = React.useState(0);
    const [getText, setGetText] = React.useState("What you type is what you get!");
    const [startDraw, setStartDraw] = React.useState(false);
    const [drawColor, setDrawColor] = React.useState("#272727")

    const canvasRef = React.useRef(null);

    /*Handlers*/

    function handleMouseDown(e) {
        setStartDraw(true);

        const pointer = canvasRef.current.getContext("2d");
        pointer.strokeStyle = drawColor;

        pointer.beginPath();
        pointer.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }

    function handleMouseMove(e) {
        if (!startDraw) return;
        const pointer = canvasRef.current.getContext("2d");
        pointer.strokeStyle = drawColor;
        pointer.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
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
        <main>
            <p>{getText} </p>
            <input type="text" name="text" placeholder="Type something..." onChange={handleTextInput} />

            <input type="color" value={drawColor} onChange={(e) => setDrawColor(e.target.value)} />
            <button onClick={handleImageBtn}>Change Image</button>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setStartDraw(false)}
            />


            {isLoading && <p>LOADING</p>}

            <img src={imgUrl} />
            <button onClick={clearCanvas}>Clear Drawing</button>
        </main>
    );
}

export default Main;
