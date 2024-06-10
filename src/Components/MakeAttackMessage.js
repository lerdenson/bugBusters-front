import React from "react";
import '../styles/makeAttackMessage.css'

const MakeAttackMessage = (props) => {
    const visibility = {display: props.onAttack ? "" : "none"}
    return (
        <div className="attackRules" style={visibility}>
            <p>Choose cell you want attack:</p>
            <p className="neutral-example">This color marks neutral which you can conquer</p>
            <p className="bug-example">This color marks cell controlled by bug which you can conquer</p>
        </div>
    )
}

export default MakeAttackMessage