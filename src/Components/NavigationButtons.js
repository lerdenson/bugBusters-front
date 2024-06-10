import React from 'react';

import StartService from "../service/StartService"; // Import your CSS file

const NavigationLinks = (props) => {
    const handleRestart = () => {
        props.setDefaultField()
        StartService.startGame()
    }

    const handleToMain = () => {
        props.setIsGameStarted(props.isGameStarted)

    }
    return (
        <div>
            <button id="restart" onClick={handleRestart} className="u-btn u-button-style u-btn-2">Restart</button>
            <button onClick={handleToMain} className="u-btn u-button-style u-btn-3">To main page</button>
        </div>
    );
};

export default NavigationLinks;