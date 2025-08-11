import "./Game.css";

function Color(props) {
    //console.log(props)
    return <button className="color-btn" style={{ backgroundColor: props.color }} />;
}

export default Color;
