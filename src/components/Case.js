export const Case = ({col, val, action, hoverIndex}) => {
    return(
        <div className={`cercle ${(val===2) ? "jaune" : (val===1) ? "rouge" : ""} ${(hoverIndex===col && !val) ? "hover-color" : ""}`} id={col} onClick={() => action(col)}></div>
    );
}