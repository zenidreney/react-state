import { useState } from "react";
import Color from "./Color";
import { nanoid } from "nanoid";

function Game() {
    const [colorsArray, setColorsArray] = useState(() =>
        ["blue", "red", "black", "white", "green", "pink", "darkviolet", "khaki"].map((color) => {
            return {
                id: nanoid(),
                colorValue: color
            };
        })
    );
    
    //console.log(colorsArray)

    const colorBtns = colorsArray.map((color) => <Color key={color.id} id={color.id} color={color.colorValue} />);

    function mixColors() {
        const copyArray = [...colorsArray];

        for (let i = copyArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
        }
        console.log(copyArray);
        setColorsArray(copyArray);
    }

    return (
        <article>
            <h2>Choose the same colors</h2>

            <div className="color-container">{colorBtns}</div>

            <button className="mix-button" onClick={mixColors}>
                Mix Colors
            </button>
        </article>
    );
}

export default Game;
