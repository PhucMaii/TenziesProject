import React from "react"

export default function Die(props) {
        
    const style = props.isHeld ? {backgroundColor: "#59E391"} : {backgroundColor: "white"};
    
    // [top, left]
    const dotPositionMatrix = {
        1: [
            [50, 50]
        ],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ], 
        4: [
            [20, 20],
            [20, 80],
            [80, 80],
            [80, 20]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 80],
            [80, 20]
        ],
        6: [
            [20, 20],
            [50, 20],
            [80, 20],
            [20, 80],
            [50, 80],
            [80, 80],
        ]
    }

    function createDotPosition(top, left) {
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translateX(-${left}%) translateY(-${top}%)` 
        }
    }

    function createDotStyle() {
        const dotStyles = [];
        for(let i = 0; i < props.value; i++) {
            dotStyles.push(createDotPosition(dotPositionMatrix[props.value][i][0], dotPositionMatrix[props.value][i][1]));
        }
        return dotStyles;
    }
    
    const dotElements = createDotStyle().map((dotPosition) => {
        return <div className="dot" style={dotPosition}></div>
    })
    return (
        <button style={style} className="die" onClick={props.holdValue}>
            {dotElements}

        </button>
    )
}