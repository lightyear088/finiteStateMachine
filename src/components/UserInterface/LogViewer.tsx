import React, { useState, useEffect, useRef } from "react";
import "./LogViewer.css";
import { useSelector } from "react-redux";
import { getLogs } from "../MainMachine/slice/MainMachineSlice";

const LogViewer: React.FC = () => {
    const logs = useSelector(getLogs);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastLogRef = useRef<HTMLDivElement>(null);

    const formatTime = (time: Date) => {
        const hours = String(time.getHours()).padStart(2, "0");
        const minutes = String(time.getMinutes()).padStart(2, "0");
        const seconds = String(time.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    // Прокрутка вниз при добавлении нового лога
    useEffect(() => {
        lastLogRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <>
            <button className="log-toggle-btn" onClick={() => setOpen(!open)}>
                {open ? "✖" : "📝 Log"}
            </button>

            {open && (
                <div className="log-window" ref={containerRef}>
                    <h3>Лог сообщений</h3>
                    <div className="log-messages">
                        {logs.length === 0 && <p className="log-empty">Нет сообщений</p>}
                        {logs.map((log, index) => (
                            <div
                                key={index}
                                ref={index === logs.length - 1 ? lastLogRef : null} // ссылка на последний элемент
                                className={`log-item ${log.status}`}
                            >
                                <span className="log-time">{formatTime(new Date(log.time))}</span>
                                <span className="log-text">{log.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default LogViewer;
