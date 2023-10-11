import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  // Helper function to create the initial board
  function createBoard() {
    const initialBoard = [];
    let hasInitialLight = false; // Track if at least one light is turned on
  
    for (let y = 0; y < nrows; y++) {
      const row = [];
      for (let x = 0; x < ncols; x++) {
        // Randomly determine if the cell should be initially lit
        const isLit = Math.random() < chanceLightStartsOn;
        row.push(isLit);
        if (isLit) {
          hasInitialLight = true;
        }
      }
      initialBoard.push(row);
    }
  
    // If no initial light is on, turn on one randomly
    if (!hasInitialLight) {
      const randomY = Math.floor(Math.random() * nrows);
      const randomX = Math.floor(Math.random() * ncols);
      initialBoard[randomY][randomX] = true;
    }
  
    return initialBoard;
  }
  

  // Function to handle cell clicks and toggle lights
  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      // Deep copy of the old board
      const newBoard = [...oldBoard];

      // Function to flip a cell and its neighbors
      const flipCell = (y, x) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          newBoard[y][x] = !newBoard[y][x];
        }
      };

      // Flip the clicked cell and its neighbors
      flipCell(y, x);
      flipCell(y - 1, x);
      flipCell(y + 1, x);
      flipCell(y, x - 1);
      flipCell(y, x + 1);

      return newBoard;
    });
  }

  // Function to check if the game is won
  function hasWon() {
    return board.every((row) => row.every((cell) => !cell));
  }

  // Render the board
  const tableBoard = (
    <table>
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => (
              <Cell
                key={x}
                isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Render the game or "You Won" message
  return hasWon() ? <div>You Won!</div> : tableBoard;
}

export default Board;





