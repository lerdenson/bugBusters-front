import React, {useEffect, useState} from "react";
import '../../styles/gameSettings.css'
import QuestionService from "../../service/QuestionService";

const GameSettings = (props) => {
    const [chosenDifficulty, setChosenDifficulty] = useState("medium")
    const [allThemes, setAllThemes] = useState(["WEB"])
    const [chosenThemes, setChosenThemes] = useState(["WEB"])
    const [isSendingEmptyArray, setIsSendingEmptyArray] = useState(false)

    useEffect(() => {
        (async () => {
            const data = await QuestionService.getThemes()
            setAllThemes(data)
            setChosenThemes(data)
        })()
    },[])

    const startGameWithSettings = async () => {
        if (chosenThemes.length === 0) {
            setIsSendingEmptyArray(true)
            setTimeout(() => {
                setIsSendingEmptyArray(false)
            }, 2000)
        } else {
            const request = {
                themes: chosenThemes,
                difficulty: chosenDifficulty
            }
            console.log(request)
            await props.startGame(request)
        }
    }

    const warningVisibility = {display: isSendingEmptyArray ? "" : "none"}

    return (
        <div className="settings-section">
            <h2 className="settings-header">Settings</h2>
            <div className="difficulty-section">
                <h3 className="settings-blockName">Difficulty:</h3>
                <DifficultyButton value="easy" isChosen={chosenDifficulty === "easy"} setChosenButton={setChosenDifficulty}/>
                <DifficultyButton value="medium" isChosen={chosenDifficulty === "medium"} setChosenButton={setChosenDifficulty}/>
                <DifficultyButton value="hard" isChosen={chosenDifficulty === "hard"} setChosenButton={setChosenDifficulty}/>
            </div>
            <div className="theme-section">
                <h3 className="settings-blockName">Choose question themes:</h3>
                {allThemes.map(theme =>
                    <ThemeButton
                        key={allThemes.indexOf(theme)}
                        value={theme}
                        isChosen={chosenThemes.includes(theme)}
                        setChosenThemes={setChosenThemes}
                    />
                )}
            </div>
            <button className="button-start" onClick={startGameWithSettings}>Start</button>
            <div style={warningVisibility} className="settings-warning">Please choose at least one theme</div>
        </div>
    )
}

const DifficultyButton = (props) => {

    const onClick = () => {
        props.setChosenButton(props.value)
    }

    const getStyle = () => {
        return props.isChosen ? "settings-radioButton-chosen" : "settings-radioButton-neutral"
    }

    return (
        <div
            className={getStyle()}
            onClick={onClick}
        >
            {props.value}
        </div>
    )
}

const ThemeButton = (props) => {
    const onClick = () => {
        if (props.isChosen) {
            props.setChosenThemes(oldThemes => oldThemes.filter(theme => theme !== props.value))
        }
        else {
            props.setChosenThemes(oldThemes => [...oldThemes, props.value])
        }
    }

    const getStyle = () => {
        return props.isChosen ? "settings-radioButton-chosen" : "settings-radioButton-neutral"
    }

    return (
        <div
            className={getStyle()}
            onClick={onClick}
        >
            {props.value}
        </div>
    )
}

export default GameSettings