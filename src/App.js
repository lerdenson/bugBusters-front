import QuestionSection from "./Components/QuestionSection";
import {useState} from "react";
import StartSection from "./Components/StartSection";
import GameTable from "./Components/GameTable";
import NavigationButtons from "./Components/NavigationButtons";
import Header from "./Components/Header";
import QuestionService from "./service/QuestionService";

function App() {
    const playerCellsInitialState = [{x: 0, y: 3}, {x: 1, y: 3}]
    const bugCellsInitialState = [{x: 3, y: 0}]


    const [playerCells, setPlayerCells] = useState(playerCellsInitialState)
    const [bugCells, setBugCells] = useState(bugCellsInitialState)
    const [onAttack, setOnAttack] = useState(false)
    const [currentTarget, setCurrentTarget] = useState({x: -1, y: -1})
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [question, setQuestion] = useState({
        id: 0,
        theme: "theme",
        question: "question",
        ans1: "answer1",
        ans2: "answer2",
        ans3: "answer3",
        ans4: "answer4",
    })


    const setDefaultField = () => {
        setPlayerCells(playerCellsInitialState)
        setBugCells(playerCellsInitialState)
    }

    const setResponse = (response) => {
        if (response.isAnswerRight) {
            setPlayerCells(playerCells.push(currentTarget))
        }
        if (response.coordinates.x >= 0 && response.coordinates.y >= 0) {
            setBugCells(bugCells.push(response.coordinates))
        }
        setOnAttack(!onAttack)
    }


    return (
        // <div>
        //     <Header/>
        //
        //     {isGameStarted ?
        //         <div>
        //             <QuestionSection question={question} coordinates={currentTarget} setResponse={setResponse}/>
        // <GameTable
        //     onAttack={onAttack}
        //     playerCells={playerCells}
        //     bugCells={bugCells}
        //     setCurrentTarget={setCurrentTarget}
        //     setOnAttack={setOnAttack}
        //     setQuestion={setQuestion}
        // />
        //             />
        //         </div>
        //         :
        //         <div>
        //             <StartSection setIsGameStarted={setIsGameStarted}/>
        //         </div>
        //     }
        //     <NavigationButtons
        //         setDefaultField={setDefaultField}
        //         setIsGameStarted={setIsGameStarted}
        //         isGameStarted={isGameStarted}
        //     />
        // </div>
        <div>

            <GameTable
                onAttack={onAttack}
                playerCells={playerCells}
                bugCells={bugCells}
                currentTarget={currentTarget}
                setCurrentTarget={setCurrentTarget}
                setOnAttack={setOnAttack}
                setQuestion={setQuestion}
            />
            <QuestionSection
                question={question}
                coordinates={currentTarget}
                onAttack={onAttack}
                setResponse={setResponse}
            />

        </div>
    );
}

export default App;
