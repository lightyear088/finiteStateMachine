export enum InputUserSignalsEnum {
    putToBed = 0,
    play = 1,
    feed = 2,
}

export enum InputSystemSignalsEnum {
    endTimer = 3
}
export type InputSignalsEnum = InputUserSignalsEnum | InputSystemSignalsEnum;

export enum OutputSystemSignalsEnum {
    continues
}

export enum ConditionEnum {
    eats = 0,
    playing = 1,
    sleeping = 2,
    free = 3
}

export type OutputType = {
    newCondition: ConditionEnum
    outputSignal: string;
    probability: number;
    funs?: (() => void)[];
}

export interface LogMessage {
    time: number;
    status: ConditionEnum;
    message: string;
}

export interface MainMachineModelState {
    condition: ConditionEnum
    signalTable: OutputType[][]
    endTime: number
    log: LogMessage[]
}

export const initialState: MainMachineModelState = {
    condition: ConditionEnum.free,
    signalTable: [
        [{ outputSignal: "питомец спит" }, { outputSignal: "питомец продолжает" }, { outputSignal: "питомец идёт есть" }, { outputSignal: "питомец идёт есть" }],
        [{ outputSignal: "питомец спит" }, { outputSignal: "питомец идёт играть" }, { outputSignal: "питомец продолжает" }, { outputSignal: "питомец идёт играть" }],
        [{ outputSignal: "питомец спит" }, { outputSignal: "питомец идёт спать" }, { outputSignal: "питомец идёт спать" }, { outputSignal: "питомец идёт спать" }],
        [{ outputSignal: "питомец готов" }, { outputSignal: "питомец готов" }, { outputSignal: "питомец готов" }, { outputSignal: "питомец готов" }],
    ] as OutputType[][],
    endTime: 0,
    log: []
};