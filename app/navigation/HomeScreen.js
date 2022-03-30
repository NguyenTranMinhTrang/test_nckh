import React from "react";
import Tabs from "./tab";
import { ShowInfo, ChangePassword } from "../screens";

export default function (Stack) {
    return (
        <>
            <Stack.Screen
                name="Tabs"
                component={Tabs}
            />

            <Stack.Screen
                name="ShowInfo"
                component={ShowInfo}
            />

            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
            />

        </>
    )
}