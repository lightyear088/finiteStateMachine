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

const App = () => {

  const dispatch = useDispatch();
  const { signalTable } = useSignalTable();

  useEffect(() => {
    dispatch(setSignalTable(signalTable))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
