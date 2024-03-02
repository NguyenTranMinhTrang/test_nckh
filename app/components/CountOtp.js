import React, { forwardRef, useImperativeHandle, useRef } from "react";
import ResendTimer from "./ResendTimer";
import { useImmer } from "use-immer";

const TIME = 30;
const CountOtp = forwardRef((props, ref) => {
    const { onResend } = props;
    const [state, setState] = useImmer({
        time: TIME,
        activeResend: false
    })
    const refTime = useRef(TIME);
    let intervalId;

    const onCountDown = () => {
        console.log('Come here');

        intervalId = setInterval(() => {
            if (refTime.current > 0) {
                refTime.current = refTime.current - 1;
                setState(draft => {
                    draft.time = refTime.current;
                })
            } else {
                clearInterval(intervalId);
                refTime.current = TIME;
                setState(draft => {
                    draft.time = refTime.current;
                    draft.activeResend = true;
                })
            }
        }, 1000);
    }

    useImperativeHandle(ref, () => ({
        onCountDown
    }))

    return (
        <ResendTimer
            timeLeft={state.time}
            activeResend={state.activeResend}
            resendEmail={onResend}
        />
    )
})

export default CountOtp;