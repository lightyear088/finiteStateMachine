import { combineReducers, type Reducer } from 'redux';
import { initialState as localizationState } from './localizations/slices/LocalizationSliceModels';
import { initialState as mainMachineSliceState } from '../src/components/MainMachine/slice/MainMachineSliceModel';


export const initialState = {
    localization: localizationState,
    mainMachine: mainMachineSliceState
}

export type RootStoreType = typeof initialState;


export const createRootReducer = (): Reducer<RootStoreType> => combineReducers<RootStoreType>({
    localization: localizationState,
    mainMachine: mainMachineSliceState
});
