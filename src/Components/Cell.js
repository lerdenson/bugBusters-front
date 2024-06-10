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
            if (
                props.bugCells.filter(c =>
                    c.x === coordinates.x && c.y === coordinates.y
                ).length > 0
            ) {
                setStyle("cell-bug")
            } else setStyle("cell-neutral")

        }

    })

    useEffect(() => {
        if (
            props.onAttack &&
            isCellCanBeUnderAttack()
        ) {
            setStyle("neutral-cell-to-attack")
        }
    })

    useEffect(() => {
        if (
            props.bugCells.filter(c =>
                c.x === coordinates.x && c.y === coordinates.y
            ).length > 0 &&
            // props.onAttack &&
            isCellCanBeUnderAttack()
        ) {
            setStyle("bug-cell-to-attack")
        }
    })

    const isCellCanBeUnderAttack = () => {
        let x= false
        getCellsPlayerCanAttack().forEach(c => {
                if (coordinates.x === c.x && coordinates.y === c.y) {
                    x = true
                }
            }
        )
        return x
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

    const handleClick = (e) => {
        e.preventDefault()
        if (isCellCanBeUnderAttack()) {
            props.setCurrentTarget(coordinates)
        }
        // if (props.onAttack && isCellCanBeUnderAttack()) {
        //     props.setCurrentTarget(coordinates)
        //     props.setOnAttack(!props.onAttack)
        //     props.setQuestion(QuestionService.getQuestion())
        // }
    }

    return (
        <td onClick={e => handleClick(e)} className={style}></td>
    )
}

export default Cell