import "./Game.css";

function Color(props) {
    
    const styles = {
        backgroundColor: props.color,
        opacity: props.isHeld && 0.5
    }
    
    return <button className="color-btn" style={styles} />;
}

export default Color;
