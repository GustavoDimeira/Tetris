import { useState, useEffect } from "react";
import { Cell, Row, Board, test_shape } from "../objects";

const board = new Board(6, 10)

function MainBoard({
  updateScorre, nextPiece, updateLinesCleared, gameState, changeState, pieces, updateCount, updateRate
}) {
  const [crrPiece, changeCrrPiece] = useState({ ...nextPiece });
  const [mainBoard, updateBoard] = useState();

  // create a two dimensiona vector, that represents the rows and lines relation
  useEffect(() => {
    for (let x = 0; x < board.height; x++) {
      board.addRow(new Row(x, board.width))

      for (let y = 0; y < board.width; y++) {
        board.rows[x].addCell(new Cell(x, y))
      }
    }

    updateBoard(board)
  }, [])

  return (
    <div>
      {
        mainBoard?.rows.map((row, i) => {
          return (
            <div
              key={`row_${i}`}
              style={{
                display: 'flex'
              }}
            >
              {row.cells.map((cell, x) => {
                return (
                  <div
                    key={`cell_${i}-${x}`}
                    style={{
                      display: 'inline-cell',
                      backgroundColor: cell.isOcupated ? 'red' : 'white',
                      border: 'black solid 1px',
                      width: '26px',
                      height: '26px'
                    }}
                  />
                )
              })}
            </div>
          )
        }, {})
      }
      <button
        onClick={() => { 
          board.spawnPiece(test_shape)
          updateBoard({ ...board })
        }}
      >spawn</button>

      <button
        onClick={() => {
          board.moveDown()
          updateBoard({ ...board })
        }}
      >
        moveDown
      </button>

      <button
        onClick={() => {
          board.moveSideways(-1)
          updateBoard({ ...board })
        }}
      >
        moveLeft
      </button>

      <button
        onClick={() => {
          board.moveSideways(1)
          updateBoard({ ...board })
        }}
      >
        moveRight
      </button>

      <button
        onClick={() => {
          board.rotate()
          updateBoard({ ...board })
        }}
      >
        rotate
      </button>

    </div>
  )
}

export default MainBoard;
