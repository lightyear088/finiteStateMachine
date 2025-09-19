import { useDispatch, useSelector } from "react-redux"
import { addLogRecord, getCondition, getSignalTable, setCondition } from "../slice/MainMachineSlice";
import { useCallback } from "react";
import { InputSignalsEnum } from "../slice/MainMachineSliceModel";

export const useMainMachine = () => {

    const dispatch = useDispatch();
    const condition = useSelector(getCondition);
    const signalTable = useSelector(getSignalTable);


    const getOutputSignal = useCallback((signal: InputSignalsEnum) => {

        const outputData = signalTable[signal][condition];

        dispatch(addLogRecord({ time: Date.now(), status: condition, message: `${condition} -> ${outputData.newCondition}  ${outputData.outputSignal}` }))
        dispatch(setCondition(outputData.newCondition))

        outputData.funs?.map((fun) => {
            fun();
        })
    }, [condition, dispatch, signalTable])

    return { getOutputSignal }
}