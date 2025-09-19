import React, { useEffect, useMemo, useState } from "react"
import { ConditionEnum, InputSystemSignalsEnum } from "./slice/MainMachineSliceModel"
import { useDispatch, useSelector } from "react-redux";
import { getCondition, getTime, setTime } from "./slice/MainMachineSlice";
import { useMainMachine } from "./hooks/useMainMachine";
import AnimationPlayer from "../AnimationPlayer/AnimationPlayer";

const MainMachine: React.FC = () => {

    const dispatch = useDispatch();
    const { getOutputSignal } = useMainMachine();

    const condition = useSelector(getCondition);
    const time = useSelector(getTime);

    const [prevCondition, setPrevCondition] = useState<ConditionEnum>(condition);
    const [isAnimationTime, setAnimationTime] = useState(false);



    const stepAnimation = useMemo(() => {

        if (prevCondition != condition) {
            switch (prevCondition) {
                case ConditionEnum.free:
                case ConditionEnum.playing:
                    switch (condition) {
                        case ConditionEnum.playing:
                            return [];
                        case ConditionEnum.free:
                            return [];
                        case ConditionEnum.sleeping:
                            return [
                                "/frames/cat_left_step_1.png",
                                "/frames/cat_left_step_2.png",
                            ];
                        case ConditionEnum.eats:
                            return [
                                "/frames/cat_right_step_1.png",
                                "/frames/cat_right_step_2.png",
                            ];
                    }
                    break;
                case ConditionEnum.eats:
                    switch (condition) {
                        case ConditionEnum.playing:
                            return [
                                "/frames/cat_left_step_1.png",
                                "/frames/cat_left_step_2.png",
                            ];
                        case ConditionEnum.free:
                            return [
                                "/frames/cat_left_step_1.png",
                                "/frames/cat_left_step_2.png",
                            ];
                        case ConditionEnum.sleeping:
                            return [
                                "/frames/cat_left_step_1.png",
                                "/frames/cat_left_step_2.png",
                            ];
                        case ConditionEnum.eats:
                            return [];
                    }
                    break;
                case ConditionEnum.sleeping:
                    switch (condition) {
                        case ConditionEnum.playing:
                            return [
                                "/frames/cat_right_step_1.png",
                                "/frames/cat_right_step_2.png",
                            ];
                        case ConditionEnum.free:
                            return [
                                "/frames/cat_right_step_1.png",
                                "/frames/cat_right_step_2.png",
                            ];
                        case ConditionEnum.sleeping:
                            return [
                                "/frames/cat_right_step_1.png",
                                "/frames/cat_right_step_2.png",
                            ];
                        case ConditionEnum.eats:
                            return [
                                "/frames/cat_right_step_1.png",
                                "/frames/cat_right_step_2.png",
                            ];
                    }
                    break;

            }
        }
        else {
            return []
        }
    }, [condition, prevCondition])

    useEffect(() => {
        if (prevCondition != condition && stepAnimation.length != 0) {
            setAnimationTime(true);

            // ставим 2 секунды на проигрывание перехода
            const timeout = setTimeout(() => {
                setAnimationTime(false);
                setPrevCondition(condition);
            }, 2000);

            return () => clearTimeout(timeout);
        } else {
            setPrevCondition(condition);

        }
    }, [condition, prevCondition, stepAnimation.length]);


    const choiceAnimation = useMemo(() => {

        if (isAnimationTime && prevCondition != null) {
            return stepAnimation
        }

        switch (condition) {
            case ConditionEnum.free:
                return [
                    "/frames/cat_static_stand.png"
                ];
            case ConditionEnum.eats:
                return [
                    "/frames/cat_eat_1.png",
                    "/frames/cat_eat_2.png",
                ];
            case ConditionEnum.playing:
                return [
                    "/frames/cat_play_1.png",
                    "/frames/cat_play_2.png",
                ];
            case ConditionEnum.sleeping:
                return [
                    "/frames/cat_sleep_1.png",
                    "/frames/cat_sleep_2.png",
                    "/frames/cat_sleep_3.png",
                    "/frames/cat_sleep_4.png",
                ];
            default:
                return [
                    "/frames/cat_static_stand.png"
                ];
        }
    }, [condition, isAnimationTime, prevCondition, stepAnimation])



    useEffect(() => {
        if (time == 0) return;
        const interval = setInterval(() => {
            const now = Date.now();
            if (now >= time) {
                dispatch(setTime(0));
                getOutputSignal(InputSystemSignalsEnum.endTimer);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch, getOutputSignal, time]);
    return (<>
        <AnimationPlayer frames={choiceAnimation} fps={2} autoplay={true} loop={true}></AnimationPlayer>

    </>)
}

export default MainMachine