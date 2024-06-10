import React, {useEffect, useState} from 'react';
import QuestionService from "../service/QuestionService";
import '../styles/questionSection.css'

const QuestionSection = (props) => {
    const [answer, setAnswer] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")

    const isVisible = { display: props.onAttack ? 'none' : '' }

    const getRadioStyle = answerI => {
        if (answerI === correctAnswer) return "answer-right"
        if (answerI === answer && correctAnswer !== "" && answerI !== correctAnswer) return "answer-wrong"
        if (answerI === answer) return "answer-chosen"
        return "answer-neutral"
    }
    useEffect(() => {
    })
    const onRadioClick = (value) => {
        setAnswer(value)
    }

    const handleClick = async () => {
        if (
            props.coordinates.x < 0 ||
            props.coordinates.y < 0
        ) {
            alert("no cell coordinate")
        }
        const request = {
            questionId: props.question.id,
            answer: answer.trim(),
            x: props.coordinates.x,
            y: props.coordinates.y
        }
        const responseBody = await QuestionService.sendAnswer(request)
        setCorrectAnswer(responseBody.answer)
        if (answer === responseBody.answer) {
            props.setPlayerCells(oldArray => [...oldArray, props.coordinates])
            props.setBugCells(oldArray => oldArray.filter(c => c.x !== props.coordinates.x || c.y !== props.coordinates.y))
        }
        setTimeout(async () => {
            props.setWinner(responseBody.winnerId)

            if (responseBody.coordinates.x >= 0 && responseBody.coordinates.y >= 0) {
                props.setBugCells(oldArray => [...oldArray, responseBody.coordinates])
                props.setPlayerCells(oldArray => oldArray.filter(c => c.x !== responseBody.coordinates.x || c.y !== responseBody.coordinates.y))

            }

            props.setOnAttack(!props.onAttack)
            setCorrectAnswer("")
            setAnswer("")

        }, 3000)

    }

    return (
        <div className="questionSection" style={isVisible}>
            <h3 className="theme">{props.question.theme}</h3>
            <p className="question">{props.question.question}<br /></p>
            <Answer
                answer={props.question.answer1}
                value={props.question.answer1}
                answerStyle={getRadioStyle(props.question.answer1)}
                onClick={onRadioClick}
            />
            <Answer
                answer={props.question.answer2}
                value={props.question.answer2}
                answerStyle={getRadioStyle(props.question.answer2)}
                onClick={onRadioClick}
            />
            <Answer
                answer={props.question.answer3}
                value={props.question.answer3}
                answerStyle={getRadioStyle(props.question.answer3)}
                onClick={onRadioClick}
            />
            <Answer
                answer={props.question.answer4}
                value={props.question.answer4}
                answerStyle={getRadioStyle(props.question.answer4)}
                onClick={onRadioClick}
            />


            <div className="answer-button-block">
                <button onClick={handleClick} className="common-button" >Answer</button>
            </div>
        </div>
    );
}

const Answer = (props) => {
    return (
        <div
            className={props.answerStyle}
            onClick={() => props.onClick(props.value)}
        >
            {props.answer}
        </div>
    )
}

export default QuestionSection;