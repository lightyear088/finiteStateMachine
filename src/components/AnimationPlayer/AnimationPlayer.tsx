import React, { useCallback, useEffect, useRef, useState } from "react";

type FramePlayerProps = {
    frames: string[];       // массив ссылок на кадры
    fps?: number;           // кадров в секунду
    autoplay?: boolean;     // автозапуск
    loop?: boolean;         // зациклить
    style?: React.CSSProperties; // стили для контейнера
};

const AnimationPlayer: React.FC<FramePlayerProps> = ({
    frames,
    fps = 12,
    autoplay = true,
    loop = true,
    style
}) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const stop = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const start = useCallback(() => {
        if (intervalRef.current !== null || frames.length === 0) return; // уже запущено или нет кадров
        const frameDuration = 1000 / fps;
        intervalRef.current = window.setInterval(() => {
            setCurrentFrame((prev) => {
                const next = prev + 1;
                if (next >= frames.length) {
                    if (loop) {
                        return 0;
                    } else {
                        stop();
                        return frames.length - 1;
                    }
                }
                return next;
            });
        }, frameDuration);
    }, [fps, frames.length, loop, stop]);

    useEffect(() => {
        if (autoplay && frames.length > 0) {
            setCurrentFrame(0);
            start();
        }
        return stop;
    }, [autoplay, fps, loop, start, stop, frames]);

    if (frames.length === 0) {
        return null;
    }

    return (
        <div style={{ display: "inline-block", ...style }}>
            <img
                src={frames[currentFrame]}
                alt=""
                style={{ maxWidth: "100%", display: "block" }}
            />
        </div>
    );
};

export default AnimationPlayer;
