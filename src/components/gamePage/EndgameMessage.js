import React from "react";
import '../../styles/endgameMessage.css'

const EndgameMessage = (props) => {
    const winVisibility = {display: props.winner > 0 ? "" : "none"}
    const loseVisibility = {display: props.winner < 0 ? "" : "none"}

    const noWinnerVisibility = {display: props.winner === 0 ? "none" : ""}

    return (
        <div className="container-notify" style={noWinnerVisibility}>
            <div className="win-notification" style={winVisibility}>
                <p>Congratulations! You've outsmarted the tricky bug!</p>
                <p>That red rascal tried to escape, but you caught him in your blue net. </p>
                <p>Now he knows it's a bad idea to mess with you! Onward to new victories! 🎉💪</p>
            </div>
            <div className="lose-notification" style={loseVisibility}>
                <p>Oh no! You lost, and the bug went on the offensive!</p>
                <p>That cunning red troublemaker leaked your personal photos online and wiped your hard drive...</p>
                <p>Next time, be more careful and catch him!
                    Don't give up! 🐞😜</p>
            </div>
        </div>
    )
}

export default EndgameMessage