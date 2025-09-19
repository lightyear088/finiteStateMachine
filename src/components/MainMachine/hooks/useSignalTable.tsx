import { useCallback, useMemo } from "react"
import { ConditionEnum, OutputType } from "../slice/MainMachineSliceModel"
import { useDispatch, useSelector } from "react-redux"
import { addLogRecord, addTime, getCondition, setTime } from "../slice/MainMachineSlice";

const SECONDS_OF_EXTENSION = 20;
const GAME_TIME = 30;
const FOOD_TIME = 20;
const SLEEP_TIME = 60;
export const useSignalTable = () => {
    const dispatch = useDispatch();
    const condition = useSelector(getCondition);

    const formatTime = useCallback((time: Date) => {
        const hours = String(time.getHours()).padStart(2, "0");
        const minutes = String(time.getMinutes()).padStart(2, "0");
        const seconds = String(time.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }, []);

    const setTimer = useCallback((duration: number) => {
        const targetTime = Date.now() + duration * 1000;
        dispatch(setTime(targetTime));
        dispatch(addLogRecord({
            time: Date.now(),
            status: condition,
            message: `таймер сработает через ${duration} секунд в ${formatTime(new Date(targetTime))}`
        }));
    }, [condition, dispatch, formatTime]);

    const handleAddTime = useCallback(() => {
        dispatch(addTime(SECONDS_OF_EXTENSION * 1000));
        dispatch(addLogRecord({
            time: Date.now(),
            status: condition,
            message: `таймер продлён на ${SECONDS_OF_EXTENSION} секунд`
        }));
    }, [condition, dispatch]);

    const signalTable = useMemo(() => {
        const data: OutputType[][] = [
            [
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец идёт спать", funs: [() => setTimer(SLEEP_TIME)] },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец идёт спать", funs: [() => setTimer(SLEEP_TIME)] },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец спит" },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец идёт спать", funs: [() => setTimer(SLEEP_TIME)] }
            ],
            [
                { newCondition: ConditionEnum.playing, outputSignal: "питомец идёт играть", funs: [() => setTimer(GAME_TIME)] },
                { newCondition: ConditionEnum.playing, outputSignal: "питомец продолжает", funs: [handleAddTime] },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец спит" },
                { newCondition: ConditionEnum.playing, outputSignal: "питомец идёт играть", funs: [() => setTimer(GAME_TIME)] }
            ],
            [
                { newCondition: ConditionEnum.eats, outputSignal: "питомец продолжает", funs: [handleAddTime] },
                { newCondition: ConditionEnum.eats, outputSignal: "питомец идёт есть", funs: [() => setTimer(FOOD_TIME)] },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец спит" },
                { newCondition: ConditionEnum.eats, outputSignal: "питомец идёт есть", funs: [() => setTimer(FOOD_TIME)] }
            ],
            [
                { newCondition: ConditionEnum.free, outputSignal: "питомец готов" },
                { newCondition: ConditionEnum.free, outputSignal: "питомец готов" },
                { newCondition: ConditionEnum.free, outputSignal: "питомец готов" },
                { newCondition: ConditionEnum.free, outputSignal: "питомец готов" }
            ],
        ];

        return data;
    }, [handleAddTime, setTimer]);

    return {
        signalTable
    };
};