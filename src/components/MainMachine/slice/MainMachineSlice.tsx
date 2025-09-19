import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../../root/rootStore";
import { ConditionEnum, initialState, LogMessage, OutputType } from "./MainMachineSliceModel"

const mainMachineSlice = createSlice({
    name: "mainMachineSlice",
    initialState,
    reducers: {
        setCondition: (state, action: PayloadAction<ConditionEnum>) => {
            state.condition = action.payload;
        },
        addLogRecord: (state, action: PayloadAction<LogMessage>) => {
            state.log.push(action.payload);
        },
        setSignalTable: (state, action: PayloadAction<OutputType[][]>) => {
            state.signalTable = action.payload;
        },
        setTime: (state, action: PayloadAction<number>) => {
            state.endTime = action.payload;
        },
        addTime: (state, action: PayloadAction<number>) => {
            state.endTime += action.payload;
        }

    },
});

export const {
    setCondition,
    addLogRecord,
    setSignalTable,
    setTime,
    addTime

} = mainMachineSlice.actions;

// Selectors
export const getCondition = (state: RootState): ConditionEnum => state.mainMachine.condition;
export const getSignalTable = (state: RootState): OutputType[][] => state.mainMachine.signalTable;
export const getLogs = (state: RootState): LogMessage[] => state.mainMachine.log;
export const getTime = (state: RootState): number => state.mainMachine.endTime;


export default mainMachineSlice.reducer;