const Statistic = (props) => {
    const getPercents = () => {
        return props.questionNumber === 0 ? 0 : Math.round(props.rightQuestionNumber * 100 / props.questionNumber)
    }
    return (
        <div>
            <div>Question {props.questionNumber}</div>
            <div>Right answers (%): {getPercents()}%</div>
        </div>
    )
}

export default Statistic