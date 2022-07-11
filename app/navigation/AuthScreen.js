import React from "react";
import { Start, Login, Register, ForgetPassword, Code, GetPassword, SendEmail, ShowInfo, ChangePassword } from "../screens";


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
            <Stack.Screen
                name="Code"
                component={Code}
            />
            <Stack.Screen
                name="GetPassword"
                component={GetPassword}
            />
            <Stack.Screen
                name="SendEmail"
                component={SendEmail}
            />
        </>
    )
}