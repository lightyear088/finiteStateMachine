import React, { useCallback, useEffect, useRef, useState } from "react";

type FramePlayerProps = {
    frames: string[];       // массив ссылок на кадры (png, jpg, webp и т.п.)
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
    const start = useCallback(() => {
        if (intervalRef.current !== null) return; // уже запущено
        const frameDuration = 1000 / fps;
        intervalRef.current = window.setInterval(() => {
            setCurrentFrame((prev) => {
                const next = prev + 1;
                if (next >= frames.length) {
                    return loop ? 0 : prev; // либо обнуляем, либо останавливаем
                }
                return next;
            });
        }, frameDuration);
    }, [fps, frames.length, loop]);

    const stop = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        if (autoplay) start();
        return stop; // очистка
    }, [autoplay, fps, loop, start]);

    return (
        <div style={{ display: "inline-block", ...style }}>
            <img
                src={frames[currentFrame]}
                alt={`frame-${currentFrame}`}
                style={{ maxWidth: "100%", display: "block" }}
            />
        </div>
    );
};

export default AnimationPlayer;
