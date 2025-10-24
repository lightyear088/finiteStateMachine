import { useCallback, useMemo } from "react"
import { ConditionEnum, OutputType } from "../slice/MainMachineSliceModel"
import { useDispatch, useSelector } from "react-redux"
import { addLogRecord, addTime, getCondition, setTime } from "../slice/MainMachineSlice";

const SECONDS_OF_EXTENSION = 0;
const GAME_TIME = 30;
const FOOD_TIME = 20;
const SLEEP_TIME = 60;
const PROBABILITY = 0.6;
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
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец идёт спать", probability: PROBABILITY, funs: [() => setTimer(SLEEP_TIME)] },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец идёт спать", probability: PROBABILITY, funs: [() => setTimer(SLEEP_TIME)] },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец спит", probability: PROBABILITY, },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец идёт спать", probability: PROBABILITY, funs: [() => setTimer(SLEEP_TIME)] }
            ],
            [
                { newCondition: ConditionEnum.playing, outputSignal: "питомец идёт играть", probability: PROBABILITY, funs: [() => setTimer(GAME_TIME)] },
                { newCondition: ConditionEnum.playing, outputSignal: "питомец продолжает", probability: PROBABILITY, funs: [handleAddTime] },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец спит", probability: PROBABILITY },
                { newCondition: ConditionEnum.playing, outputSignal: "питомец идёт играть", probability: PROBABILITY, funs: [() => setTimer(GAME_TIME)] }
            ],
            [
                { newCondition: ConditionEnum.eats, outputSignal: "питомец продолжает", probability: PROBABILITY, funs: [handleAddTime] },
                { newCondition: ConditionEnum.eats, outputSignal: "питомец идёт есть", probability: PROBABILITY, funs: [() => setTimer(FOOD_TIME)] },
                { newCondition: ConditionEnum.sleeping, outputSignal: "питомец спит", probability: 1 },
                { newCondition: ConditionEnum.eats, outputSignal: "питомец идёт есть", probability: PROBABILITY, funs: [() => setTimer(FOOD_TIME)] }
            ],
            [
                { newCondition: ConditionEnum.free, outputSignal: "питомец готов", probability: 1 },
                { newCondition: ConditionEnum.free, outputSignal: "питомец готов", probability: 1 },
                { newCondition: ConditionEnum.free, outputSignal: "питомец готов", probability: 1 },
                { newCondition: ConditionEnum.free, outputSignal: "питомец готов", probability: 1 }
            ],
        ];

        return data;
    }, [handleAddTime, setTimer]);

    return {
        signalTable
    };
};