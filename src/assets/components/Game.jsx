import Color from "./Color";

function Game() {
    
    const colorsArray = ["blue", "red", "black", "white", "green", "pink", "darkviolet", "khaki"];
    
    const colorBtns = colorsArray.map(color => (
        <Color color={color} />
    ))
    
    
    return (
        <article>
            <h2>Choose the same colors</h2>

            <div className="color-container">
                {colorBtns} 
            </div>
        </article>
    );
}

export default Game;
