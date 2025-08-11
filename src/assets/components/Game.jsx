import { useState } from "react";
import Color from "./Color";
import { nanoid } from "nanoid";

const baseColors = ["blue", "red", "black", "white", "green", "pink", "darkviolet", "khaki"];

function Game() {
    const [colorsArray, setColorsArray] = useState(() =>
        baseColors.map((color) => {
            return {
                id: nanoid(),
                colorValue: color,
                isHeld: false
            };
        })
    );

    //console.log(colorsArray)

    const colorBtns = colorsArray.map((color) => (
        <Color key={color.id} id={color.id} color={color.colorValue} isHeld={color.isHeld} />
    ));

    function mixColors() {
        const mixedColors = colorsArray.map((color) => {
            const rI = Math.floor(Math.random() * baseColors.length);
            const randomColor = baseColors[rI];
            
            return {
                ...colorsArray,
                colorValue: randomColor,
                id: color.id || nanoid(),
                isHeld: color.isHeld ?? false
            };
        });

        setColorsArray(mixedColors);
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
