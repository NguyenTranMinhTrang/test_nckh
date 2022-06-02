import React from "react";
import { Start, Login, Register, ForgetPassword } from "../screens";

export default function (Stack) {
    return (
        <>
            <Stack.Screen
                name="Start"
                component={Start}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
            />
        </>
    )
}