import React, {useState} from 'react';
import Cell from "./Cell";

const GameTable = (props) => {

    const arr = [0, 1, 2, 3]

    return (
        <table className="gameBoard">
            <tbody>
            {arr.map(rowIndex =>
                <TableRow
                    rowIndex={rowIndex}
                    onAttack={props.onAttack}
                    playerCells={props.playerCells}
                    bugCells={props.bugCells}
                    setCurrentTarget={props.setCurrentTarget}
                    currentTarget={props.currentTarget}
                    setOnAttack={props.setOnAttack}
                    setQuestion={props.setQuestion}
                    key={rowIndex}
                />
            )}
            </tbody>
        </table>
    );
};

const TableRow = (props) => {
    const arr = [0, 1, 2, 3]

    return (
        <tr className={"gameBoardRow"}>
            {arr.map(index =>
                <Cell
                    x={index}
                    y={props.rowIndex}
                    onAttack={props.onAttack}
                    playerCells={props.playerCells}
                    bugCells={props.bugCells}
                    setCurrentTarget={props.setCurrentTarget}
                    currentTarget={props.currentTarget}
                    setOnAttack={props.setOnAttack}
                    setQuestion={props.setQuestion}
                    key={index}
                />
            )}
        </tr>
    )
}

export default GameTable;
