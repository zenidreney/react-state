import { useState } from "react"
import Color from "./Color";
import { nanoid } from "nanoid"


function Game() {
    
    const [colorsArray, setColorsArray] = useState(["blue", "red", "black", "white", "green", "pink", "darkviolet", "khaki"]);
    
    const colorBtns = colorsArray.map(color => (
        <Color key={nanoid()} id={nanoid()} color={color} />
    ))
    
    function mixColors() {
        //console.log("Mixey Mixey")
        
        const copyArray = [...colorsArray]
        //console.log(copyArray)
        
        for (let i = copyArray.length -1; i > 0; i--) {
            //console.log("I am iterating");
            const j = Math.floor(Math.random() * (i + 1));
            //console.log([copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]])
            [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
        }
        console.log(copyArray)
        setColorsArray(copyArray)
    }

    
    
    return (
        <article>
           
            <h2>Choose the same colors</h2>

            <div className="color-container">
                {colorBtns} 
            </div>
            
            <button className="mix-button" onClick={mixColors} >Mix Colors</button>
            
        </article>
    );
}

export default Game;
