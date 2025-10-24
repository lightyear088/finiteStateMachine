import { useDispatch, useSelector } from "react-redux"
import { addLogRecord, getCondition, getSignalTable, setCondition } from "../slice/MainMachineSlice";
import { useCallback } from "react";
import { InputSignalsEnum, InputSystemSignalsEnum, InputUserSignalsEnum } from "../slice/MainMachineSliceModel";

export const useMainMachine = () => {

    const dispatch = useDispatch();
    const condition = useSelector(getCondition);
    const signalTable = useSelector(getSignalTable);


    const getRandomUserSignal = useCallback((signal: InputSignalsEnum): InputUserSignalsEnum => {
        const userSignals = Object.values(InputUserSignalsEnum)
            .filter(value => typeof value === 'number')
            .map(value => value as InputUserSignalsEnum);


        const availableSignals = userSignals.filter(userSignal =>
            !(signal in InputUserSignalsEnum) || userSignal !== signal
        );

        // Если доступные сигналы пусты (может случиться, если передать все возможные userSignals)
        // возвращаем случайный из всех userSignals
        const signalsToUse = availableSignals.length > 0 ? availableSignals : userSignals;

        const randomIndex = Math.floor(Math.random() * signalsToUse.length);
        return signalsToUse[randomIndex];
    }, [])

    function isEnumValue<T extends object>(
        value: unknown,
        enumObject: T
    ): value is T[keyof T] {
        return Object.values(enumObject).includes(value);
    }

    const callWithProbability = useCallback((probability: number, signal: InputSignalsEnum): InputSignalsEnum => {

        if (probability < 0 || probability > 1) {
            throw new Error('Вероятность должна быть в диапазоне от 0 до 1');
        }

        const randomValue = Math.random();

        if (randomValue <= probability) {
            return getRandomUserSignal(signal);
        }
        return signal;
    }, [getRandomUserSignal])




    const getOutputSignal = useCallback((signal: InputSignalsEnum) => {

        let outputData = signalTable[signal][condition];
        const randomUserSignal = callWithProbability(outputData.probability, signal)


        if (randomUserSignal != signal && !isEnumValue(signal, InputSystemSignalsEnum)) {
            outputData = signalTable[randomUserSignal][condition];
            dispatch(addLogRecord({ time: Date.now(), status: condition, message: `кот балбес, перепутал` }))
        }

        dispatch(addLogRecord({ time: Date.now(), status: condition, message: `${condition} -> ${outputData.newCondition}  ${outputData.outputSignal}` }))
        dispatch(setCondition(outputData.newCondition))

        outputData.funs?.map((fun) => {
            fun();
        })
    }, [callWithProbability, condition, dispatch, signalTable])

    return { getOutputSignal }
}