import React, {useEffect, useState} from "react";
import QuestionService from "../service/QuestionService";
import '../styles/gameBoard.css'

const Cell = (props) => {
    const [style, setStyle] = useState("cell-neutral")
    const coordinates = {x: props.x, y: props.y}

    useEffect(() => {
        if (
            props.bugCells.filter(c =>
                c.x === coordinates.x && c.y === coordinates.y
            ).length > 0
        ) {
            setStyle("cell-bug")
        }
    })

    useEffect(() => {
        if (props.currentTarget.x === coordinates.x && props.currentTarget.y === coordinates.y) {
            setStyle("cell-onAttack")
        }

    })
    useEffect(() => {
        if (props.currentTarget.x !== coordinates.x || props.currentTarget.y !== coordinates.y) {
            if (isCellUnderBugControl()) {
                setStyle("cell-bug")
            } else setStyle("cell-neutral")

        }

    })

    useEffect(() => {
        if (
            props.onAttack &&
            isCellCanBeUnderAttack()
        ) {
            if (isCellUnderBugControl()) {
                setStyle("bug-cell-to-attack")
            } else setStyle("neutral-cell-to-attack")
        }
    })

    const isCellCanBeUnderAttack = () => {
        let x = false
        getCellsPlayerCanAttack().forEach(c => {
                if (coordinates.x === c.x && coordinates.y === c.y) {
                    x = true
                }
            }
        )
        return x
    }

    const isCellUnderBugControl = () => {
        return props.bugCells.filter(c =>
            c.x === coordinates.x && c.y === coordinates.y
        ).length > 0
    }


    useEffect(() => {
        if (
            props.playerCells.filter(c =>
                c.x === coordinates.x && c.y === coordinates.y
            ).length > 0
        ) {
            setStyle("cell-defender")
        }

    })

    const getCellsPlayerCanAttack = () => {
        const moves = new Set(); // Используем Set для уникальных значений

        props.playerCells.forEach((coordinate) => {
            // Проверяем соседние клетки
            const neighbors = [
                {x: coordinate.x - 1, y: coordinate.y}, // вверх
                {x: coordinate.x + 1, y: coordinate.y}, // вниз
                {x: coordinate.x, y: coordinate.y - 1}, // влево
                {x: coordinate.x, y: coordinate.y + 1}  // вправо
            ];

            neighbors.forEach(neighbour => {
                // Проверяем, что клетка в пределах доски и пуста
                if (
                    neighbour.x >= 0 &&
                    neighbour.x < 4 &&
                    neighbour.y >= 0 &&
                    neighbour.y < 4 &&
                    !props.playerCells.includes(neighbour)
                ) {
                    moves.add(neighbour);
                }
            });
        });
        return moves
    }

    const handleClick = async (e) => {
        e.preventDefault()
        if (props.onAttack && isCellCanBeUnderAttack()) {
            props.setCurrentTarget(coordinates)
            const guest = await QuestionService.getQuestion()
            console.log(guest)
            props.setQuestion(guest)
            props.setOnAttack(!props.onAttack)
        }
    }

    return (
        <td onClick={e => handleClick(e)} className={style}></td>
    )
}

export default Cell