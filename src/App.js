import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [winner, setWinner] = useState("");
  const [gameState, setGameState] = useState(Array(9).fill("_"));
  const [turn, setTurn] = useState("O");
  const [position, setPosition] = useState(undefined);

  useEffect(() => {
    const player = turn === "O" ? "X" : "O";
    if (position === undefined) {
      return;
    }
    const row = Math.floor(position / 3);
    const column = position % 3;

    const rowWinner = [0, 1, 2].every((i) => {
      return player === gameState[row * 3 + i];
    });
    const columnWinner = [0, 1, 2].every((i) => {
      return player === gameState[3 * i + column];
    });
    const diagonalWinner = [0, 4, 8].every((i) => {
      return player === gameState[i];
    });
    const reverseDiagonalWinner = [2, 4, 6].every((i) => {
      return player === gameState[i];
    });
    if (rowWinner || columnWinner || diagonalWinner || reverseDiagonalWinner) {
      setWinner(player);
    }
  }, [gameState, position, turn]);

  return (
    <div className="App">
      {Array(9)
        .fill()
        .map((_, index) => {
          return (
            <button
              key={index}
              disabled={gameState[index] !== "_" || winner !== ""}
              onClick={() => {
                const newGameState = [...gameState];
                newGameState[index] = turn;
                setGameState(newGameState);
                setTurn(turn === "O" ? "X" : "O");
                setPosition(index);
              }}
            >
              {gameState[index]}
            </button>
          );
        })}
      <p>{`Winner : ${winner}`}</p>
    </div>
  );
}
