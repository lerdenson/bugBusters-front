import React from "react";

const StartSection = (props) => {

    const startGame = () => {
        props.setIsGameStarted(true)
    }

    return (<section class="u-clearfix u-section-1" id="carousel_99a1">
        <div class="u-container-layout u-valign-bottom u-container-layout-1">
            <h2 class="u-align-center u-text u-text-default u-text-1">Rules</h2>
            <p class="u-align-center u-large-text u-text u-text-variant u-text-2">
                There is a field of 4 by 4 cells, you start with your opponent in different corners.
                Your color is blue, bug's color is red. The goal is to capture all the cells occupied
                by the bug. Make moves strictly horizontally or vertically from the cells you occupy.
                When you capture a cell, you must answer a question; if you answer correctly, you capture
                the cell and it turns into your color.
            </p>
            <button class="u-align-center u-border-2 u-border-active-grey-50 u-border-custom-color-1 u-border-hover-grey-50 u-btn u-btn-round u-button-style u-custom-font u-font-montserrat u-none u-radius-50 u-text-body-color u-btn-1" onClick={startGame}>
                Start
            </button>
        </div>
        <p class="u-align-center u-text u-text-default u-text-3">
            The educational game called Bug Buster. The game is a project for participation
            in the Georgian Technical University Hackathon 2024 event.<br />
            Team: Timofeev Pavel, Shekunov Aleksandr, Maxim Morozov, Ilia Melia.
        </p>
    </section>)
}

export default StartSection