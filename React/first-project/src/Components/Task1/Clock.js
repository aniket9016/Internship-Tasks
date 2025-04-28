import React, { useState, useEffect } from "react";

function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleStartStop = () => {
        if (isRunning) {
            clearInterval(intervalId);
        } else {
            const startTime = Date.now() - elapsedTime;
            const newIntervalId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);
            setIntervalId(newIntervalId);
        }
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        clearInterval(intervalId);
        setIsRunning(false);
        setElapsedTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        if (isRunning) {
            setLaps([...laps, elapsedTime]);
        }
    };

    const formatTime = (timeMs) => {
        const ms = Math.floor((timeMs % 1000) / 10);
        const seconds = Math.floor((timeMs / 1000) % 60);
        const minutes = Math.floor((timeMs / (1000 * 60)) % 60);
        const hours = Math.floor(timeMs / (1000 * 60 * 60));

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
    };

    return (
        <div className="container text-center my-5">
            <h2 className="mb-4">🕰️ Current Time</h2>
            <h3>{currentTime.toLocaleTimeString()}</h3>

            <hr className="my-5" />

            <h2 className="mb-4">⏱️ Stopwatch</h2>
            <h1>{formatTime(elapsedTime)}</h1>

            <div className="my-3">
                <button className="btn btn-success mx-2" onClick={handleStartStop}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button
                    className="btn btn-warning mx-2"
                    onClick={handleLap}
                    disabled={!isRunning}
                >
                    Lap
                </button>
                <button className="btn btn-danger mx-2" onClick={handleReset}>
                    Reset
                </button>
            </div>

            {laps.length > 0 && (
                <div className="mt-4">
                    <h4>Laps:</h4>
                    <ul className="list-group">
                        {laps.map((lap, index) => (
                            <li key={index} className="list-group-item">
                                Lap {index + 1}: {formatTime(lap)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Clock;