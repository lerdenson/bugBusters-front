import {useEffect, useState} from "react";

import QuestionSection from "./components/gamePage/QuestionSection";
import StartSection from "./components/startPage/StartSection";
import GameTable from "./components/gamePage/GameTable";
import NavigationButtons from "./components/gamePage/NavigationButtons";
import CellsService from "./service/CellsService";
import MakeAttackMessage from "./components/gamePage/MakeAttackMessage";
import StartService from "./service/StartService";
import EndgameMessage from "./components/gamePage/EndgameMessage";
import Header from "./components/Header";


import './styles/commonStyles.css'
import Statistic from "./components/gamePage/Statistic";

function App() {
    const playerCellsInitialState = [{x: 0, y: 3}]
    const bugCellsInitialState = [{x: 3, y: 0}]


    const [playerCells, setPlayerCells] = useState(playerCellsInitialState)
    const [bugCells, setBugCells] = useState(bugCellsInitialState)
    const [onAttack, setOnAttack] = useState(true)
    const [currentTarget, setCurrentTarget] = useState({x: -1, y: -1})
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [winner, setWinner] = useState(0)
    const [question, setQuestion] = useState({
        id: 0,
        theme: "theme",
        question: "question",
        answer1: "answer1",
        answer2: "answer2",
        answer3: "answer3",
        answer4: "answer4",
    })
    const [questionNumber, setQuestionNumber] = useState(0)
    const [rightQuestionNumber, setRightQuestionNumber] = useState(0)

    useEffect(() => {
        (async () => {
            const data = await CellsService.getBugCells()
            setBugCells(data)
        })()
    }, [])
    useEffect(() => {
        (async () => {
            const data = await CellsService.getPlayersCells()
            setPlayerCells(data)
        })()
    }, [])

    const startGame = async (request) => {
        await StartService.startGame(request)
        const playerData = await CellsService.getPlayersCells()
        const bugData = await CellsService.getBugCells()
        setPlayerCells(playerData)
        setBugCells(bugData)

        setIsGameStarted(true)
        setCurrentTarget({x: -1, y: -1})
        setOnAttack(true)
        setWinner(0)
        setRightQuestionNumber(0)
        setQuestionNumber(0)
    }

    const questionAndRulesVisibility = {display: winner === 0 ? "" : "none"}

    const gameVisibility = {display: isGameStarted ? "" : "none"}
    const startPageVisibility = {display: isGameStarted ? "none" : ""}


    return (
        <div>
            <Header/>
            <StartSection
                style={startPageVisibility}
                startGame={startGame}
            />
            <div style={gameVisibility}>
                <GameTable
                    onAttack={onAttack}
                    playerCells={playerCells}
                    bugCells={bugCells}
                    currentTarget={currentTarget}
                    setCurrentTarget={setCurrentTarget}
                    setOnAttack={setOnAttack}
                    setQuestion={setQuestion}
                    setQuestionNumber={setQuestionNumber}
                />
                <div style={questionAndRulesVisibility}>
                    <QuestionSection
                        question={question}
                        coordinates={currentTarget}
                        onAttack={onAttack}
                        setOnAttack={setOnAttack}
                        setPlayerCells={setPlayerCells}
                        setBugCells={setBugCells}
                        setWinner={setWinner}
                        setRightQuestionNumber={setRightQuestionNumber}
                    />
                    <Statistic
                        questionNumber={questionNumber}
                        rightQuestionNumber={rightQuestionNumber}
                    />
                    <MakeAttackMessage onAttack={onAttack}/>
                </div>


                <NavigationButtons
                    startGame={startGame}
                    setIsGameStarted={setIsGameStarted}
                />
                <EndgameMessage winner={winner}/>
            </div>

        </div>
    );
}

export default App;
