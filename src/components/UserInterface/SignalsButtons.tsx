import React from "react";
import "./SignalsButtons.css";
import { InputUserSignalsEnum } from "../MainMachine/slice/MainMachineSliceModel";
import { useMainMachine } from "../MainMachine/hooks/useMainMachine";


const UserSignalsButtons: React.FC = () => {
    const entries = Object.entries(InputUserSignalsEnum).filter(
        ([key]) => isNaN(Number(key)) // убираем числовые ключи
    );

    const { getOutputSignal } = useMainMachine();

    const handleSignal = (signal: InputUserSignalsEnum) => {
        getOutputSignal(signal)
    };


    return (
        <div className="signals-container">
            {entries.map(([key, value]) => (
                <button
                    key={key}
                    className="signal-button"
                    onClick={() => handleSignal(value as InputUserSignalsEnum)}
                >
                    {key}
                </button>
            ))}
        </div>
    );
};

export default UserSignalsButtons;
