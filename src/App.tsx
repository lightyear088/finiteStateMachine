import React, { useEffect } from 'react'
import './App.css'
import MainMachine from './components/MainMachine/MainMachine'
import UserSignalsButtons from './components/UserInterface/SignalsButtons'
import LogViewer from './components/UserInterface/LogViewer'
import { useSignalTable } from './components/MainMachine/hooks/useSignalTable'
import { useDispatch } from 'react-redux'
import { setSignalTable } from './components/MainMachine/slice/MainMachineSlice'
import TimerDisplay from './components/UserInterface/TimerDisplay'
// import UserSignalsButtons from './components/UserInterface/SignalsButtons'
const frames = [
  // Статичный кот
  "/frames/cat_static_stand.png",

  // Еда
  "/frames/cat_eat_1.png",
  "/frames/cat_eat_2.png",

  // Игра
  "/frames/cat_play_1.png",
  "/frames/cat_play_2.png",

  // Сон
  "/frames/cat_sleep_1.png",
  "/frames/cat_sleep_2.png",
  "/frames/cat_sleep_3.png",
  "/frames/cat_sleep_4.png",

  // Переходы (шаги)
  "/frames/cat_left_step_1.png",
  "/frames/cat_left_step_2.png",
  "/frames/cat_right_step_1.png",
  "/frames/cat_right_step_2.png"
];

const App = () => {

  const dispatch = useDispatch();
  const { signalTable } = useSignalTable();

  useEffect(() => {
    dispatch(setSignalTable(signalTable))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div>
      <LogViewer></LogViewer>
      <TimerDisplay></TimerDisplay>
      <MainMachine></MainMachine>
      <UserSignalsButtons></UserSignalsButtons>
    </div>
  )
}

export default App
