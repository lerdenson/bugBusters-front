import React from "react";
import '../styles/startSection.css'

const StartSection = (props) => {

    return (
        <div className="start-section" style={props.style}>
            <div className="rules-section">
                <h2>Rules</h2>
                <p>
                    There is a field of 4 by 4 cells, you start with your opponent in different corners.
                    Your color is blue, bug's color is red. The goal is to capture all the cells occupied
                    by the bug. Make moves strictly horizontally or vertically from the cells you occupy.
                    When you capture a cell, you must answer a question, if you answer correctly, you capture
                    the cell and it turns into your color.
                </p>
                <button onClick={props.startGame}>Start</button>
            </div>
            <div className="footer-text">
                Hackathon 2024 event.<br/>
                Team: Morozov Maxim, Timofeev Pavel, Shekunov Aleksandr, Melia Ilia.
            </div>
        </div>
    )
}

export default StartSection