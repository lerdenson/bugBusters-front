import React from 'react';
import '../styles/navigation.css'
const NavigationLinks = (props) => {
    const handleRestart = async (e) => {
        e.preventDefault()
        await props.startGame()
    }

    const handleToMain = () => {
        props.setIsGameStarted(false)

    }
    return (
        <div className="navigationButtons">
            <button className="common-button" onClick={(e) => handleRestart(e)} >Restart</button>
            <button className="common-button" onClick={handleToMain}>start page</button>
        </div>
    );
};

export default NavigationLinks;