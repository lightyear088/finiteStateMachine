import { configureStore } from '@reduxjs/toolkit';
import localizationSlice from './localizations/slices/LocalizationSlice'
import mainMachineSlice from '../src/components/MainMachine/slice/MainMachineSlice'

const store = configureStore({
    reducer: {
        localization: localizationSlice,
        mainMachine: mainMachineSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // 🚫 отключаем проверку
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;