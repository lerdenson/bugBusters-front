import QuestionSection from "./Components/QuestionSection";
import {useEffect, useState} from "react";
import StartSection from "./Components/StartSection";
import GameTable from "./Components/GameTable";
import NavigationButtons from "./Components/NavigationButtons";
import CellsService from "./service/CellsService";
import MakeAttackMessage from "./Components/MakeAttackMessage";
import StartService from "./service/StartService";
import EndgameMessage from "./Components/EndgameMessage";

import './styles/commonStyles.css'
import Header from "./Components/Header";

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

    const startGame = async () => {
        await StartService.startGame()
        const playerData = await CellsService.getPlayersCells()
        const bugData = await CellsService.getBugCells()
        setPlayerCells(playerData)
        setBugCells(bugData)

        setIsGameStarted(true)
        setOnAttack(true)
        setWinner(0)
    }

    const questionAndRulesVisibility = {display: winner === 0 ? "" : "none"}

    const gameVisibility = {display: isGameStarted ? "" : "none"}
    const startPageVisibility = {display: isGameStarted ? "none" : ""}


    return (
        <div>
            <Header/>
            <StartSection style={startPageVisibility} startGame={startGame}/>
            <div style={gameVisibility}>
                <GameTable
                    onAttack={onAttack}
                    playerCells={playerCells}
                    bugCells={bugCells}
                    currentTarget={currentTarget}
                    setCurrentTarget={setCurrentTarget}
                    setOnAttack={setOnAttack}
                    setQuestion={setQuestion}
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
                    />
                    <MakeAttackMessage onAttack={onAttack}/>
                </div>


                <NavigationButtons startGame={startGame} setIsGameStarted={setIsGameStarted}/>
                <EndgameMessage winner={winner}/>
            </div>

        </div>
    );
}

export default App;
