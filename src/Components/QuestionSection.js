import React, {useEffect, useState} from 'react';
import QuestionService from "../service/QuestionService";
import '../styles/questionSection.css'

const QuestionSection = (props) => {
    const [answer, setAnswer] = useState()
    const [correctAnswer, setCorrectAnswer] = useState(null)

    const getRadioStyle = answerI => {
        if (answerI === correctAnswer) return "answer-right"
        if (answerI === answer && correctAnswer !== null && answerI !== correctAnswer) return "answer-wrong"
        if (answerI === answer) return "answer-chosen"
        return "answer-neutral"
    }
    useEffect(() => {

    })
    const onRadioClick = (value) => {
        setAnswer(value)
    }

    const handleClick = () => {
        const request = {
            questionId: props.question.id,
            answer: answer,
            x: props.coordinates.x,
            y: props.coordinates.y
        }
        const responseBody = QuestionService.sendAnswer(request)
        setCorrectAnswer(responseBody.answer)

    }

    return (
        <div className="questionSection">
            <h3 className="theme">{props.question.theme}</h3>
            <p className="question">{props.question.question}<br /></p>
            <Answer
                answer={props.question.ans1}
                value={props.question.ans1}
                answerStyle={getRadioStyle(props.question.ans1)}
                onClick={onRadioClick}
            />
            <Answer
                answer={props.question.ans2}
                value={props.question.ans2}
                answerStyle={getRadioStyle(props.question.ans2)}
                onClick={onRadioClick}
            />
            <Answer
                answer={props.question.ans3}
                value={props.question.ans3}
                answerStyle={getRadioStyle(props.question.ans3)}
                onClick={onRadioClick}
            />
            <Answer
                answer={props.question.ans4}
                value={props.question.ans4}
                answerStyle={getRadioStyle(props.question.ans4)}
                onClick={onRadioClick}
            />


            <div className="answer-button-block">
                <button onClick={handleClick}  >Answer</button>
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