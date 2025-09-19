import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTime } from "../MainMachine/slice/MainMachineSlice";
import "./TimerDisplay.css";

const TimerDisplay: React.FC = () => {
    const targetTime = useSelector(getTime); // время таймера в миллисекундах
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        const tick = () => {
            const now = Date.now();
            const diff = Math.max(0, targetTime - now);
            setRemaining(diff);
        };

        tick(); // сразу обновить
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetTime]);

    const minutes = String(Math.floor(remaining / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");

    return (
        <div className="timer-container">
            <span className="timer-icon">⏱️</span>
            <span className="timer-text">{minutes}:{seconds}</span>
        </div>
    );
};

export default TimerDisplay;
