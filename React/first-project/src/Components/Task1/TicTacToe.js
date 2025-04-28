import React, { useState } from "react";

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [playerX, setPlayerX] = useState("");
    const [playerO, setPlayerO] = useState("");
    const [gameWinner, setGameWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false); 

    const handleClick = (index) => {
        if (board[index] || gameWinner || isDraw) return; 

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const { winner } = calculateWinner(newBoard);
        if (winner) {
            setGameWinner(winner);
        } else if (newBoard.every(cell => cell !== null)) {
            setIsDraw(true);
        }
    };

    const { line } = calculateWinner(board);

    const getWinnerName = () => {
        if (gameWinner === "X") return playerX || "Player X";
        if (gameWinner === "O") return playerO || "Player O";
        return null;
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setGameWinner(null);
        setIsDraw(false);
        setPlayerX("");  
        setPlayerO(""); 
    };

    const isCellWinning = (index) => {
        return line?.includes(index);
    };

    const isBoardDisabled = gameWinner || isDraw;

    return (
        <div className="container text-center">
            <h1 className="mb-3">Tic Tac Toe 🎯</h1>

            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Player X Name"
                        value={playerX}
                        onChange={(e) => setPlayerX(e.target.value)}
                        disabled={gameWinner !== null || isDraw}
                    />
                </div>

                <div className="col-1 d-flex align-items-center justify-content-center">
                    <button
                        className="btn btn-primary"
                        onClick={resetGame}
                    >
                        Reset
                    </button>
                </div>

                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Player O Name"
                        value={playerO}
                        onChange={(e) => setPlayerO(e.target.value)}
                        disabled={gameWinner !== null || isDraw}
                    />
                </div>
            </div>

            <h4 className="mb-3">
                {gameWinner
                    ? `🏆 Winner: ${getWinnerName()}`
                    : isDraw
                        ? "🤝 It's a Draw!"
                        : `Turn: ${isXNext ? playerX || "Player X" : playerO || "Player O"
                        }`}
            </h4>

            <div
                className="d-grid mx-auto"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 100px)",
                    gridGap: "10px",
                    width: "340px",
                    height: "340px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                }}
            >
                {board.map((cell, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className="border d-flex align-items-center justify-content-center"
                        style={{
                            width: "100px",
                            height: "100px",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            cursor: isBoardDisabled ? "not-allowed" : "pointer",
                            backgroundColor: isCellWinning(index) ? "#90ee90" : "#c8e6c9",
                            borderWidth: "2px",
                            borderColor: "#333",
                            position: "relative",
                        }}
                    >
                        {cell}
                    </div>
                ))}
            </div>
        </div>
    );
}

function calculateWinner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let l of lines) {
        const [a, b, c] = l;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: [a, b, c] };
        }
    }
    return { winner: null, line: null };
}

export default TicTacToe;
